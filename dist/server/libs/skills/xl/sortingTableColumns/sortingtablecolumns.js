var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ExcelBaseSkill = require("../common/xlSkill");

var columnHeaderObj = {}; // an object with key value pairs that contain the column name as keys and thier types as values
var columnTypeContextMenuMap = {
  "INT": "TABLE_NUM",
  "TEXT": "TABLE"
};
var tableRange = "";
var currSheetObj = {};

var sortingTableColumns = function (_ExcelBaseSkill) {
  _inherits(sortingTableColumns, _ExcelBaseSkill);

  function sortingTableColumns() {
    _classCallCheck(this, sortingTableColumns);

    return _possibleConstructorReturn(this, (sortingTableColumns.__proto__ || Object.getPrototypeOf(sortingTableColumns)).apply(this, arguments));
  }

  _createClass(sortingTableColumns, [{
    key: "getSheetDetails",
    value: function getSheetDetails(initDocJSON, dependantSheetArrayInModel, clonedDependantSheetArrayInModel) {
      while (dependantSheetArrayInModel.length > 0) {
        dependantSheetArrayInModel.pop(); //https://jsperf.com/array-clear-methods/3
      }

      if (initDocJSON === null) {
        //initDocJSON Removed
        dependantSheetArrayInModel.push(clonedDependantSheetArrayInModel[0]);
      } else {
        //initDocJSON Added

        //Add Sheet Names From Init Doc JSON
        for (var sheetNum = 0; sheetNum < initDocJSON.sheetCount; sheetNum++) {
          dependantSheetArrayInModel.push(JSON.parse(JSON.stringify(clonedDependantSheetArrayInModel[0])));
          dependantSheetArrayInModel[sheetNum].name = initDocJSON.sheets[sheetNum].name;
        }
      }
    }
  }, {
    key: "addSheetNamesToDropdown",
    value: function addSheetNamesToDropdown(initDocJSON, dependantSheetArrayInModel) {

      //Empty the existing array
      while (dependantSheetArrayInModel.length > 0) {
        dependantSheetArrayInModel.pop(); //https://jsperf.com/array-clear-methods/3
      }
      if (initDocJSON !== null) {
        //Add Sheet Names to Array From Init Doc JSON
        for (var sheetNum = 0; sheetNum < initDocJSON.sheetCount; sheetNum++) {
          var sheetName = initDocJSON.sheets[sheetNum].name;
          dependantSheetArrayInModel.push({ "label": sheetName, "data": sheetName });
        }
      }
    }
  }, {
    key: "updateSheetName",
    value: function updateSheetName(selectedSheetName, dependentSheetArrayInModel, clonedDependentSheetArrayInModel) {
      while (dependentSheetArrayInModel.length > 0) {
        dependentSheetArrayInModel.pop();
      }
      dependentSheetArrayInModel.push(JSON.parse(JSON.stringify(clonedDependentSheetArrayInModel[0])));
      if (selectedSheetName) {
        dependentSheetArrayInModel[0].name = selectedSheetName.label;
      }
    }
  }, {
    key: "updateColumnNamesInDropdown",
    value: function updateColumnNamesInDropdown(columnHeadersData, dependantSheetArrayInModel) {
      //Empty the existing array
      while (dependantSheetArrayInModel.length > 0) {
        dependantSheetArrayInModel.pop(); //https://jsperf.com/array-clear-methods/3
      }
      //Add column header names from Column Headers data json
      if (columnHeadersData != null) {
        for (var i = 0; i < columnHeadersData.length; i++) {
          var columnHeaderName = columnHeadersData[i].columnName;
          var columnHeaderDataType = columnHeadersData[i].columnType;
          if (columnHeaderName != "") dependantSheetArrayInModel.push({ "label": columnHeaderName, "data": columnHeaderDataType });
        }
      }
    }
  }, {
    key: "updateSortTypesInDropdown",
    value: function updateSortTypesInDropdown(selectedColumnHeader, dependantSheetArrayInModel) {
      if (selectedColumnHeader !== "" && selectedColumnHeader !== undefined) {
        var selectedColumnHeaderType = selectedColumnHeader.data;
        //Empty the existing array
        while (dependantSheetArrayInModel.length > 0) {
          dependantSheetArrayInModel.pop(); //https://jsperf.com/array-clear-methods/3
        }

        if (selectedColumnHeaderType.toUpperCase() == "INT") {
          dependantSheetArrayInModel.push({ "label": "Smallest to Largest", "data": "Smallest to Largest" });
          dependantSheetArrayInModel.push({ "label": "Largest to Smallest", "data": "Largest to Smallest" });
        } else if (selectedColumnHeaderType.toUpperCase() == "TEXT") {
          dependantSheetArrayInModel.push({ "label": "A to Z", "data": "A to Z" });
          dependantSheetArrayInModel.push({ "label": "Z to A", "data": "Z to A" });
        } else if (selectedColumnHeaderType.toUpperCase() == "DATE") {
          dependantSheetArrayInModel.push({ "label": "Oldest to Newest", "data": "Oldest to Newest" });
          dependantSheetArrayInModel.push({ "label": "Newest to Oldest", "data": "Newest to Oldest" });
        }
      }
    }
  }, {
    key: "getTableRangeArray",
    value: function getTableRangeArray(tableRange) {
      //expected input of type A3:K68
      var finalArray = [];
      tableRange = tableRange.toUpperCase();
      var valuearray = tableRange.split(":");
      valuearray[0].trim();
      valuearray[1].trim();

      var col1 = valuearray[0].toUpperCase().charAt(0);
      var col2 = valuearray[1].toUpperCase().charAt(0);
      var row1 = parseInt(valuearray[0].substring(1, valuearray[0].length));
      var row2 = parseInt(valuearray[1].substring(1, valuearray[1].length));

      if (col2.charCodeAt(0) - col1.charCodeAt(0) < 0) {
        var _ref = [col2, col1];
        // swapping

        col1 = _ref[0];
        col2 = _ref[1];
      }
      if (row2 - row1 < 0) {
        var _ref2 = [row2, row1];
        row1 = _ref2[0];
        row2 = _ref2[1];
      }

      for (var index = 0; index <= col2.charCodeAt(0) - col1.charCodeAt(0); ++index) {
        var currentCol = String.fromCharCode(col1.charCodeAt(0) + index);
        finalArray.push(currentCol + row1 + ":" + currentCol + row2);
      }
      return finalArray;
    }
  }, {
    key: "init",
    value: function init(data) {

      var initDocJSonPath = data.stepUIState.views["1"].documentData.path;
      var skilldata = { "initDocJSonPath": initDocJSonPath, "dbMgr": data.dbFilestoreMgr };
      var self = this;
      var initPromise = _get(sortingTableColumns.prototype.__proto__ || Object.getPrototypeOf(sortingTableColumns.prototype), "init", this).call(this, skilldata);
      var dbMgr = data.dbFilestoreMgr;

      var sheetAction = data.stepUIState.views['2'].sheetInAction.selectedOption.value.label;
      var sheetDataArr = data.stepUIState.views['1'].sheetsForTable.value;
      currSheetObj = this.getCurrentSheetObject(sheetAction, sheetDataArr);
      //reading the csv file 
      var readFileType = "csv";
      var colHdrFilePath = currSheetObj.columnHeaders["path"];
      var readFilePromise = dbMgr.readFileFromFileStore(colHdrFilePath, readFileType);
      return Promise.all([initPromise, readFilePromise]).then(function (resolveParamArr) {

        // });

        // super.init(skilldata).then(function (resolveParams) {
        var resolveParam = resolveParamArr[1];

        // making it toUpperCase as the data will be used later as well

        // created for multiple usage
        tableRange = currSheetObj["tableRange"].value.toUpperCase();
        // first one
        tableRange.trim();

        var tableRAngeArr = self.getTableRangeArray(tableRange);
        // let dbMgr = data.dbFilestoreMgr;
        // reading the csv file 
        // make the readFile call here and update the 2 variables that can be used in this skill
        // return dbMgr.readFileFromFileStore(colHdrFilePath, readFileType).then(function (resolveParam) {
        if (tableRAngeArr.length == resolveParam.fileData.length) {
          for (var index = 0; index < resolveParam.fileData.length; ++index) {
            var columnName = resolveParam.fileData[index].columnName;
            var columnType = resolveParam.fileData[index].columnType.toUpperCase();

            columnHeaderObj[columnName] = {};
            // if no type for the column is given
            if (columnType == "") {
              columnType = "TEXT";
            }
            columnHeaderObj[columnName]["type"] = columnType;
            // if (index < tableRAngeArr.length) {
            columnHeaderObj[columnName]["range"] = tableRAngeArr[index];
            // }
            // else {
            // }
          }
        } else {
          var error = new Error("number of columns in the csv and the Table range are inconsistent");
          return Promise.reject(error);
        }
        console.log("columnHeaderObj ", JSON.stringify(columnHeaderObj));
        return Promise.resolve(true);
        // read the resolveparam data here and update the new variables and create an object
      }, function (error) {
        return Promise.reject(error);
        // });
      });
    }

    // returns an array obtained from a file directly
    // using the function readFileFromFileStore (used in xlskill)
    // PIVOT_FILTER_BTNS

  }, {
    key: "getFilterData",
    value: function getFilterData(skillParams) {

      var taskParams = skillParams.taskParams;
      var paramValueObj = skillParams.paramsObj;
      var filterMenuJsonPath = currSheetObj["tableFilterMenuData"].path;
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

  }, {
    key: "getTableRange",
    value: function getTableRange(skillParams) {

      try {
        var taskParams = skillParams.taskParams;
        var paramValueObj = skillParams.paramsObj;

        var finalArray = [];
        var sheetObj = {};
        sheetObj["sheetNo"] = this.getSheetNumber(paramValueObj.sheetAction);
        var tableArr = [];
        var tableObj = {};
        tableObj["name"] = "Table1"; //table Name not present
        tableObj["range"] = tableRange;
        tableArr.push(tableObj);
        sheetObj["tables"] = tableArr;
        var resolveParams = { "attrValue": JSON.stringify(sheetObj) };
        return Promise.resolve(resolveParams);
      } catch (error) {
        return Promise.reject(error);
      }
    }
  }, {
    key: "getSelCellInRange",
    value: function getSelCellInRange(skillParams) {

      var resolveParams = { "attrValue": tableRange };
      return Promise.resolve(resolveParams);
    }
  }, {
    key: "getCurrentSheetObject",
    value: function getCurrentSheetObject(sheetAction, sheetDataArr) {

      var sheetObj = {};
      for (var idx = 0; idx < sheetDataArr.length; ++idx) {
        if (sheetAction == sheetDataArr[idx].name) {
          sheetObj = sheetDataArr[idx];
          break;
        }
      }
      return sheetObj;
    }
  }, {
    key: "getColumnHdrCell",
    value: function getColumnHdrCell(skillParams) {
      try {
        var paramValueObj = skillParams.paramsObj;
        var filterColumnName = paramValueObj.sortColName;
        var resolveParams = { "attrValue": columnHeaderObj[filterColumnName]["range"].split(":")[0] };
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

  }, {
    key: "getContextMenuData",
    value: function getContextMenuData(skillParams) {
      var taskParams = skillParams.taskParams;
      var paramValueObj = skillParams.paramsObj;

      // this is the outermost array for holding multiple sheets if present
      var contextMenuArr = [];
      // Object holding data for the single sheet
      var contextMenuSheetObj = {};
      // obtaining the dynamic sheet Number
      contextMenuSheetObj["sheetNo"] = this.getSheetNumber(paramValueObj.sheetAction);

      // empty array of objects that will hold the context menu for differenct ranges
      contextMenuSheetObj["data"] = [];

      /* ********************
       PrimaryObject -> All the Objects that are pushed in the contextMenuSheetObj["data"]
       SecondaryObjects -> All the Objects that are Pushed into the "desc" array of the Primary Objects
        *********************** */

      // copmulsory Object that will assign all the column Headers as the context menu notation of type TABLE
      var columnHdrPrimaryObj = {};
      columnHdrPrimaryObj["type"] = "TABLE";
      // currently Setting the default Tag as the name of the first column
      columnHdrPrimaryObj["defaultTag"] = Object.keys(columnHeaderObj)[0];
      // Description Array of the Primary Object that will contain the secondary objects
      columnHdrPrimaryObj["desc"] = [];

      columnHdrPrimaryObj["range"] = this.getColumnHeaderRange(tableRange);
      // Creating an array that will contain the dynamically created Primary Objects
      var columnDataObjectArr = [];

      // Looping through the ColumnHeaders that will generate the mandatory as well as Dynamic primary objects
      for (var columnName in columnHeaderObj) {

        // create a column Header secondary object here 
        var colHdrSecondaryObj = {};
        colHdrSecondaryObj["cell"] = columnHeaderObj[columnName]["range"].split(":")[0];
        colHdrSecondaryObj["tag"] = columnName;
        // adding the column headers into the first mandatory object
        columnHdrPrimaryObj["desc"].push(colHdrSecondaryObj);

        // create a column data secondary object here 
        var colDataSecondaryObj = {
          "cell": this.getColDataRange(columnHeaderObj[columnName]["range"]),
          "tag": columnName
        };

        // if no Dynamic Object as been created and pushed for the Column Data
        if (columnDataObjectArr.length == 0) {
          // Table column Data Primary Object
          var colPrimaryObj = {};
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
          var recentPrimaryObj = columnDataObjectArr[columnDataObjectArr.length - 1];
          if (recentPrimaryObj["type"] == columnTypeContextMenuMap[columnHeaderObj[columnName]["type"]]) {

            // push the secondary object into the Primary object
            recentPrimaryObj["desc"].push(colDataSecondaryObj);
            // merging the ranges
            recentPrimaryObj["range"] = this.getMergedRange(recentPrimaryObj["range"], colDataSecondaryObj["cell"]);
          } else {
            // The current column header was different than that of the one before it
            // create a new primary object and push it into the columnDataObjectArr
            var _colPrimaryObj = {};
            _colPrimaryObj["type"] = columnTypeContextMenuMap[columnHeaderObj[columnName]["type"]];
            _colPrimaryObj["range"] = columnHeaderObj[columnName]["range"];
            _colPrimaryObj["defaultTag"] = columnHeaderObj[columnName];
            _colPrimaryObj["desc"] = [];
            _colPrimaryObj["desc"].push(colDataSecondaryObj);
            columnDataObjectArr.push(_colPrimaryObj);
          }
        }
      } // End of loop

      // push the Mandatory object into the contextMenuSheetObj
      contextMenuSheetObj["data"].push(columnHdrPrimaryObj);
      // Push the dynamically created array for the Column data Objects which contains the Dynamically created Primary objects
      for (var index = 0; index < columnDataObjectArr.length; ++index) {
        // add the columndataObject to the final sheet array
        contextMenuSheetObj["data"].push(columnDataObjectArr[index]);
      }
      // Push the current sheet object into the Context menu final array
      contextMenuArr.push(contextMenuSheetObj);
      // the above code should iterate through the multiple sheets 
      var resolvParams = { "attrValue": JSON.stringify(contextMenuArr) };
      return Promise.resolve(resolvParams);
    }
  }, {
    key: "getColumnHeaderRange",
    value: function getColumnHeaderRange(tableRange) {
      var columnHeaderArray = this.getColumnHeaderArray(tableRange);
      return columnHeaderArray[0] + ":" + columnHeaderArray[columnHeaderArray.length - 1];
    }
  }, {
    key: "getColDataRange",
    value: function getColDataRange(range) {
      // range = "A3:A68"
      var rangeArr = range.split(":");
      var colHdr = range.split(":")[0];
      var colRange = range.split(":")[1];

      var colName = colHdr.toUpperCase().charAt(0);
      var rowNum = parseInt(colHdr.substring(1, colHdr.length));
      colHdr = colName + ++rowNum;
      var colDataRange = colHdr + ":" + colRange;
      return colDataRange;
    }
  }, {
    key: "getMergedRange",
    value: function getMergedRange(startRange, endRange) {
      // range1 = "A4:A68"
      // range2 = "B4:B68"
      var colDataStart = startRange.split(":")[0];
      var endPoint = endRange.split(":")[endRange.split(":").length - 1];
      return colDataStart + ":" + endPoint;
    }

    // SELECTED_CELLS_COMPLETE_IN_RANGE
    // expects a text value of the range
    // "C4:C68"
    // to be attained from the model
    // this will require only the name of the column

  }, {
    key: "getSelectedColRange",
    value: function getSelectedColRange(skillParams) {
      try {
        var taskParams = skillParams.taskParams;
        var paramValueObj = skillParams.paramsObj;
        var columnName = paramValueObj.sortColName;
        var resolveParam = { "attrValue": columnHeaderObj[columnName]["range"] };
        // let resolveParam = { "attrValue ":"abc" }
        return Promise.resolve(resolveParam);
      } catch (error) {
        return Promise.reject(error);
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

  }, {
    key: "getFilterMenuCell",
    value: function getFilterMenuCell(skillParams) {
      try {
        var taskParams = skillParams.taskParams;
        var paramValueObj = skillParams.paramsObj;
        // tableRange is a common variable available for all
        var finalArr = this.getColumnHeaderArray(tableRange);
        return Promise.resolve({ "attrValue": finalArr });
      } catch (error) {
        return Promise.reject(error);
      }
    }
  }, {
    key: "getColumnHeaderArray",
    value: function getColumnHeaderArray(tableRange) {
      var finalArr = [];
      tableRange = tableRange.toUpperCase();
      var valuearray = tableRange.split(":");
      valuearray[0].trim();
      valuearray[1].trim();

      var col1 = valuearray[0].toUpperCase().charAt(0);
      var col2 = valuearray[1].toUpperCase().charAt(0);
      var row1 = parseInt(valuearray[0].substring(1, valuearray[0].length));
      var row2 = parseInt(valuearray[1].substring(1, valuearray[0].length));

      for (var index = 0; index <= col2.charCodeAt(0) - col1.charCodeAt(0); ++index) {
        finalArr.push(String.fromCharCode(col1.charCodeAt(0) + index) + row1);
      }
      return finalArr;
    }

    // SORTBY_ITEMS_LIST
    // to return a ~ separated value 
    // Trans_No~Sales_First~Sales_Last~Date~Department~Furniture~Pay_Type~Trans_Type~Amount~Down_Pay~Owed
    // from the stepUiState
    // currently dependent on table properties

  }, {
    key: "getSortedItemList",
    value: function getSortedItemList(skillParams) {
      var attrValue = "";
      var finalColumn = Object.keys(columnHeaderObj)[Object.keys(columnHeaderObj).length - 1];
      for (var columnName in columnHeaderObj) {
        if (finalColumn != columnName) {
          attrValue += columnName + "~";
        } else {
          attrValue += columnName;
        }
      }
      var resolveParams = { "attrValue": attrValue };
      return Promise.resolve(resolveParams);
    }

    // ITEM_ORDER_TYPE
    // "INT~TEXT~TEXT~INT~TEXT~TEXT~TEXT~INT~INT~INT"
    // source of the value is unknown

  }, {
    key: "getItemOrderType",
    value: function getItemOrderType(skillParams) {
      var attrValue = "";
      // let finalColumn = Object.keys(columnHeaderObj)[Object.keys(columnHeaderObj).length - 1];
      var totalColumn = Object.keys(columnHeaderObj).length;
      var currentColNum = 1;
      for (var columnName in columnHeaderObj) {
        if (currentColNum++ < totalColumn) {
          attrValue += columnHeaderObj[columnName]["type"] + "~";
        } else {
          attrValue += columnHeaderObj[columnName]["type"];
        }
      }
      var resolveParams = { "attrValue": attrValue };
      return Promise.resolve(resolveParams);
    }

    // SORTBY_VALUE
    // input value of the type
    // Sales_Last~

  }, {
    key: "getSortByValue",
    value: function getSortByValue(skillParams) {

      var taskParams = skillParams.taskParams;
      var paramValueObj = skillParams.paramsObj;

      var finalObj = { "attrValue": paramValueObj.sortColName + "~" };
      return Promise.resolve(finalObj);
    }

    // ORDERBY_VALUE
    // input value of the type 
    // A to Z~

  }, {
    key: "getOrderByValue",
    value: function getOrderByValue(skillParams) {

      var taskParams = skillParams.taskParams;
      var paramValueObj = skillParams.paramsObj;

      var finalObj = { "attrValue": paramValueObj.sortType + "~" };
      return Promise.resolve(finalObj);
    }
  }]);

  return sortingTableColumns;
}(ExcelBaseSkill);

module.exports = sortingTableColumns;