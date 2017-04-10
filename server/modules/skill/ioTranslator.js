//this file contains the object type implementation for the parameters of an attribute

var attrParam = function(attrName, attrObject, stepUIState, skillobject ,IOMapRef){
    this.attrName = attrName;
    this.attrObject = attrObject;
    this.stepUIState = stepUIState;
    this.skillobject = skillobject;
}

var attrTaskParam = function( taskId, stepIndex, stateId, dbFilestoreMgr){
    
    this.taskId = taskId;
    this.stepIndex = stepIndex;
    this.stateId = stateId;
    this.dbFilestoreMgr = dbFilestoreMgr;
}

class IOTranslator{

  genPromise(attrParams, taskParam, callback){
    var self =  this;
    return new Promise(function(resolve, reject){
      // return self.execPromise(resolve, reject, attrParams, taskParam, callback);
      iotranslatorobj.evaluateAttribute(attrParams, taskParam, function(error, attrVal, preloadResArr){

      if(!error){
        var resolveParam = {"attrVal":attrVal,"preloadResArr":preloadResArr}
        resolve(resolveParam);
      }
      else{
        reject(error);
      }
     
  });
    })
    .then(function(resolveParam){
      callback(null, resolveParam.attrVal, resolveParam.preloadResArr);
    })
    // ,function(error){
    //   console.log("rejection");
    //   return Promise.reject();
    // })
    // .catch(function(error){
    //   console.log("Promise has been rejected");
    //   callback(error,null);
    // })
}


  //common function for getting the param array for the passed array of params
  getEvaluatedParams (paramObj , stepUIState){

    var evalexp = "stepUIState.";  
    // var finalArray = [];

    for(var param in paramObj ){
      paramObj[param] = eval(evalexp + paramObj[param]);
      
    }
    return paramObj;
  }

  evaluateFromFunc ( attrParams, paramsObj, taskParam, callback){

 var functionName = attrParams.attrObject["function-name"];
 
      if(!attrParams.skillobject[functionName]){
        functionName = "extractSingleParamVal"
      }
      
      var skillParams = {"paramsObj":paramsObj, "taskParams": taskParam}
      attrParams.skillobject[functionName](skillParams, callback);
  }

  evaluateAttribute(attrParams, taskParam, callback){

    var evaluatedParams = [];
    var attrObjectValue = "";
    //the attr params currentky contains the string values , the LOC below converts it into values from the Step UI Json 
    evaluatedParams = this.getEvaluatedParams(attrParams.attrObject.params, attrParams.stepUIState);
      
    this.evaluateFromFunc(attrParams, evaluatedParams, taskParam, function(error, dataObject, preloadResArr){
        callback(error, dataObject, preloadResArr);
      });
  }


  readIOMap(attrObj,callback){
      
      var iomap = attrObj.IOMap;
      var PromiseRequestsArr  = [];

      var self = this;
      attrObj.skillRef["init"](attrObj, function(error){
        if(!error)
        {
          for(let stateNum in iomap.states){
            let stateObj = iomap.states[stateNum];
            for(let componentNum in stateObj.components){
                let componentObj = iomap.states[stateNum].components[componentNum];
                for(let attrType in componentObj){
                  let attrTypeObj  = iomap.states[stateNum].components[componentNum][attrType]
                  for(let attrSet in attrTypeObj){
                    let attrSetObj = iomap.states[stateNum].components[componentNum][attrType][attrSet];
                    for(let attrName in attrSetObj){

                      var attrParams = new attrParam(attrName, attrSetObj[attrName], attrObj.stepUIState, attrObj.skillRef);
                      var taskParam = new attrTaskParam(attrObj.taskId, attrObj.stepIndex, stateNum, attrObj.dbFilestoreMgr);
                      var self = this;
                      PromiseRequestsArr.push(self.genPromise(attrParams, taskParam, function(error, attrVal, preloadResArr){
                        if(!error){
                          attrSetObj[attrName] = attrVal;
                          if(preloadResArr){
                            self.appendPreloadRes(preloadResArr,attrObj.IOMap)
                          }
                        }
                    }));
                    }
                  }
                }        
            }
          }
        }
      
      Promise.all(PromiseRequestsArr).then(function(value) {
         console.log("promise all success");
         callback(null,iomap);
        //  return iomap;
        },function(err){
          console.log("promise all rejection");
          console.log(err.message);
        }).catch(function(err){
          console.log("promise all catch");
          console.log(err.message);
        });
    });
  }

    appendPreloadRes(preloadResArr, IOMap){
      if(!(IOMap["preloadResources"])){
        IOMap["preloadResources"] = [];
      }
      for(var index = 0; index < preloadResArr.length; ++index){
           IOMap["preloadResources"].push(preloadResArr[index]);
      }
    }

    getAttrValueMap (attrObj, callback){

    //move out
      return this.readIOMap(attrObj, callback);

  }

}
var iotranslatorobj = new IOTranslator();
module.exports = iotranslatorobj;
