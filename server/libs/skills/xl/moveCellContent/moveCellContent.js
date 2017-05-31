// this file contains all the functions for the MovecellContent with the object implementation of the parameterArray



const ExcelBaseSkill = require("../common/xlSkill");

class MoveCellContent extends ExcelBaseSkill {

  //dynamic sheet update
  init(data) {
    var initDocJSonPath = data.stepUIState.views["1"].documentData.path;
    var skilldata = { "initDocJSonPath": initDocJSonPath, "dbMgr": data.dbFilestoreMgr };
    return super.init(skilldata);
  }

  // function moved to XLskill
  // init DOC JSON 
  // createJsonPath(skillParams) {
  // }

  getSelectedCell(skillParams) {
    var paramValueObj = skillParams.paramsObj;
    paramValueObj["srcRange"] = paramValueObj["srcRange"].toUpperCase();
    var resolveParams = { "attrValue": paramValueObj["srcRange"] };
    return Promise.resolve(resolveParams);

  }

  getSelDragCell(skillParams) {

    var paramValueObj = skillParams.paramsObj
    //requires sheet name using init doc json
    var finalObject = {};
    finalObject["sheetNo"] = this.getSheetNumber(paramValueObj.sheetAction);
    finalObject["startRange"] = paramValueObj["srcRange"].toUpperCase();
    finalObject["endRange"] = paramValueObj["destRange"].toUpperCase();
    finalObject = JSON.stringify(finalObject);
    var resolveParams = { "attrValue": finalObject };
    return Promise.resolve(resolveParams);
  }

  createHighlightJson(skillParams) {

    var paramValueObj = skillParams.paramsObj
    // requires sheet number using Init Doc json
    var finalObject = {};
    finalObject["sheetNo"] = this.getSheetNumber(paramValueObj.sheetAction);
    finalObject["range"] = paramValueObj["srcRange"].toUpperCase();
    finalObject = JSON.stringify(finalObject);
    var resolveParams = { "attrValue": finalObject };
    return Promise.resolve(resolveParams);

  }

  // Moved to Xlskill
  // createSheetCellData(skillParams) {
  // }

  getSelectedCellFinal(skillParams) {

    var paramValueObj = skillParams.paramsObj
    var finalArray = [];
    paramValueObj["destRange"] = paramValueObj["destRange"].toUpperCase();
    var valuearray = paramValueObj["destRange"].split(":");
    valuearray[0].trim();
    valuearray[1].trim();

    var col1 = valuearray[0].toUpperCase().charAt(0);
    var col2 = valuearray[1].toUpperCase().charAt(0);
    var row1 = parseInt(valuearray[0].substring(1, valuearray[0].length));
    var row2 = parseInt(valuearray[1].substring(1, valuearray[1].length));

    finalArray.push(valuearray[0]);

    for (var iterator = 0; iterator <= col2.charCodeAt(0) - col1.charCodeAt(0); ++iterator) {
      for (var index = 0; index <= row2 - row1; ++index) {
        if (iterator != 0 || index != 0)
          finalArray.push(col1 + row1 + ":" + (String.fromCharCode(col1.charCodeAt(0) + iterator)) + (row1 + index));
      }

    }
    var resolveParams = { "attrValue": finalArray };
    return Promise.resolve(resolveParams);


  }



  getSheetDetails(initDocJSON, dependantSheetArrayInModel, clonedDependantSheetArrayInModel) {
    while (dependantSheetArrayInModel.length > 0) {
      dependantSheetArrayInModel.pop(); //https://jsperf.com/array-clear-methods/3
    }

    if (initDocJSON === null || initDocJSON === undefined) { //initDocJSON Removed
      dependantSheetArrayInModel.push(clonedDependantSheetArrayInModel[0]);
    }
    else {  //initDocJSON Added

      //Add Sheet Names From Init Doc JSON
      for (let sheetNum = 0; sheetNum < initDocJSON.sheetCount; sheetNum++) {
        dependantSheetArrayInModel.push(JSON.parse(JSON.stringify(clonedDependantSheetArrayInModel[0])));
        dependantSheetArrayInModel[sheetNum].name = initDocJSON.sheets[sheetNum].name;
      }
    }
  }

  addSheetNamesToDropdown(initDocJSON, dependantSheetArrayInModel) {

    //Empty the existing array
    while (dependantSheetArrayInModel.length > 0) {
      dependantSheetArrayInModel.pop(); //https://jsperf.com/array-clear-methods/3
    }
    if (initDocJSON !== null && initDocJSON !==undefined) {
      //Add Sheet Names to Array From Init Doc JSON
      for (let sheetNum = 0; sheetNum < initDocJSON.sheetCount; sheetNum++) {
        var sheetName = initDocJSON.sheets[sheetNum].name;
        dependantSheetArrayInModel.push({ "label": sheetName, "data": sheetName });
      }
    }
  }

  updateSheetName(selectedSheetName, dependentSheetArrayInModel, clonedDependentSheetArrayInModel) {
    while (dependentSheetArrayInModel.length > 0) {
      dependentSheetArrayInModel.pop();
    }
    dependentSheetArrayInModel.push(JSON.parse(JSON.stringify(clonedDependentSheetArrayInModel[0])));
    if (selectedSheetName) {
      dependentSheetArrayInModel[0].name = selectedSheetName.label;
    }
  }
}
module.exports = MoveCellContent;
