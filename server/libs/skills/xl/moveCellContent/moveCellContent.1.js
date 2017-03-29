const ExcelBaseSkill = require("../common/xlSkill");
const dummyDependencyFile = require("./dummyDependencyFile");

  //init DOC JSON 
  module.exports.createJsonPath = function(valueParam){

    dummyDependencyFile.dummyFun1(valueParam)
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

  module.exports.createTooltipImagePath = function(paramValueArr){
     
    return paramValueArr[0].path;
  }
  //this function to be moved to  Base Excel Skill 
  // to be done as soon as the Sheet number can be generated from the component handler 
  module.exports.createImageJson = function(paramValueArr){
    
    var finalObject = {};
    finalObject['folderPath'] = paramValueArr[0].path;
    var sheetArr = []

      for(var iterator = 0 ; iterator < paramValueArr[0].length; ++iterator){
        sheetArr[iterator] = {};
        sheetArr[iterator]['sheetNo'] = 1;
        sheetArr[iterator]['gridImg'] = paramValueArr[0][iterator].gridImage.name;
        sheetArr[iterator]['rowImg'] = paramValueArr[0][iterator].rowImage.name;
        sheetArr[iterator]['colImg'] = paramValueArr[0][iterator].cellImage.name;
        sheetArr[iterator]['cellImg'] = paramValueArr[0][iterator].columnImage.name;
    }
    finalObject['sheetImages'] = sheetArr;
    finalObject = JSON.stringify(finalObject);
    return finalObject;
  }


  module.exports.createHighlightJson = function(paramValueArr){
     
    // requires sheet number using Init Doc json
    var finalObject = {};
    finalObject["sheetNo"] = 1;
    finalObject["range"] = paramValueArr[1];
    finalObject = JSON.stringify(finalObject);
    return finalObject;
  }


  module.exports.createSheetCellData = function(paramValueArr){
     
    var finalObject = {};
    finalObject["sheetNo"] = 1;
    finalObject["dataJSONPath"] = paramValueArr[1].path;
    
    finalObject  =  JSON.stringify(finalObject);
    return finalObject;

  }

  module.exports.getSelectedCellFinal = function(paramValueArr){
    
    var finalArray = [];
    
    var valuearray = paramValueArr[0].split(":");
    valuearray[0].trim();
    valuearray[1].trim();
    
    var c1 = valuearray[0].toUpperCase().charAt(0);
    var c2 = valuearray[1].toUpperCase().charAt(0);
    var r1 = parseInt(valuearray[0].substring(1, valuearray[0].length));
    var r2 = parseInt(valuearray[1].substring(1, valuearray[0].length));
    
    finalArray.push(valuearray[0]);
    
      for(var iterator = 0 ; iterator <= c2.charCodeAt(0)-c1.charCodeAt(0); ++iterator){
        for(var index = 0; index < r2-r1 ; ++index) {
          if(iterator != 0 || index != 0)
            finalArray.push(c1+r1 +":" + (String.fromCharCode(c1.charCodeAt(0) + iterator))+(r1+index));
        }

    }
  }