// this file contains all the functions for the MovecellContent with the object implementation of the parameterArray
const baseSkill = require("../../common/baseSkill");

const xmlUtil = require("../../../../utils/xmlUtil");

class importAccessobject extends baseSkill {

  //tooltip text to be displayed
  getTootlTipText(skillParams){
    var paramValueObj = skillParams.paramsObj
    var resolveParams = {"Access - " : paramValueObj["DocTitle"]};
    return Promise.resolve(resolveParams);
  }
  getFileName(skillParams){
   
    var paramValueObj = skillParams.paramsObj;
    var res = paramValueObj.split("\\");

  }


   //init DOC JSON 
  // createJsonPath(skillParams, callback) {

  //   var taskParams = skillParams.taskParams;
  //   var paramValueObj = skillParams.paramsObj;

  
  //     return taskParams.dbFilestoreMgr.copyTaskAssetFile(paramValueObj["docData"], taskParams)
  //       .then(function(resolveParam){
  //         paramValueObj["docData"] = resolveParam.filePath;
  //         var preloadResArr = [];
  //         preloadResArr.push({ "path": "" +  resolveParam.filePath, "type": "" + resolveParam.fileType })
  //         resolveParam = {"attrValue":paramValueObj["docData"],"preloadResArr":preloadResArr}
  //         return Promise.resolve(resolveParam);
  //   },function(error){
  //     return Promise.reject(error);
  //     console.log("rejection at the movecellcontent");
  //   }).catch(function(error){
  //       return Promise.reject(error);
  //   });
    
  // }

  // getSelectedCell(skillParams, callback) {

  //   var paramValueObj = skillParams.paramsObj
  //   var resolveParams = {"attrValue" : paramValueObj["srcRange"]};
  //   return Promise.resolve(resolveParams);

  // }

  // getSelDragCell(skillParams, callback) {

  //   var paramValueObj = skillParams.paramsObj
  //   //requires sheet name using init doc json
  //   var finalObject = {};
  //   finalObject["sheetNo"] = this.getSheetNumber(paramValueObj.sheetAction);
  //   finalObject["startRange"] = paramValueObj["srcRange"];
  //   finalObject["endRange"] = paramValueObj["destRange"];
  //   finalObject = JSON.stringify(finalObject);
  //   var resolveParams = {"attrValue" :finalObject};
  //   return Promise.resolve(resolveParams);
  // }

  // createHighlightJson(skillParams, callback) {

  //   var paramValueObj = skillParams.paramsObj
  //   // requires sheet number using Init Doc json
  //   var finalObject = {};
  //   finalObject["sheetNo"] = this.getSheetNumber(paramValueObj.sheetAction);
  //   finalObject["range"] = paramValueObj["srcRange"];
  //   finalObject = JSON.stringify(finalObject);
  //   var resolveParams = {"attrValue" :finalObject};
  //   return Promise.resolve(resolveParams);

  // }


  // createSheetCellData(skillParams, callback) {

  //   var taskParams = skillParams.taskParams;
  //   var paramValueObj = skillParams.paramsObj;
  //   var finalObject = {};
  //   finalObject["sheetNo"] = this.getSheetNumber(paramValueObj.sheetAction);
  //     return taskParams.dbFilestoreMgr.copyTaskAssetFile(paramValueObj["wbData"], taskParams)
  //     .then(function(resolaveParams){
  //       paramValueObj["wbData"] = resolaveParams.filePath
  //       finalObject["dataJSONPath"] = paramValueObj["wbData"];
  //       finalObject = JSON.stringify(finalObject);
  //       var preloadResArr = [];
  //       preloadResArr.push({ "path": "" + resolaveParams.filePath, "type": "" + resolaveParams.fileType })
  //       var resolveParams = {"attrValue": finalObject, "preloadResArr":preloadResArr};
  //       return Promise.resolve(resolveParams);

  //   },function(error){
  //       return Promise.reject(error);
  //   });
  // }

  // getSelectedCellFinal(skillParams, callback) {

  //   var paramValueObj = skillParams.paramsObj
  //   var finalArray = [];

  //   var valuearray = paramValueObj["destRange"].split(":");
  //   valuearray[0].trim();
  //   valuearray[1].trim();

  //   var col1 = valuearray[0].toUpperCase().charAt(0);
  //   var col2 = valuearray[1].toUpperCase().charAt(0);
  //   var row1 = parseInt(valuearray[0].substring(1, valuearray[0].length));
  //   var row2 = parseInt(valuearray[1].substring(1, valuearray[0].length));

  //   finalArray.push(valuearray[0]);

  //   for (var iterator = 0; iterator <= col2.charCodeAt(0) - col1.charCodeAt(0); ++iterator) {
  //     for (var index = 0; index <= row2 - row1; ++index) {
  //       if (iterator != 0 || index != 0)
  //         finalArray.push(col1 + row1 + ":" + (String.fromCharCode(col1.charCodeAt(0) + iterator)) + (row1 + index));
  //     }

  //   }
  //   var resolveParams = {"attrValue" : finalArray};
  //   return Promise.resolve(resolveParams);


  // }



  // getSheetNameAndSheetCountFromInitDocJSON(initDocJSON, dependantSheetArrayInModel) {

  //   //Add The Required Number of Sheets in Model
  //   if (initDocJSON.sheetCount >= dependantSheetArrayInModel.length) {
  //     let sheetCountDiff = initDocJSON.sheetCount - dependantSheetArrayInModel.length;
  //     while (sheetCountDiff > 0) {
  //       dependantSheetArrayInModel.push(JSON.parse(JSON.stringify(dependantSheetArrayInModel[(dependantSheetArrayInModel.length - 1)])));
  //       sheetCountDiff--;
  //     }
  //   }

  //   //Add Sheet Names From Init Doc JSON
  //   for (let sheetNum = 0; sheetNum < initDocJSON.sheetCount; sheetNum++) {
  //     dependantSheetArrayInModel[sheetNum].name = initDocJSON.sheets[sheetNum].name;
  //   }
  // }

  // addSheetNamesToDropdown(initDocJSON, dependantSheetArrayInModel) {

  //   //Empty the existing array
  //   while(dependantSheetArrayInModel.length > 0) {
  //     dependantSheetArrayInModel.pop(); //https://jsperf.com/array-clear-methods/3
  //   }
  //   //Add Sheet Names to Array From Init Doc JSON
  //   for (let sheetNum = 0; sheetNum < initDocJSON.sheetCount; sheetNum++) {
  //     dependantSheetArrayInModel.push(initDocJSON.sheets[sheetNum].name);
  //   }
  // }
  // updateSheetNameUsingDropdown(selectedSheetName, dependentSheetNameInModel) {
  //       dependentSheetNameInModel.name = selectedSheetName;
  // }
}
module.exports = importAccessobject;
