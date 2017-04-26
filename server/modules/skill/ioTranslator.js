//this file contains the object type implementation for the parameters of an attribute

var attrParam = function (attrName, attrObject, stepUIState, skillobject, IOMapRef) {
  this.attrName = attrName;
  this.attrObject = attrObject;
  this.stepUIState = stepUIState;
  this.skillobject = skillobject;
}

var attrTaskParam = function (taskId, stepIndex, stateId, dbFilestoreMgr) {

  this.taskId = taskId;
  this.stepIndex = stepIndex;
  this.stateId = stateId;
  this.dbFilestoreMgr = dbFilestoreMgr;
}

class IOTranslator {

  genPromise(attrParams, taskParam) {
    var self = this;
    return new Promise(function (resolve, reject) {
      iotranslatorobj.evaluateAttribute(attrParams, taskParam)
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

  evaluateFromFunc(attrParams, paramsObj, taskParam) {

    var functionName = attrParams.attrObject["function-name"];

    if (!attrParams.skillobject[functionName]) {
      functionName = "extractSingleParamVal"
    }

    var skillParams = { "paramsObj": paramsObj, "taskParams": taskParam };
    return attrParams.skillobject[functionName](skillParams);
  }

  evaluateAttribute(attrParams, taskParam) {

    var evaluatedParams = [];
    var attrObjectValue = "";
    //the attr params currentky contains the string values , the LOC below converts it into values from the Step UI Json 
    evaluatedParams = this.getEvaluatedParams(attrParams.attrObject.params, attrParams.stepUIState);
    return this.evaluateFromFunc(attrParams, evaluatedParams, taskParam);
  }

  // This function returns the promise which fills the value from stepUIState in the corresponding node of IOMap
  _executeIOMapFunction(attrObj, data, PromiseRequestsArr) {
    let attrParams = new attrParam(data.keyName, data.parentObj[data.keyName], attrObj.stepUIState, attrObj.skillRef),
      taskParam = new attrTaskParam(attrObj.taskId, attrObj.stepIndex, data.stateId, attrObj.dbFilestoreMgr);

    PromiseRequestsArr.push(this.genPromise(attrParams, taskParam)
      .then(resolveParams => {
        data.parentObj[data.keyName] = resolveParams.attrValue;
        if (resolveParams.preloadResArr) {
          this.appendPreloadRes(resolveParams.preloadResArr, attrObj.IOMap);
        }
      }, error => {
        return Promise.reject(error);
      }));
  }

  //This function is used to read the IOMap JSON and and generate Attribute value map by filling values from step UI state.
  readIOMap(attrObj) {
    let iomap = attrObj.IOMap;

    return attrObj.skillRef["init"](attrObj).then(() => {
      let self = this,
        PromiseRequestsArr = [];

      // Recursively traversing the IOMap JSON and getting the corresponding function names given in key 'function-name'
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

          //When function-name is found  pass its whole object to _executeIOMapFunction else if the current node is an object, again traverse it
          if (key === "function-name") {
            // This function returns the promise which fills the value from stepUIState in the corresponding node of IOMap
            self._executeIOMapFunction(attrObj, { parentObj, keyName, stateId, compId }, PromiseRequestsArr);
          }
          else if (typeof parentObj[keyName][key] === "object") {
            traverseIOMap(parentObj[keyName], key, stateId, compId);
          }
        }
      })({ "iomap": iomap }, "iomap");

      return Promise.all(PromiseRequestsArr).then(function (value) {
        console.log("promise all success");
        return Promise.resolve(iomap);
      }, function (err) {
        console.log("promise all rejection");
        console.log(err.message);
        return Promise.reject(err);
      }).catch(function (err) {
        console.log("promise all catch");
        console.log(err.message);
        return Promise.reject(err);
      });
    }, function (error) {
      console.log("Init function came with an error");
      return Promise.reject(error)
    });
  }

  appendPreloadRes(preloadResArr, IOMap) {
    if (!(IOMap["preloadResources"])) {
      IOMap["preloadResources"] = [];
    }
    for (var index = 0; index < preloadResArr.length; ++index) {
      IOMap["preloadResources"].push(preloadResArr[index]);
    }
  }

  getAttrValueMap(attrObj) {
    return this.readIOMap(attrObj)
      .then(function (ioMap) {
        return Promise.resolve(ioMap);
      }
      , function (error) {
        return Promise.reject(error);
      }
      );
  }
}
var iotranslatorobj = new IOTranslator();
module.exports = iotranslatorobj;