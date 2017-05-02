const path = require('path'),
  XMLUtil = require("../../utils/xmlUtil"),
  ResourceUtil = require("../../utils/resourceUtil");


//this file contains the object type implementation for the parameters of an attribute

function attrParam(attrName, attrObject, stepUIState, skillobject, IOMapRef) {
  this.attrName = attrName;
  this.attrObject = attrObject;
  this.stepUIState = stepUIState;
  this.skillobject = skillobject;
}

function attrTaskParam(taskId, stepIndex, stateId, dbFilestoreMgr, resourceMap) {
  this.taskId = taskId;
  this.stepIndex = stepIndex;
  this.stateId = stateId;
  this.dbFilestoreMgr = dbFilestoreMgr;
  this.resourceMap = resourceMap;
}

attrTaskParam.prototype.addResourceToMap = function (type, filePath, customParentFolder = "") {

  let existingResource;
  if (existingResource = this.resourceMap[filePath])
    return existingResource;

  let fileName = ResourceUtil.getFileNameWithExtension(filePath),
    fileType = ResourceUtil.getFileType(fileName),
    stepAssetsFolderPath = XMLUtil.genStepAssetsFolderPath(this.taskId, this.stepIndex);
  absFilePath = path.join(stepAssetsFolderPath, customParentFolder, fileName).replace(/\\/g, "/");

  type = type.toLowerCase();

  if (type !== "skill")
    type = "step";

  //Pushing to  Resource Map so that the file can be copied asynchronously
  this.resourceMap[filePath] = { "customParentFolder": customParentFolder, "fileName": fileName, "resourceType": type, "absFilePath": absFilePath, "fileType": fileType };
  return { "customParentFolder": customParentFolder, "fileName": fileName, "stepAssetsFolderPath": stepAssetsFolderPath, "fileType": fileType, "absFilePath": absFilePath };
}

class IOTranslator {

  genPromise(attrParams, taskParam) {
    var self = this;
    return new Promise(function (resolve, reject) {
      self.evaluateAttribute(attrParams, taskParam)
        .then(function (resolveParams) {
          resolve(resolveParams);
        }, function (error) {
          console.log("promise rejection at genPromise");
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

  evaluateFromFunc(attrParams, paramsObj, taskParams) {

    let functionName = attrParams.attrObject["function-name"];

    if (!attrParams.skillobject[functionName]) {
      functionName = "extractSingleParamVal"
    }

    let skillParams = { paramsObj, taskParams };
    return attrParams.skillobject[functionName](skillParams);
  }

  evaluateAttribute(attrParams, taskParam) {

    var evaluatedParams = [];
    var attrObjectValue = "";
    //the attr params currentky contains the string values , the LOC below converts it into values from the Step UI Json 
    evaluatedParams = this.getEvaluatedParams(attrParams.attrObject.params, attrParams.stepUIState);
    return this.evaluateFromFunc(attrParams, evaluatedParams, taskParam);
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
   */

  _executeIOMapFunction(attrObj, data, PromiseRequestsArr, resourceMap) {
    let attrParams = new attrParam(data.keyName, data.parentObj[data.keyName], attrObj.stepUIState, attrObj.skillRef),
      taskParam = new attrTaskParam(attrObj.taskId, attrObj.stepIndex, data.stateId, attrObj.dbFilestoreMgr, resourceMap);

    PromiseRequestsArr.push(this.genPromise(attrParams, taskParam)
      .then(resolveParams => {
        data.parentObj[data.keyName] = resolveParams.attrValue;
        if (resolveParams.preloadResArr) {
          if (!attrObj.IOMap.preload)
            attrObj.IOMap.preload = { resource: [] };
          else if (!attrObj.IOMap.preload.resource)
            attrObj.IOMap.preload.resource = [];
          attrObj.IOMap.preload.resource.push(...resolveParams.preloadResArr);
        }
      }, error => {
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

        let copyResPromiseArray = this._copyResourceFilesAndFillPreload(resourceMap, attrObj);

        return Promise.all(PromiseRequestsArr)
          .then(() => {
            iomap.preload.resource = self._removeDuplicatePreloadResources(iomap.preload.resource);
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

  _copyResourceFilesAndFillPreload(resourceMap, attrObj) {
    let copyResPromiseArray = [];
    for (let key in resourceMap) {
      copyResPromiseArray.push(attrObj.dbFilestoreMgr.copyTaskAssetFileEnhanced(key, resourceMap[key], attrObj.taskId, attrObj.stepIndex));

      //Adding in prload Res
      if (!attrObj.IOMap.preload)
        attrObj.IOMap.preload = { resource: [] };
      else if (!attrObj.IOMap.preload.resource)
        attrObj.IOMap.preload.resource = [];
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