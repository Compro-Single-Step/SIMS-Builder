

//common function for getting the param array for the passed array of params
getEvaluatedParams = function(paramArr , stepUIState){
  
  
  var evalexp = "stepUIState.model.";  
  var finalArray = [];

  for(var iterator = 0; iterator < paramArr.length; ++iterator ){
    finalArray[iterator] = eval(evalexp + paramArr[iterator]);
    
  }
  return finalArray;
}

evaluateFromFunc = function(functionName, paramsArr, skillobject){

    if(skillobject[functionName]){
      var finalValue = skillobject[functionName](paramsArr);
    }
    else{
      console.log("function not defined for the attribute");
    }

    return finalValue;
}


evaluateAttribute = function(attrName, attrObject, stepUIState, skillobject){

  var evaluatedParams = [];
  var attrObjectValue = "";
  //the attr params currentky contains the string values , the LOC below converts it into values from the Step UI Json 
  evaluatedParams = getEvaluatedParams(attrObject.params, stepUIState);

  if(attrObject["function-name"] == null){
    // assign directly
    attrObjectValue = evaluatedParams[0];
  }
  else{
    // call the function type execution for the evaluation
    attrObjectValue = evaluateFromFunc(attrObject["function-name"], evaluatedParams, skillobject);
  }
  return attrObjectValue
}



readIOMap = function(iomap, stepUIState, skillobject){
    
    for(stateNum in iomap.states){
      var stateObj = iomap.states[stateNum];
      for(componentNum in stateObj.components){
          var componentObj = iomap.states[stateNum].components[componentNum];
          for(attrType in componentObj){
            var attrTypeObj  = iomap.states[stateNum].components[componentNum][attrType]
            for(attrSet in attrTypeObj){
              var attrSetObj = iomap.states[stateNum].components[componentNum][attrType][attrSet];
              for(attrName in attrSetObj){
                
                attrSetObj[attrName] = evaluateAttribute(attrName, attrSetObj[attrName], stepUIState, skillobject);
           
             }
            }
          }
      }
  }
  // return the IOMap
  return iomap;
}

exports.translateMap = function(iomap, stepUIState, skillobject){
  //move out
  return readIOMap(iomap, stepUIState, skillobject);
}