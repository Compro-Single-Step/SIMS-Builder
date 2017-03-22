// this file contains all the functions for the MovecellContent with the object implementation of the parameterArray


(function(){

  const ExcelBaseSkill = require("../common/xlSkill");

  class moveCellContent extends ExcelBaseSkill{
    //init DOC JSON 
    createJsonPath(paramValueObj){
        
      return paramValueObj["docData"]["path"];
    }

    getSelectedCell(paramValueObj){
      
      return paramValueObj["srcRange"];
    }

    getSelDragCell(paramValueObj){
      //requires sheet name using init doc json
      var finalObject = {};
      finalObject["sheetNo"] = 1;
      finalObject["startRange"] = paramValueObj["srcRange"];
      finalObject["endRange"] = paramValueObj["destRange"];
      finalObject = JSON.stringify(finalObject);
      return finalObject;

    }
    
    createHighlightJson (paramValueObj){
      // requires sheet number using Init Doc json
      var finalObject = {};
      finalObject["sheetNo"] = 1;
      finalObject["range"] = paramValueObj["srcRange"];
      finalObject = JSON.stringify(finalObject);
      return finalObject;
    }


    createSheetCellData (paramValueObj){
      
      var finalObject = {};
      finalObject["sheetNo"] = 1;
      finalObject["dataJSONPath"] = paramValueObj["wbData"].path;
      
      finalObject  =  JSON.stringify(finalObject);
      return finalObject;

    }

    getSelectedCellFinal (paramValueObj){
      var finalArray = [];
      
      var valuearray = paramValueArr["destRange"].split(":");
      valuearray[0].trim();
      valuearray[1].trim();
      
      var col1 = valuearray[0].toUpperCase().charAt(0);
      var col2 = valuearray[1].toUpperCase().charAt(0);
      var row1 = parseInt(valuearray[0].substring(1, valuearray[0].length));
      var row2 = parseInt(valuearray[1].substring(1, valuearray[0].length));
      
      finalArray.push(valuearray[0]);
      
        for(var iterator = 0 ; iterator <= col2.charCodeAt(0)-col1.charCodeAt(0); ++iterator){
          for(var index = 0; index < row2-row1 ; ++index) {
            if(iterator != 0 || index != 0)
              finalArray.push(col1+row1 +":" + (String.fromCharCode(col1.charCodeAt(0) + iterator))+(row1+index));
          }

      }
      
      return finalArray;

    }
    
  }
  module.exports = new moveCellContent();

})(typeof module.exports === 'undefined'? this['myModule']={}: module);
