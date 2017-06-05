const path = require('path'),
  XMLUtil = require("../../utils/xmlUtil"),
  ResourceUtil = require("../../utils/resourceUtil");


//this file contains the object type implementation for the parameters of an attribute

/**
* attrParam is used in IOMap Translation into Attribute Value Map
* it has info user uploadde values
*/
function attrParam(attrName, attrObject, stepUIState, skillobject, IOMapRef) {
  this.attrName = attrName;
  this.attrObject = attrObject;
  this.stepUIState = stepUIState;
  this.skillobject = skillobject;
}

/**
* attrTaskParam is used in IOMap Translation into Attribute Value Map
* it has info pertaining to task and step
*/
function attrTaskParam(taskId, stepIndex, stateId, dbFilestoreMgr, resourceMap) {
  this.taskId = taskId;
  this.stepIndex = stepIndex;
  this.stateId = stateId;
  this.dbFilestoreMgr = dbFilestoreMgr;
  this.resourceMap = resourceMap;
  this.resourceUtil = ResourceUtil;
}

/**
 * @param {*} fileInfo : It can be a single Object or an Array of Objects which contain below key-value pairs:
 *  path: It's the file path from where the resource has to be copied
 *    it's fetched from IOMap JSON.
 *        when resourcetype is step => Ex: "GO16.WD.12.12B.02.T1/1/1493790231823.DocumentData.json"
 *        when resourcetype is skill => Ex: "xl/MoveCellContent/Resources/tree.xml"
 *  resourceType: It can have following two values and according to that the source folder 
 *      from which the file needs to be copied from is evaluated 
 *        skill: Means that the resource is skill specific and has to be copied from "filestore/skills/" folder
 *        step: Means that the resource is task specific and has to be copied from "filestore/Resources/" folder
 *  AssetFolderHierarchy: Any custom parent folder hierarchy after the 'Assets' folder
 *  addToPreload: (true | false) true means that the file needs to be added to preload Resources as well
 * 
 * OUTPUT: The Output will be an Object or an Array of Objects which contain following key-values:
 *    stepAssetsFolderPath: It's the folder path till 'Assets' folder.
 *    fileName: File name along with extension
 *    absFilePath: Absolute folder path which needs to be added (in attribute value and preload map) in the task XML. Ex:
 */
attrTaskParam.prototype.addResourceToMap = function (fileInfo) {
  
  let returnArray = [];

  if (!(fileInfo instanceof Array)) {
    return this._addToResMap(fileInfo);
  }

  else {
    for (let obj of fileInfo) {
      returnArray.push(this._addToResMap(obj));
    }
  }
  return returnArray;
}

attrTaskParam.prototype._addToResMap = function (filePathObj, config) {

  let resourceType = filePathObj.resourceType ? (filePathObj.resourceType.toLowerCase() !== "skill" ? "step" : "skill") : "step";
  let AssetFolderHierarchy = filePathObj.AssetFolderHierarchy || "";
  let addToPreload = !(filePathObj.addToPreload === "false" || filePathObj.addToPreload === false);

  let existingResource = this.resourceMap[filePathObj.path];

  if (existingResource) {
    return { 
      "stepAssetsFolderPath": existingResource.stepAssetsFolderPath, 
      "fileName":existingResource.fileName,
      "absFilePath": existingResource.absFilePath };
  }
  else {
    let fileName = ResourceUtil.getFileNameWithExtension(filePathObj.path),
      fileType = ResourceUtil.getFileType(fileName),
      stepAssetsFolderPath = XMLUtil.genStepAssetsFolderPath(this.taskId, this.stepIndex),
      // Replacing all occurance of '\' with '/' because '\' is used as an escape character in Javascript
      absFilePath = path.join(stepAssetsFolderPath, AssetFolderHierarchy, fileName).replace(/\\/g, "/");

    // Adding to Resource Map so that the file can be copied asynchronously
    // stepAssetsFolderPath is not used in copying files, it's been put here so that it can be sent back in the return statement in line 68 
    // i.e. if the requested resource is already existing in the map
    this.resourceMap[filePathObj.path] = { AssetFolderHierarchy, fileName, stepAssetsFolderPath, resourceType, absFilePath, fileType, addToPreload };
    return { stepAssetsFolderPath, fileName, absFilePath }
  }
}

class IOTranslator {

  constructor(){
    /* As per Discussion with DPS, this variable is assigned a static value.
     This static value will have to be fetched from outside so that this variable gets populated*/
    this.xmlInitialState = 1;
  }
  
  genPromise(attrParams, taskParam) {
    var self = this;
    return new Promise(function (resolve, reject) {
      self.evaluateAttribute(attrParams, taskParam)
        .then(function (resolveParams) {
          resolve(resolveParams);
        }).catch( function (error) {          
          reject(error);
        });
    })
  }

