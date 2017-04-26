const ExcelBaseSkill = require("../common/xlSkill");

var columnHeaderObj = {}// an object with key value pairs that contain the column name as keys and thier types as values
class sortingTableColumns extends ExcelBaseSkill {
  getSheetDetails(initDocJSON, dependantSheetArrayInModel, clonedDependantSheetArrayInModel) {
    while (dependantSheetArrayInModel.length > 0) {
      dependantSheetArrayInModel.pop(); //https://jsperf.com/array-clear-methods/3
    }

    if (initDocJSON === null) { //initDocJSON Removed
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
    if (initDocJSON !== null) {
      //Add Sheet Names to Array From Init Doc JSON
      for (let sheetNum = 0; sheetNum < initDocJSON.sheetCount; sheetNum++) {
        var sheetName = initDocJSON.sheets[sheetNum].name;
        dependantSheetArrayInModel.push({"label":sheetName,"data":sheetName});
      }
    }
  }

  updateSheetName(selectedSheetName, dependentSheetArrayInModel, clonedDependentSheetArrayInModel) {
    while(dependentSheetArrayInModel.length > 0){
      dependentSheetArrayInModel.pop();
    }
    dependentSheetArrayInModel.push(JSON.parse(JSON.stringify(clonedDependentSheetArrayInModel[0])));
    if(selectedSheetName){
      dependentSheetArrayInModel[0].name = selectedSheetName.label;  
    }
  }

  updateColumnNamesInDropdown(columnHeadersData, dependantSheetArrayInModel){
    //Empty the existing array
    while(dependantSheetArrayInModel.length > 0) {
      dependantSheetArrayInModel.pop(); //https://jsperf.com/array-clear-methods/3
    }
    //Add column header names from Column Headers csv file
    if(columnHeadersData !== null)
    {
      var columnHeaders = columnHeadersData.split(/\r\n|\n/);
      for (var i=1; i<columnHeaders.length; i++) {
          var columnHeaderName = columnHeaders[i].split(',')[0];
          var columnHeaderDataType = columnHeaders[i].split(',')[1];
          if(columnHeaderName != "")
            dependantSheetArrayInModel.push({"label":columnHeaderName,"data":columnHeaderDataType});
      }
    }
  }
  updateSortTypesInDropdown(selectedColumnHeader, dependantSheetArrayInModel){
    if(selectedColumnHeader !== "" && selectedColumnHeader !== undefined)
    {
      var selectedColumnHeaderType = selectedColumnHeader.data;
      //Empty the existing array
      while(dependantSheetArrayInModel.length > 0) {
        dependantSheetArrayInModel.pop(); //https://jsperf.com/array-clear-methods/3
      }

      if(selectedColumnHeaderType.toUpperCase() == "INT")
      {
        dependantSheetArrayInModel.push({"label": "Smallest to Largest", "data":"Smallest to Largest"});
        dependantSheetArrayInModel.push({"label": "Largest to Smallest", "data":"Largest to Smallest"});
      }
      else if(selectedColumnHeaderType.toUpperCase() == "TEXT")
      {
        dependantSheetArrayInModel.push({"label": "A to Z", "data":"A to Z"});
        dependantSheetArrayInModel.push({"label": "Z to A", "data":"Z to A"});
      }
      else if(selectedColumnHeaderType.toUpperCase() == "DATE")
      {
        dependantSheetArrayInModel.push({"label": "Oldest to Newest", "data":"Oldest to Newest"});
        dependantSheetArrayInModel.push({"label": "Newest to Oldest", "data":"Newest to Oldest"});
      }
    }    
  }

  getTableRangeArray(tableRange) {
    //expected input of type A3:K68
    let finalArray = [];
    tableRange = tableRange.toUpperCase();
    let valuearray = tableRange.split(":");
    valuearray[0].trim();
    valuearray[1].trim();

    let col1 = valuearray[0].toUpperCase().charAt(0);
    let col2 = valuearray[1].toUpperCase().charAt(0);
    let row1 = parseInt(valuearray[0].substring(1, valuearray[0].length));
    let row2 = parseInt(valuearray[1].substring(1, valuearray[1].length));

    if (col2.charCodeAt(0) - col1.charCodeAt(0) < 0) {
      // swapping
      [col1, col2] = [col2, col1]
    }
    if (row2 - row1 < 0) {
      [row1, row2] = [row2, row1]
    }

    for (let index = 0; index <= col2.charCodeAt(0) - col1.charCodeAt(0); ++index) {
      let currentCol = (String.fromCharCode(col1.charCodeAt(0) + index));
      finalArray.push(currentCol + row1 + ":" + currentCol + row2);
    }
    return finalArray;

  }

  init(data) {


    var initDocJSonPath = data.stepUIState.views["1"].documentData.path;
    var skilldata = { "initDocJSonPath": initDocJSonPath, "dbMgr": data.dbFilestoreMgr };
    let self = this;
    let initPromise = super.init(skilldata);
    let dbMgr = data.dbFilestoreMgr;
    //reading the csv file 
    let readFileType = "csv";
    let colHdrFilePath = data.stepUIState.views['1'].sheetsForTable.value[0].columnHeaders["path"];// abc is the model reference for the  csv file path
    let readFilePromise = dbMgr.readFileFromFileStore(colHdrFilePath, readFileType);
    return Promise.all([initPromise, readFilePromise]).then(function (resolveParamArr) {

      // });

      // super.init(skilldata).then(function (resolveParams) {
      let resolveParam = resolveParamArr[1];

      // let colHdrFilePath = data.stepUIState.views['1'].sheetsForTable.value[0].columnHeaders["path"];// abc is the model reference for the  csv file path
      let tableRange = (eval("data.stepUIState." + "views['1'].sheetsForTable.value[0].tableRange.value"));

      let tableRAngeArr = self.getTableRangeArray(tableRange);
      // let dbMgr = data.dbFilestoreMgr;
      //reading the csv file 
      // let readFileType = "csv";
      // make the readFile call here and update the 2 variables that can be used in this skill
      // return dbMgr.readFileFromFileStore(colHdrFilePath, readFileType).then(function (resolveParam) {
      for (let index = 0; index < resolveParam.fileData.length; ++index) {
        let columnName = resolveParam.fileData[index].columnName
        let columnType = resolveParam.fileData[index].columnType

        columnHeaderObj[columnName] = {};
        if (columnType == "") {
          columnType = "TEXT"
        }
        columnHeaderObj[columnName]["type"] = columnType;
        if (index < tableRAngeArr.length) {
          columnHeaderObj[columnName]["range"] = tableRAngeArr[index];
        }
        else {
          break;
          let error = new Error("table range and number of columns do not match")
          return Promise.reject(error);
        }
      }
      console.log("columnHeaderObj ", JSON.stringify(columnHeaderObj));
      return Promise.resolve(true);
      // read the resolveparam data here and update the new variables and create an object

      // var initDocJSonPath = data.stepUIState.views["1"].documentData.path;
      // var skilldata = { "initDocJSonPath": initDocJSonPath, "dbMgr": data.dbFilestoreMgr };
      // super.init(skilldata);

    }, function (error) {
      return Promise.reject(error);
      // });
    }
      // , function (error) {
      //   return Promise.reject(error);
      // }
    );
  }


  // returns an array obtained from a file directly
  // using the function readFileFromFileStore (used in xlskill)
  // PIVOT_FILTER_BTNS
  getFilterData(skillParams) {

    var taskParams = skillParams.taskParams;
    var paramValueObj = skillParams.paramsObj;

    return taskParams.dbFilestoreMgr.readFileFromFileStore(paramValueObj.filterMenuJson).then(function (resolveParam) {

      var finalValue = JSON.parse(resolveParam.fileData);
      var resolveParams = { "attrValue": JSON.stringify(finalValue) };
      return Promise.resolve(resolveParams);
    }, function (error) {
      return Promise.reject(error);
    });

  }

  // TABLE_RANGE
  // expects an array of object of type below
  // [ { "sheetNo": "1", "tables":[ { "name": "Table1", "range": "A3:K68" } ] } ]
  // requires the sheet number (init Doc json)
  // requires table name (not known currently)
  // requires a range (attained from model)
  getTableRange(skillParams) {

    try {
      var taskParams = skillParams.taskParams;
      var paramValueObj = skillParams.paramsObj;

      let finalArray = []
      let sheetObj = {};
      sheetObj["sheetNo"] = this.getSheetNumber(paramValueObj.sheetAction);
      let tableArr = [];
      let tableObj = {};
      tableObj["name"] = "Table1"; //table Name not present
      tableObj["range"] = paramValueObj["tableRange"];
      tableArr.push(tableObj);
      sheetObj["tables"] = tableArr;
      let resolveParams = { "attrValue": JSON.stringify(sheetObj) }
      return Promise.resolve(resolveParams);
    } catch (error) {
      return Promise.reject(error)

    }
  }


  // CUSTOM_CONTEXT_MENU
  // this is a deducable value from 3 differenct areas
  // Table Range (known)
  // Column Header Names (not known)
  // Column Types (not known)
  // expects an array of objects

  // currently getting the different file , and putting the data according to that
  getContextMenuData(skillParams) {
    var taskParams = skillParams.taskParams;
    var paramValueObj = skillParams.paramsObj;


    return taskParams.dbFilestoreMgr.readFileFromFileStore(paramValueObj.contextMenuPath).then(function (resolveParam) {
      let attrValue = JSON.stringify(resolveParam.fileData);
      return Promise.resolve({ "attrValue": attrValue });
    }, function () {
      return Promise.reject(error);
    })

  }

  // SELECTED_CELLS_COMPLETE_IN_RANGE
  // expects a text value of the range
  // "C4:C68"
  // to be attained from the model
  // this will require only the name of the column
  getSelectedColRange(skillParams) {
    try {
      var taskParams = skillParams.taskParams;
      var paramValueObj = skillParams.paramsObj;
      let columnName = paramValueObj.sortColName;
      let resolveParam = { "attrValue": columnHeaderObj[columnName]["range"] }
      // let resolveParam = { "attrValue ":"abc" }
      return Promise.resolve(resolveParam);
    } catch (error) {
      return Promise.reject(error)
    }
  }



  // getSelectedColRange(skillParams) {
  //   try {
  //     var taskParams = skillParams.taskParams;
  //     var paramValueObj = skillParams.paramsObj;
  //     let columnName = paramValueObj.sortColName;
  //     let resolveParam = { "attrValue ": columnHeaderObj[columnName]["range"] }
  //     // let resolveParam = { "attrValue ":"abc" }
  //     return Promise.resolve(resolveParam);
  //   }
  //   catch (error) {
  //     return Promise.reject(error);
  //   }
  // }

  // CELL_BEHIND_FILTER_MENU
  // an array of strings to be created which contains the values from A3 to K3 
  // get the range of the table SelectedCells_TableRange
  // can be deduced from above data 

  getFilterMenuCell(skillParams) {
    try {
      var taskParams = skillParams.taskParams;
      var paramValueObj = skillParams.paramsObj;
      let tableRange = paramValueObj.tableRange;
      let finalArr = [];

      //move this into a function
      tableRange = tableRange.toUpperCase();
      let valuearray = tableRange.split(":");
      valuearray[0].trim();
      valuearray[1].trim();

      let col1 = valuearray[0].toUpperCase().charAt(0);
      let col2 = valuearray[1].toUpperCase().charAt(0);
      let row1 = parseInt(valuearray[0].substring(1, valuearray[0].length));
      let row2 = parseInt(valuearray[1].substring(1, valuearray[0].length));

      for (let index = 0; index < col2.charCodeAt(0) - col1.charCodeAt(0); ++index) {
        finalArr.push((String.fromCharCode(col1.charCodeAt(0) + index)) + row1);
      }

      return Promise.resolve({ "attrValue": finalArr });
    } catch (error) {
      return Promise.reject(error);
    }

  }

  // SORTBY_ITEMS_LIST
  // to return a ~ separated value 
  // Trans_No~Sales_First~Sales_Last~Date~Department~Furniture~Pay_Type~Trans_Type~Amount~Down_Pay~Owed
  // from the stepUiState
  // currently dependent on table properties
  getSortedItemList(skillParams) {
    let attrValue = "";
    let finalColumn = Object.keys(columnHeaderObj)[Object.keys(columnHeaderObj).length - 1];
    for (let columnName in columnHeaderObj) {
      if (finalColumn != columnName) {
        attrValue += columnName + "~";
      }
      else {
        attrValue += columnName;
      }
    }
    let resolveParams = { "attrValue": attrValue };
    return Promise.resolve(resolveParams);

  }

  // ITEM_ORDER_TYPE
  // "INT~TEXT~TEXT~INT~TEXT~TEXT~TEXT~INT~INT~INT"
  // source of the value is unknown
  getItemOrderType(skillParams) {
    let attrValue = "";
    // let finalColumn = Object.keys(columnHeaderObj)[Object.keys(columnHeaderObj).length - 1];
    let totalColumn = Object.keys(columnHeaderObj).length;
    let currentColNum = 1;
    for (let columnName in columnHeaderObj) {
      if (currentColNum++ < totalColumn) {
        attrValue += columnHeaderObj[columnName]["type"] + "~";
      }
      else {
        attrValue += columnHeaderObj[columnName]["type"];
      }
    }
    let resolveParams = { "attrValue": attrValue };
    return Promise.resolve(resolveParams);
  }

  // SORTBY_VALUE
  // input value of the type
  // Sales_Last~
  getSortByValue(skillParams) {

    var taskParams = skillParams.taskParams;
    var paramValueObj = skillParams.paramsObj;

    let finalObj = { "attrValue": paramValueObj.sortColName + "~" };
    return Promise.resolve(finalObj);

  }

  // ORDERBY_VALUE
  // input value of the type 
  // A to Z~
  getOrderByValue(skillParams) {

    var taskParams = skillParams.taskParams;
    var paramValueObj = skillParams.paramsObj;

    let finalObj = { "attrValue": paramValueObj.sortType + "~" };
    return Promise.resolve(finalObj);
  } 


}
module.exports = sortingTableColumns;
