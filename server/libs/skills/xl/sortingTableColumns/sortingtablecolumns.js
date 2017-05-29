const ExcelBaseSkill = require("../common/xlSkill");

var columnHeaderObj = {}// an object with key value pairs that contain the column name as keys and thier types as values
const columnTypeContextMenuMap = {
  "INT": "TABLE_NUM",
  "TEXT": "TABLE"
}
let tableRange = "";
let currSheetObj = {};

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

  updateColumnNamesInDropdown(columnHeadersData, dependantSheetArrayInModel) {
    //Empty the existing array
    while (dependantSheetArrayInModel.length > 0) {
      dependantSheetArrayInModel.pop(); //https://jsperf.com/array-clear-methods/3
    }
    //Add column header names from Column Headers data json
    if(columnHeadersData != null)
    {
      for(var i = 0; i < columnHeadersData.length; i++)
      {
        var columnHeaderName = columnHeadersData[i].columnName;
        var columnHeaderDataType = columnHeadersData[i].columnType;
        if (columnHeaderName != "")
          dependantSheetArrayInModel.push({ "label": columnHeaderName, "data": columnHeaderDataType });
      }
    }
  }
  
  updateSortTypesInDropdown(selectedColumnHeader, dependantSheetArrayInModel) {
    if (selectedColumnHeader !== "" && selectedColumnHeader !== undefined) {
      var selectedColumnHeaderType = selectedColumnHeader.data;
      //Empty the existing array
      while (dependantSheetArrayInModel.length > 0) {
        dependantSheetArrayInModel.pop(); //https://jsperf.com/array-clear-methods/3
      }

      if (selectedColumnHeaderType.toUpperCase() == "INT") {
        dependantSheetArrayInModel.push({ "label": "Smallest to Largest", "data": "Smallest to Largest" });
        dependantSheetArrayInModel.push({ "label": "Largest to Smallest", "data": "Largest to Smallest" });
      }
      else if (selectedColumnHeaderType.toUpperCase() == "TEXT") {
        dependantSheetArrayInModel.push({ "label": "A to Z", "data": "A to Z" });
        dependantSheetArrayInModel.push({ "label": "Z to A", "data": "Z to A" });
      }
      else if (selectedColumnHeaderType.toUpperCase() == "DATE") {
        dependantSheetArrayInModel.push({ "label": "Oldest to Newest", "data": "Oldest to Newest" });
        dependantSheetArrayInModel.push({ "label": "Newest to Oldest", "data": "Newest to Oldest" });
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
    
    let sheetAction = data.stepUIState.views['2'].sheetInAction.selectedOption.value.label;
    let sheetDataArr = data.stepUIState.views['1'].sheetsForTable.value;
    currSheetObj = this.getCurrentSheetObject(sheetAction,sheetDataArr);
    //reading the csv file 
    let readFileType = "csv";
    let colHdrFilePath = currSheetObj.columnHeaders["path"];
    let readFilePromise = dbMgr.readFileFromFileStore(colHdrFilePath, readFileType);
    return Promise.all([initPromise, readFilePromise]).then(function (resolveParamArr) {

      // });

      // super.init(skilldata).then(function (resolveParams) {
      let resolveParam = resolveParamArr[1];

      // making it toUpperCase as the data will be used later as well
      
      // created for multiple usage
      tableRange = (currSheetObj["tableRange"].value).toUpperCase();
      // first one
      tableRange.trim();

      let tableRAngeArr = self.getTableRangeArray(tableRange);
      // let dbMgr = data.dbFilestoreMgr;
      // reading the csv file 
      // make the readFile call here and update the 2 variables that can be used in this skill
      // return dbMgr.readFileFromFileStore(colHdrFilePath, readFileType).then(function (resolveParam) {
      if (tableRAngeArr.length == resolveParam.fileData.length) {
        for (let index = 0; index < resolveParam.fileData.length; ++index) {
          let columnName = resolveParam.fileData[index].columnName
          let columnType = resolveParam.fileData[index].columnType.toUpperCase();

          columnHeaderObj[columnName] = {};
          // if no type for the column is given
          if (columnType == "") {
            columnType = "TEXT"
          }
          columnHeaderObj[columnName]["type"] = columnType;
          // if (index < tableRAngeArr.length) {
          columnHeaderObj[columnName]["range"] = tableRAngeArr[index];
          // }
          // else {
          // }
        }

      }
      else {
        let error = new Error("number of columns in the csv and the Table range are inconsistent");
        return Promise.reject(error);
      }
      console.log("columnHeaderObj ", JSON.stringify(columnHeaderObj));
      return Promise.resolve(true);
      // read the resolveparam data here and update the new variables and create an object

    }, function (error) {
      return Promise.reject(error);
      // });
    }
    );
  }


  // returns an array obtained from a file directly
  // using the function readFileFromFileStore (used in xlskill)
  // PIVOT_FILTER_BTNS
  getFilterData(skillParams) {

    var taskParams = skillParams.taskParams;
    var paramValueObj = skillParams.paramsObj;
    let filterMenuJsonPath = currSheetObj["tableFilterMenuData"].path;
    return taskParams.dbFilestoreMgr.readFileFromFileStore(filterMenuJsonPath).then(function (resolveParam) {

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
      tableObj["range"] = tableRange;
      tableArr.push(tableObj);
      sheetObj["tables"] = tableArr;
      let resolveParams = { "attrValue": JSON.stringify(sheetObj) }
      return Promise.resolve(resolveParams);
    } catch (error) {
      return Promise.reject(error);

    }
  }


  getSelCellInRange(skillParams){

    let resolveParams = {"attrValue":tableRange};
    return Promise.resolve(resolveParams);
  }

  getCurrentSheetObject(sheetAction,sheetDataArr){
          
      let sheetObj = {};
      for(let idx = 0 ;idx < sheetDataArr.length; ++idx){
        if(sheetAction == sheetDataArr[idx].name){
          sheetObj = sheetDataArr[idx];
          break;
        }
      }
      return sheetObj;
  }


  getColumnHdrCell(skillParams) {
    try {
      let paramValueObj = skillParams.paramsObj;
      let filterColumnName = paramValueObj.sortColName;
      let resolveParams = { "attrValue": columnHeaderObj[filterColumnName]["range"].split(":")[0] };
      return Promise.resolve(resolveParams);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  // CUSTOM_CONTEXT_MENU
  // this is a deducable value from 3 differenct areas
  // Table Range (known)
  // Column Header Names (not known)
  // Column Types (not known)
  // expects an array of objects

  // currently getting the different file , and putting the data according to that
  // getContextMenuData(skillParams) {
  //   var taskParams = skillParams.taskParams;
  //   var paramValueObj = skillParams.paramsObj;


  //   return taskParams.dbFilestoreMgr.readFileFromFileStore(paramValueObj.contextMenuPath).then(function (resolveParam) {
  //     let attrValue = JSON.stringify(resolveParam.fileData);
  //     return Promise.resolve({ "attrValue": attrValue });
  //   }, function () {
  //     return Promise.reject(error);
  //   })

  // }


  //deducing the context menu data 
  getContextMenuData(skillParams) {
    var taskParams = skillParams.taskParams;
    var paramValueObj = skillParams.paramsObj;


    // this is the outermost array for holding multiple sheets if present
    let contextMenuArr = [];
    // Object holding data for the single sheet
    let contextMenuSheetObj = {};
    // obtaining the dynamic sheet Number
    contextMenuSheetObj["sheetNo"] = this.getSheetNumber(paramValueObj.sheetAction);

    // empty array of objects that will hold the context menu for differenct ranges
    contextMenuSheetObj["data"] = [];

    /* ********************
     PrimaryObject -> All the Objects that are pushed in the contextMenuSheetObj["data"]
     SecondaryObjects -> All the Objects that are Pushed into the "desc" array of the Primary Objects
      *********************** */

    // copmulsory Object that will assign all the column Headers as the context menu notation of type TABLE
    let columnHdrPrimaryObj = {};
    columnHdrPrimaryObj["type"] = "TABLE";
    // currently Setting the default Tag as the name of the first column
    columnHdrPrimaryObj["defaultTag"] = Object.keys(columnHeaderObj)[0];
    // Description Array of the Primary Object that will contain the secondary objects
    columnHdrPrimaryObj["desc"] = [];

    columnHdrPrimaryObj["range"] = this.getColumnHeaderRange(tableRange);
    // Creating an array that will contain the dynamically created Primary Objects
    let columnDataObjectArr = []


    // Looping through the ColumnHeaders that will generate the mandatory as well as Dynamic primary objects
    for (let columnName in columnHeaderObj) {

      // create a column Header secondary object here 
      let colHdrSecondaryObj = {};
      colHdrSecondaryObj["cell"] = columnHeaderObj[columnName]["range"].split(":")[0];
      colHdrSecondaryObj["tag"] = columnName;
      // adding the column headers into the first mandatory object
      columnHdrPrimaryObj["desc"].push(colHdrSecondaryObj);


      // create a column data secondary object here 
      let colDataSecondaryObj = {
        "cell": this.getColDataRange(columnHeaderObj[columnName]["range"]),
        "tag": columnName
      };


      // if no Dynamic Object as been created and pushed for the Column Data
      if (columnDataObjectArr.length == 0) {
        // Table column Data Primary Object
        let colPrimaryObj = {};
        colPrimaryObj["type"] = columnTypeContextMenuMap[columnHeaderObj[columnName]["type"]];
        colPrimaryObj["range"] = this.getColDataRange(columnHeaderObj[columnName]["range"]);
        colPrimaryObj["defaultTag"] = columnHeaderObj[columnName];
        colPrimaryObj["desc"] = [];
        // Push Secondary Object into Primary Object
        colPrimaryObj["desc"].push(colDataSecondaryObj);
        // Push Primary Object into Array
        columnDataObjectArr.push(colPrimaryObj);
      } else {
        /* The next Column Header is of the same type as the previous one in the Column data object,
         then push this column header Secondary object into the last PRimary Object and merge ranges */
        let recentPrimaryObj = columnDataObjectArr[columnDataObjectArr.length - 1];
        if (recentPrimaryObj["type"] == columnTypeContextMenuMap[columnHeaderObj[columnName]["type"]]) {

          // push the secondary object into the Primary object
          recentPrimaryObj["desc"].push(colDataSecondaryObj);
          // merging the ranges
          recentPrimaryObj["range"] = this.getMergedRange(recentPrimaryObj["range"], colDataSecondaryObj["cell"]);
        }
        else {
          // The current column header was different than that of the one before it
          // create a new primary object and push it into the columnDataObjectArr
          let colPrimaryObj = {};
          colPrimaryObj["type"] = columnTypeContextMenuMap[columnHeaderObj[columnName]["type"]];
          colPrimaryObj["range"] = columnHeaderObj[columnName]["range"];
          colPrimaryObj["defaultTag"] = columnHeaderObj[columnName];
          colPrimaryObj["desc"] = [];
          colPrimaryObj["desc"].push(colDataSecondaryObj);
          columnDataObjectArr.push(colPrimaryObj);
        }

      }
    } // End of loop

    // push the Mandatory object into the contextMenuSheetObj
    contextMenuSheetObj["data"].push(columnHdrPrimaryObj);
    // Push the dynamically created array for the Column data Objects which contains the Dynamically created Primary objects
    for (let index = 0; index < columnDataObjectArr.length; ++index) {
      // add the columndataObject to the final sheet array
      contextMenuSheetObj["data"].push(columnDataObjectArr[index]);
    }
    // Push the current sheet object into the Context menu final array
    contextMenuArr.push(contextMenuSheetObj);
    // the above code should iterate through the multiple sheets 
    let resolvParams = { "attrValue": JSON.stringify(contextMenuArr) };
    return Promise.resolve(resolvParams);
  }
  getColumnHeaderRange(tableRange) {
    let columnHeaderArray = this.getColumnHeaderArray(tableRange);
    return (columnHeaderArray[0] + ":" + columnHeaderArray[columnHeaderArray.length - 1])
  }

  getColDataRange(range) {
    // range = "A3:A68"
    let rangeArr = range.split(":");
    let colHdr = range.split(":")[0];
    let colRange = range.split(":")[1];

    let colName = colHdr.toUpperCase().charAt(0);
    let rowNum = parseInt(colHdr.substring(1, colHdr.length));
    colHdr = colName + (++rowNum);
    let colDataRange = colHdr + ":" + colRange;
    return colDataRange;
  }

  getMergedRange(startRange, endRange) {
    // range1 = "A4:A68"
    // range2 = "B4:B68"
    let colDataStart = startRange.split(":")[0];
    let endPoint = endRange.split(":")[endRange.split(":").length - 1];
    return colDataStart + ":" + endPoint;
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
      // tableRange is a common variable available for all
      let finalArr = this.getColumnHeaderArray(tableRange);
      return Promise.resolve({ "attrValue": finalArr });
    } catch (error) {
      return Promise.reject(error);
    }

  }

  getColumnHeaderArray(tableRange) {
    let finalArr = [];
    tableRange = tableRange.toUpperCase();
    let valuearray = tableRange.split(":");
    valuearray[0].trim();
    valuearray[1].trim();

    let col1 = valuearray[0].toUpperCase().charAt(0);
    let col2 = valuearray[1].toUpperCase().charAt(0);
    let row1 = parseInt(valuearray[0].substring(1, valuearray[0].length));
    let row2 = parseInt(valuearray[1].substring(1, valuearray[0].length));

    for (let index = 0; index <= col2.charCodeAt(0) - col1.charCodeAt(0); ++index) {
      finalArr.push((String.fromCharCode(col1.charCodeAt(0) + index)) + row1);
    }
    return finalArr;

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
