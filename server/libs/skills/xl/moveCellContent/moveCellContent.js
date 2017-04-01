// this file contains all the functions for the MovecellContent with the object implementation of the parameterArray



  const ExcelBaseSkill = require("../common/xlSkill");

  class moveCellContent extends ExcelBaseSkill{
    // //init DOC JSON 
    createJsonPath(skillParams ,callback){
        
      var taskParams = skillParams.taskParams;
      var paramValueObj = skillParams.paramsObj
      taskParams.dbFilestoreMgr.copyTaskAssetFile(paramValueObj["docData"]["path"], taskParams, function(error, xmlPath, fileType){
        paramValueObj["docData"]["path"] = xmlPath;
        if(!error){
          var preloadResArr = [];
          preloadResArr.push({"path":""+xmlPath,"type":""+fileType})
          callback(null, paramValueObj["docData"]["path"]);
          //add this new path to the preloadResources Array
        }
        else{
          callback(error);
        }  
      })
    }

    getSelectedCell(skillParams ,callback){
      
      var paramValueObj = skillParams.paramsObj
      callback(null,paramValueObj["srcRange"]);
      
    }

    getSelDragCell(skillParams ,callback){
      
      var paramValueObj = skillParams.paramsObj
      //requires sheet name using init doc json
      var finalObject = {};
      finalObject["sheetNo"] = 1;
      finalObject["startRange"] = paramValueObj["srcRange"];
      finalObject["endRange"] = paramValueObj["destRange"];
      finalObject = JSON.stringify(finalObject);
      callback(null,finalObject)
      

    }
    
    createHighlightJson (skillParams, callback){
      
      var paramValueObj = skillParams.paramsObj
      // requires sheet number using Init Doc json
      var finalObject = {};
      finalObject["sheetNo"] = 1;
      finalObject["range"] = paramValueObj["srcRange"];
      finalObject = JSON.stringify(finalObject);
      callback(null,finalObject)
      
    }


    createSheetCellData (skillParams, callback){
      
      var taskParams = skillParams.taskParams;
      var paramValueObj = skillParams.paramsObj;
      var finalObject = {};
      finalObject["sheetNo"] = 1;
      //getSheetNameMapgetSheetNameMap(sheetName, initDocJsonPath)

      taskParams.dbFilestoreMgr.copyTaskAssetFile(paramValueObj["wbData"].path, taskParams, function(error, xmlPath, fileType){
        
        if(!error){
          paramValueObj["wbData"].path = xmlPath;
          finalObject["dataJSONPath"] = paramValueObj["wbData"].path;
          finalObject  =  JSON.stringify(finalObject);
          var preloadResArr = [];
          preloadResArr.push({"path":""+xmlPath,"type":""+fileType})
          callback(null, finalObject, preloadResArr);
        }
        else{
          // console.log("error in the createSheetCellData");
          callback(error);
        }
          
      })
    }

    getSelectedCellFinal(skillParams, callback){
      
      var paramValueObj = skillParams.paramsObj
      var finalArray = [];
      
      var valuearray = paramValueObj["destRange"].split(":");
      valuearray[0].trim();
      valuearray[1].trim();
      
      var col1 = valuearray[0].toUpperCase().charAt(0);
      var col2 = valuearray[1].toUpperCase().charAt(0);
      var row1 = parseInt(valuearray[0].substring(1, valuearray[0].length));
      var row2 = parseInt(valuearray[1].substring(1, valuearray[0].length));
      
      finalArray.push(valuearray[0]);
      
        for(var iterator = 0 ; iterator <= col2.charCodeAt(0)-col1.charCodeAt(0); ++iterator){
          for(var index = 0; index <= row2-row1 ; ++index) {
            if(iterator != 0 || index != 0)
              finalArray.push(col1+row1 +":" + (String.fromCharCode(col1.charCodeAt(0) + iterator))+(row1 + index));
          }

      }
      
      callback(null,finalArray);
      

    }
    
  }
  module.exports = moveCellContent;