  //common function for getting the param array for the passed array of params
  getEvaluatedParams(paramObj, stepUIState) {

    var evalexp = "stepUIState.";
    // var finalArray = [];

    for (var param in paramObj) {
      paramObj[param] = eval(evalexp + paramObj[param]);

    }
    return paramObj;
  }

  evaluateFromFunc(attrParams, paramsObj, skillParamsObj, taskParams) {

    let functionName = attrParams.attrObject["function-name"];

    if (!attrParams.skillobject[functionName]) {
      functionName = "extractSingleParamVal";
    }

    let params = { paramsObj, skillParamsObj, taskParams };
    return attrParams.skillobject[functionName](params);
  }

  /* As per Discussion with DPS, the below function handles the error and also 
   controlls whch attribute to be resolved or not. This desision is made on the basis of that Attribute's 
   prescence in the "mandatoryAttributeList" list and their position in the 
   xmlInitialState (currently 1) in the skill xml and IOMap*/
  evaluateAttribute(attrParams, taskParam) {
    let self = this;
    let evaluatedParams = {};
    try {
      //the attr params currently contains the string values , the LOC below converts it into values from the Step UI Json 
      if (attrParams.attrObject.params){
        evaluatedParams = this.getEvaluatedParams(attrParams.attrObject.params, attrParams.stepUIState);
      }
      return this.evaluateFromFunc(attrParams, evaluatedParams, attrParams.attrObject.skillParams, taskParam)
      .catch(function(err){
        // this is the catch if rejection/crash is faced in the Asynchronous code 
        if(((taskParam.stateId == self.xmlInitialState) && (attrParams.skillobject.mandatoryAttributeList.indexOf(attrParams.attrName) != -1) )){
          // this means that if the skill has rejected the attribute , then translator will also reject it 
          return Promise.reject(err);
        }
        else{
          // this means that if the skill has rejected the attribute , then translator will still create the xml
          console.log(attrParams.attrName + " : creation failed for this attribute");
          let resolveParam = {"attrValue":null};
          return Promise.resolve(resolveParam);
        }
      })
    } catch (error) {
        // this is the catch if crash is faced in the Synchronous code/Iomap reference 
        if(((taskParam.stateId == self.xmlInitialState) && (attrParams.skillobject.mandatoryAttributeList.indexOf(attrParams.attrName) != -1) )){
          // this means that if the skill has rejected the attribute , then translator will also reject it 
          return Promise.reject(err);
        }
        else{
          // this means that if the skill has rejected the attribute , then translator will still create the xml
          console.log(attrParams.attrName + " : creation failed for this attribute");
          let resolveParam = {"attrValue":null};
          return Promise.resolve(resolveParam);
        }
    }
  }

  /**
   * returns the promise which fills the value of an individual attribute 
   * using stepUIState in the corresponding node of IOMap
   * @param {*} attrObj : it's an object having the following
   * IOMap, stepUIState, 
   * skillRef (object of skill specific class. It was generated by skill factory), 
   * taskId, stepIndex and reference of dbFilestoreMgr 
   * @param {*} data : it's an object having four values which are parentObj, keyName, stateId and compId
   * @param {*} PromiseRequestsArr : An array in which promise object has to be pushed. 
   * Later on in the execution cycle this whole array is passed to the Promise.All()
   * @param {*} resourceMap : An Object which contains the info of the Resources that will to be copied
   * to corresponding folder and added in the preload Resources Array which will be used in XML generation
   */
  _executeIOMapFunction(attrObj, data, PromiseRequestsArr, resourceMap) {
    let attrParams = new attrParam(data.keyName, data.parentObj[data.keyName], attrObj.stepUIState, attrObj.skillRef),
      taskParam = new attrTaskParam(attrObj.taskId, attrObj.stepIndex, data.stateId, attrObj.dbFilestoreMgr, resourceMap);

    PromiseRequestsArr.push(this.genPromise(attrParams, taskParam)
      .then(resolveParams => {
        data.parentObj[data.keyName] = resolveParams.attrValue;
        // this if check here is for backward compatibility
        // in the new implementation skill class need not send this preload resource array here
        // this code will become obsolete once all the present templates start using new approach
        if (resolveParams.preloadResArr) {
          if (!attrObj.IOMap.preload)
            attrObj.IOMap.preload = { resource: [] };
          else if (!attrObj.IOMap.preload.resource)
            attrObj.IOMap.preload.resource = [];
          attrObj.IOMap.preload.resource.push(...resolveParams.preloadResArr);
        }
      })
      .catch((error) => {
        error.message += " (attribute : " + data.keyName + ")";
        return Promise.reject(error);
      }));
  }

