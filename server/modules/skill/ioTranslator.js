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

  genPromise(attrParams, taskParam){
    var self =  this;
    return new Promise(function(resolve, reject){
      iotranslatorobj.evaluateAttribute(attrParams, taskParam)
      .then(function(resolveParams){
          resolve(resolveParams);
      },function(error){
          console.log("promise rejection at genPromise");
          reject(error);
      });



    })
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

  evaluateFromFunc ( attrParams, paramsObj, taskParam){

 var functionName = attrParams.attrObject["function-name"];
 
      if(!attrParams.skillobject[functionName]){
        functionName = "extractSingleParamVal"
      }

      var skillParams = {"paramsObj":paramsObj, "taskParams": taskParam};
      return attrParams.skillobject[functionName](skillParams);
  }

  evaluateAttribute(attrParams, taskParam){

    var evaluatedParams = [];
    var attrObjectValue = "";
    //the attr params currentky contains the string values , the LOC below converts it into values from the Step UI Json 
    evaluatedParams = this.getEvaluatedParams(attrParams.attrObject.params, attrParams.stepUIState);
    return this.evaluateFromFunc(attrParams, evaluatedParams, taskParam);
  }


 readIOMap(attrObj){
      
      var iomap = attrObj.IOMap;
      var PromiseRequestsArr  = [];

      var self = this;
      //remove this return statement below
      return attrObj.skillRef["init"](attrObj).then(function(){
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
                    
                      PromiseRequestsArr.push(self.genPromise(attrParams, taskParam).then(function(resolveParams){
                          attrSetObj[attrName] = resolveParams.attrValue;
                          if(resolveParams.preloadResArr){
                            self.appendPreloadRes(resolveParams.preloadResArr,attrObj.IOMap);
                          }
                    
                    },function(error){

                      return Promise.reject(error);
                    }));

                    }
                  }
                }        
            }
          }
        
      
      return Promise.all(PromiseRequestsArr).then(function(value) {
         console.log("promise all success");
         return Promise.resolve(iomap);
        },function(err){
          console.log("promise all rejection");
          console.log(err.message);
          return Promise.reject(err);
        }).catch(function(err){
          console.log("promise all catch");
          console.log(err.message);
          return Promise.reject(err);
        });
        // return Promise.resolve();
    },function(error){
      console.log("Init function came with an error");
      return Promise.reject(error)
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

    getAttrValueMap (attrObj){
      var self = this;
        return self.readIOMap(attrObj)
        .then(function(ioMap){
        return Promise.resolve(ioMap);
      },function(error){
        return Promise.reject(error);
      });
  }
}
var iotranslatorobj = new IOTranslator();
module.exports = iotranslatorobj;