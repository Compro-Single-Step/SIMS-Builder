const ExcelBaseSkill = require("../common/xlSkill");

module.exports = class maxFunction extends ExcelBaseSkill {

  getSheetNameAndSheetCountFromInitDocJSON(initDocJSON, dependantSheetArrayInModel) {

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

  addSheetNamesToDropdown(initDocJSON, dependantSheetArrayInModel) {

    //Empty the existing array
    while (dependantSheetArrayInModel.length > 0) {
      dependantSheetArrayInModel.pop(); //https://jsperf.com/array-clear-methods/3
    }
    //Add Sheet Names to Array From Init Doc JSON
    for (let sheetNum = 0; sheetNum < initDocJSON.sheetCount; sheetNum++) {
      dependantSheetArrayInModel.push(initDocJSON.sheets[sheetNum].name);
    }
  }
  updateSheetNameUsingDropdown(selectedSheetName, dependentSheetNameInModel) {
    dependentSheetNameInModel.name = selectedSheetName;
  }
  enableOrDisableOnSwitch(componentInput, dependentObjectInModel) {
    dependentObjectInModel.disabled = (componentInput) ? true : false;
  }
}