//this file contains the object type implementation for the parameters of an attribute

class IOTranslator{

  //common function for getting the param array for the passed array of params
  getEvaluatedParams (paramObj , stepUIState){

    var evalexp = "stepUIState.model.";  
    // var finalArray = [];

    for(var param in paramObj ){
      paramObj[param] = eval(evalexp + paramObj[param]);

    }
    return paramObj;
  }

  evaluateFromFunc (attrName, functionName, paramsObj, skillobject){

      if(skillobject[functionName]){
        var finalValue = skillobject[functionName](paramsObj);
      }
      else{
        console.log("function not defined for the attribute : " + attrName);
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
      attrObjectValue = evaluatedParams[Object.keys(evaluatedParams)[0]];
    }
    else{
      // call the function type execution for the evaluation
      attrObjectValue = this.evaluateFromFunc(attrName, attrObject["function-name"], evaluatedParams, skillobject);
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

  getAttrValueMap (iomap, stepUIState, skillobject){
    //move out
    return this.readIOMap(iomap, stepUIState, skillobject);
  }
}

module.exports = new IOTranslator();