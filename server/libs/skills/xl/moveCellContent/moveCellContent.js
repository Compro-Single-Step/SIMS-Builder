(function(module){
  //init DOC JSON 
  module.exports.createJsonPath = function(valueParam){
     
    return valueParam[0].path;
  }


  module.exports.getSelectedCell = function(paramValueArr){
    
    return paramValueArr[0];

  }

  module.exports.getSelDragCell = function(paramValueArr){
    //requires sheet name using init doc json
    
    var finalObject = {};
    finalObject["sheetNo"] = 1;
    finalObject["startRange"] = paramValueArr[1];
    finalObject["endRange"] = paramValueArr[2];
    finalObject = JSON.stringify(finalObject);
    return finalObject;

  }


  module.exports.createTooltipImagePath  = function(paramValueArr){
     
    return paramValueArr[0].path;

  }



  module.exports.createImageJson = function(paramValueArr){
    
    var finalObject = {};
    finalObject['folderPath'] = paramValueArr[0].path;
    var sheetArr = []

      for(iterator = 0 ; iterator < paramValueArr[0].length; ++iterator){
        sheetArr[iterator] = {};
        sheetArr[iterator]['sheetNo'] = '1';
        sheetArr[iterator]['gridImg'] = paramValueArr[0][iterator].gridImage.name;
        sheetArr[iterator]['rowImg'] = paramValueArr[0][iterator].rowImage.name;
        sheetArr[iterator]['colImg'] = paramValueArr[0][iterator].cellImage.name;
        sheetArr[iterator]['cellImg'] = paramValueArr[0][iterator].columnImage.name;
    }
    finalObject['sheetImages'] = sheetArr;
    finalObject = JSON.stringify(finalObject);
    return finalObject;
  }


  module.exports.createHighlightJson  =  function(paramValueArr){
     
    // requires sheet number using Init Doc json
    var finalObject = {};
    finalObject["sheetNo"] = 1;
    finalObject["range"] = paramValueArr[1];
    finalObject = JSON.stringify(finalObject);
    return finalObject;
  }


  module.exports.createSheetCellData =function(paramValueArr){
     
    var finalObject = {};
    finalObject["sheetNo"] = 1;
    finalObject["dataJSONPath"] = paramValueArr[1].path;
    
    finalObject  =  JSON.stringify(finalObject);
    return finalObject;

  }

    module.exports.getSelectedCellFinal = function(paramValueArr){
    
    finalArray = [];
    
    var valuearray = paramValueArr[0].split(":");
    valuearray[0].trim();
    valuearray[1].trim();
    
    var c1 = valuearray[0].toUpperCase().charAt(0);
    var c2 = valuearray[1].toUpperCase().charAt(0);
    var r1 = parseInt(valuearray[0].substring(1, valuearray[0].length));
    var r2 = parseInt(valuearray[1].substring(1, valuearray[0].length));
    
    finalArray.push(valuearray[0]);
    
      for(iterator = 0 ; iterator <= c2.charCodeAt(0)-c1.charCodeAt(0); ++iterator){
        for( index = 0; index < r2-r1 ; ++index) {
          if(iterator != 0 || index != 0)
            finalArray.push(c1+r1 +":" + (String.fromCharCode(c1.charCodeAt(0) + iterator))+(r1+index));
        }

    }
    finalArray = JSON.stringify(finalArray);
    
    return finalArray;

  }

  module.exports.getSheetNameAndSheetCountFromInitDocJSON = function(initDocJSON, dependantSheetArrayInModel) {

    //Add The Required Number of Sheets in Model
    if (initDocJSON.sheetCount >= dependantSheetArrayInModel.length) {
        let sheetCountDiff = initDocJSON.sheetCount - dependantSheetArrayInModel.length;
        while (sheetCountDiff > 0) {
            dependantSheetArrayInModel.push(JSON.parse(JSON.stringify(dependantSheetArrayInModel[(dependantSheetArrayInModel.length - 1)])));
            sheetCountDiff--;
        }
    }

    //Add Sheet Names From Init Doc JSON
    for (let sheetNum = 0; sheetNum < initDocJSON.sheetCount; sheetNum++) {
        dependantSheetArrayInModel[sheetNum].name = initDocJSON.sheets[sheetNum].name;
    }
  }

  module.exports.addSheetNamesToDropdown = function(initDocJSON, dependantSheetArrayInModel) {
    
    //Add Sheet Names to Array From Init Doc JSON
    for (let sheetNum = 0; sheetNum < initDocJSON.sheetCount; sheetNum++) {
        dependantSheetArrayInModel.push(initDocJSON.sheets[sheetNum].name);
    }
  }


  module.exports.getSheetNameAndSheetCountFromInitDocJSON = function(initDocJSON, dependantSheetArrayInModel) {
    if (initDocJSON.sheetCount >= dependantSheetArrayInModel.length) {
        var sheetCountDiff = initDocJSON.sheetCount - dependantSheetArrayInModel.length;
        while (sheetCountDiff > 0) {
            dependantSheetArrayInModel.push(JSON.parse(JSON.stringify(dependantSheetArrayInModel[(dependantSheetArrayInModel.length - 1)])));
            sheetCountDiff--;
        }
    }
    for (var sheetNum = 0; sheetNum < initDocJSON.sheetCount; sheetNum++) {
        dependantSheetArrayInModel[sheetNum].name = initDocJSON.sheets[sheetNum].name;
    }
  }

  module.exports.addSheetNamesToDropdown = function(initDocJSON, dependantSheetArrayInModel) {
    for (var sheetNum = 0; sheetNum < initDocJSON.sheetCount; sheetNum++) {
        dependantSheetArrayInModel.push(initDocJSON.sheets[sheetNum].name);
    }
  }


})(typeof module === 'undefined'? this['skillModule']={ "exports": {}}: module);