  /**
   * Input: IOMap JSON 
   * @param attrObj: it's an object having the following
   * IOMap, stepUIState, 
   * skillRef (object of skill specific class. It was generated by skill factory), 
   * taskId, stepIndex and reference of dbFilestoreMgr 
   * Output: Attribute value map Json
   */
  readIOMap(attrObj) {
    let iomap = attrObj.IOMap;

    return attrObj.skillRef["init"](attrObj)
      .then(() => {
        let self = this,
          PromiseRequestsArr = [],
          resourceMap = {};

        /**
         * Recursive function to traverse the IO Map to translate IO Map into Attribute Value Map
         */
        (function traverseIOMap(parentObj, keyName, stateId, compId) {
          for (let key in parentObj[keyName]) {

            //Get StateID and CompID
            switch (keyName) {
              case "states":
                stateId = key;
                break;
              case "components":
                compId = key;
                break;
              default:
                break;
            }

            // if check to ensure that this iteration is for an element in which some translation has to be done
            // and not for some element in the hierarchy which doesn't need any translation for itself but has some child elements
            if (key === "function-name") {
              self._executeIOMapFunction(attrObj, { parentObj, keyName, stateId, compId }, PromiseRequestsArr, resourceMap);
            }
            else if (typeof parentObj[keyName][key] === "object") {
              traverseIOMap(parentObj[keyName], key, stateId, compId);
            }
          }
        })({ "iomap": iomap }, "iomap");

        return Promise.all(PromiseRequestsArr)
          .then(() => {
            let copyResPromiseArray = this._copyResourceFilesAndFillPreload(resourceMap, attrObj);
            // Scenario when the skill requires no resources to be moved and copied.
            if(iomap.preload.resource){
              iomap.preload.resource = self._removeDuplicatePreloadResources(iomap.preload.resource);
            }
            return Promise.resolve([iomap, copyResPromiseArray]);
          })
          .catch(err => {
            console.log("Error in traverseIOMap function of IOTranslator: " + err.message);
            return Promise.reject(err);
          });
      })
      .catch(error => {
        console.log("Error in readIOMap function of IOTranslator: " + error.message);
        return Promise.reject(error);
      });
  }

  /**
   * Input: Preload Resources Array.
   * @param {*} preloadArray : It's an array that contains multiple objects each having file path and 
   * file type of preload resource.
   * Output: Array having Unique Preload Resources.
   */
  _removeDuplicatePreloadResources(preloadArray) {
    let tempObj = {};
    return preloadArray.filter((obj) => {
      return tempObj[obj.path] ? false : tempObj[obj.path] = true;
    })
  }
  /**
   * 
   * @param {*} resourceMap : It's an object which contains following key-value pairs:
   *   absFilePath:"XMLs/TaskXmls/go16/wd/12/12b.02.t1/1/Assets/1493790231823.DocumentData.json"
   *   AssetFolderHierarchy: Any custom folder hierarchy
   *   fileName: "1493790231823.DocumentData.json"
   *   fileType: "json"
   *   resourceType: "step"
   * @param {*} attrObj : it's an object having the following
   * IOMap, stepUIState, 
   * skillRef (object of skill specific class. It was generated by skill factory), 
   * taskId, stepIndex and reference of dbFilestoreMgr 
   * 
   * Output: It returns an Array of promises for copying the resource files and also add these resources to
   * Preload Array which will be used for XML generation
   */
  _copyResourceFilesAndFillPreload(resourceMap, attrObj) {
    let copyResPromiseArray = [];
    for (let key in resourceMap) {
      copyResPromiseArray.push(attrObj.dbFilestoreMgr.copyTaskAssetFileEnhanced(key, resourceMap[key], attrObj.taskId, attrObj.stepIndex));

      //Adding in preload Res
      if (!attrObj.IOMap.preload)
        attrObj.IOMap.preload = { resource: [] };
      else if (!attrObj.IOMap.preload.resource)
        attrObj.IOMap.preload.resource = [];

      if(resourceMap[key]["addToPreload"])
        attrObj.IOMap.preload.resource.push({ "path": resourceMap[key]["absFilePath"], "type": resourceMap[key]["fileType"] });
    }
    return copyResPromiseArray;
  }

  getAttrValueMap(attrObj) {
    return this.readIOMap(attrObj)
      .then(([ioMap, copyResPromiseArray]) => {
        return Promise.resolve([ioMap, copyResPromiseArray]);
      })
      .catch(error => {
        return Promise.reject(error);
      });
  }
}
var iotranslatorobj = new IOTranslator();
module.exports = iotranslatorobj;
