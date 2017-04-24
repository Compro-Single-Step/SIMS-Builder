const ExcelBaseSkill = require("../common/xlSkill");

class sortingTableColumns extends ExcelBaseSkill {

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
    while(dependantSheetArrayInModel.length > 0) {
      dependantSheetArrayInModel.pop(); //https://jsperf.com/array-clear-methods/3
    }
    //Add Sheet Names to Array From Init Doc JSON
    for (let sheetNum = 0; sheetNum < initDocJSON.sheetCount; sheetNum++) {
      var sheetName = initDocJSON.sheets[sheetNum].name;
      dependantSheetArrayInModel.push({"label":sheetName,"data":sheetName});
    }
  }
  updateSheetNameUsingDropdown(selectedSheetName, dependentSheetNameInModel) {
        dependentSheetNameInModel.name = selectedSheetName.label;
  }

  updateColumnNamesInDropdown(columnHeadersData, dependantSheetArrayInModel){
    //Empty the existing array
    while(dependantSheetArrayInModel.length > 0) {
      dependantSheetArrayInModel.pop(); //https://jsperf.com/array-clear-methods/3
    }
    //Add column header names from Column Headers csv file
    var columnHeaders = columnHeadersData.split(/\r\n|\n/);
    for (var i=0; i<columnHeaders.length; i++) {
        var columnHeaderName = columnHeaders[i].split(',')[0];
        var columnHeaderDataType = columnHeaders[i].split(',')[1];
        if(columnHeaderName != "")
          dependantSheetArrayInModel.push({"label":columnHeaderName,"data":columnHeaderDataType});
    }
  }
  updateSortTypesInDropdown(selectedColumnHeader, dependantSheetArrayInModel){
    var selectedColumnHeaderType = selectedColumnHeader.data;
    //Empty the existing array
    while(dependantSheetArrayInModel.length > 0) {
      dependantSheetArrayInModel.pop(); //https://jsperf.com/array-clear-methods/3
    }

    if(selectedColumnHeaderType.toUpperCase() == "INT")
    {
      dependantSheetArrayInModel.push({"label": "Sort Smallest to Largest", "data":"Sort Smallest to Largest"});
      dependantSheetArrayInModel.push({"label": "Sort Largest to Smallest", "data":"Sort Largest to Smallest"});
    }
    else if(selectedColumnHeaderType.toUpperCase() == "TEXT")
    {
      dependantSheetArrayInModel.push({"label": "Sort A to Z", "data":"Sort A to Z"});
      dependantSheetArrayInModel.push({"label": "Sort Z to A", "data":"Sort Z to A"});
    }
    else if(selectedColumnHeaderType.toUpperCase() == "DATE")
    {
      dependantSheetArrayInModel.push({"label": "Oldest to Newest", "data":"Oldest to Newest"});
      dependantSheetArrayInModel.push({"label": "Newest to Oldest", "data":"Newest to Oldest"});
    }
  }
}
module.exports = sortingTableColumns;
