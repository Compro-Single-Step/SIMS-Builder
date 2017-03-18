
module.exports = class IOTranslator{

  //common function for getting the param array for the passed array of params
  getEvaluatedParams (paramArr , stepUIState){

    var evalexp = "stepUIState.model.";  
    var finalArray = [];

    for(var iterator = 0; iterator < paramArr.length; ++iterator ){
      finalArray[iterator] = eval(evalexp + paramArr[iterator]);
      
    }
    return finalArray;
  }

  evaluateFromFunc (functionName, paramsArr, skillobject){

      if(skillobject[functionName]){
        var finalValue = skillobject[functionName](paramsArr);
      }
      else{
        console.log("function not defined for the attribute");
      }

      return finalValue;
  }


  evaluateAttribute (attrName, attrObject, stepUIState, skillobject){

    var evaluatedParams = [];
    var attrObjectValue = "";
    //the attr params currentky contains the string values , the LOC below converts it into values from the Step UI Json 
    evaluatedParams = this.getEvaluatedParams(attrObject.params, stepUIState);

    if(attrObject["function-name"] == null){
      // assign directly
      attrObjectValue = evaluatedParams[0];
    }
    else{
      // call the function type execution for the evaluation
      attrObjectValue = this.evaluateFromFunc(attrObject["function-name"], evaluatedParams, skillobject);
    }
    return attrObjectValue
  }



  readIOMap(iomap, stepUIState, skillobject){
      
      for(var stateNum in iomap.states){
        var stateObj = iomap.states[stateNum];
        for(var componentNum in stateObj.components){
            var componentObj = iomap.states[stateNum].components[componentNum];
            for(var attrType in componentObj){
              var attrTypeObj  = iomap.states[stateNum].components[componentNum][attrType]
              for(var attrSet in attrTypeObj){
                var attrSetObj = iomap.states[stateNum].components[componentNum][attrType][attrSet];
                for(var attrName in attrSetObj){
                  
                  attrSetObj[attrName] = this.evaluateAttribute(attrName, attrSetObj[attrName], stepUIState, skillobject);
            
              }
              }
            }
        }
    }
    // return the IOMap
    return iomap;
  }

  translateMap (iomap, stepUIState, skillobject){
    //move out
    return this.readIOMap(iomap, stepUIState, skillobject);
  }
}