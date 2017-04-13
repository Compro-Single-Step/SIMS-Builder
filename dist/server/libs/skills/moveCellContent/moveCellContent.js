"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// this file contains all the functions for the MovecellContent with the object implementation of the parameterArray


var ExcelBaseSkill = require("../common/xlSkill");

var moveCellContent = function (_ExcelBaseSkill) {
  _inherits(moveCellContent, _ExcelBaseSkill);

  function moveCellContent() {
    _classCallCheck(this, moveCellContent);

    return _possibleConstructorReturn(this, (moveCellContent.__proto__ || Object.getPrototypeOf(moveCellContent)).apply(this, arguments));
  }

  _createClass(moveCellContent, [{
    key: "createJsonPath",

    // //init DOC JSON 
    value: function createJsonPath(skillParams, callback) {

      var taskParams = skillParams.taskParams;
      var paramValueObj = skillParams.paramsObj;
      taskParams.dbFilestoreMgr.copyTaskAssetFile(paramValueObj["docData"], taskParams, function (error, xmlPath, fileType) {
        paramValueObj["docData"] = xmlPath;
        if (!error) {
          var preloadResArr = [];
          preloadResArr.push({ "path": "" + xmlPath, "type": "" + fileType });
          callback(null, paramValueObj["docData"], preloadResArr);
          //add this new path to the preloadResources Array
        } else {
          callback(error);
        }
      });
    }
  }, {
    key: "getSelectedCell",
    value: function getSelectedCell(skillParams, callback) {

      var paramValueObj = skillParams.paramsObj;
      callback(null, paramValueObj["srcRange"]);
    }
  }, {
    key: "getSelDragCell",
    value: function getSelDragCell(skillParams, callback) {

      var paramValueObj = skillParams.paramsObj;
      //requires sheet name using init doc json
      var finalObject = {};
      finalObject["sheetNo"] = 1;
      finalObject["startRange"] = paramValueObj["srcRange"];
      finalObject["endRange"] = paramValueObj["destRange"];
      finalObject = JSON.stringify(finalObject);
      callback(null, finalObject);
    }
  }, {
    key: "createHighlightJson",
    value: function createHighlightJson(skillParams, callback) {

      var paramValueObj = skillParams.paramsObj;
      // requires sheet number using Init Doc json
      var finalObject = {};
      finalObject["sheetNo"] = 1;
      finalObject["range"] = paramValueObj["srcRange"];
      finalObject = JSON.stringify(finalObject);
      callback(null, finalObject);
    }
  }, {
    key: "createSheetCellData",
    value: function createSheetCellData(skillParams, callback) {

      var taskParams = skillParams.taskParams;
      var paramValueObj = skillParams.paramsObj;
      var finalObject = {};
      finalObject["sheetNo"] = 1;
      //getSheetNameMapgetSheetNameMap(sheetName, initDocJsonPath)

      taskParams.dbFilestoreMgr.copyTaskAssetFile(paramValueObj["wbData"], taskParams, function (error, xmlPath, fileType) {

        if (!error) {
          paramValueObj["wbData"] = xmlPath;
          finalObject["dataJSONPath"] = paramValueObj["wbData"];
          finalObject = JSON.stringify(finalObject);
          var preloadResArr = [];
          preloadResArr.push({ "path": "" + xmlPath, "type": "" + fileType });
          callback(null, finalObject, preloadResArr);
        } else {
          // console.log("error in the createSheetCellData");
          callback(error);
        }
      });
    }
  }, {
    key: "getSelectedCellFinal",
    value: function getSelectedCellFinal(skillParams, callback) {

      var paramValueObj = skillParams.paramsObj;
      var finalArray = [];

      var valuearray = paramValueObj["destRange"].split(":");
      valuearray[0].trim();
      valuearray[1].trim();

      var col1 = valuearray[0].toUpperCase().charAt(0);
      var col2 = valuearray[1].toUpperCase().charAt(0);
      var row1 = parseInt(valuearray[0].substring(1, valuearray[0].length));
      var row2 = parseInt(valuearray[1].substring(1, valuearray[0].length));

      finalArray.push(valuearray[0]);

      for (var iterator = 0; iterator <= col2.charCodeAt(0) - col1.charCodeAt(0); ++iterator) {
        for (var index = 0; index <= row2 - row1; ++index) {
          if (iterator != 0 || index != 0) finalArray.push(col1 + row1 + ":" + String.fromCharCode(col1.charCodeAt(0) + iterator) + (row1 + index));
        }
      }

      callback(null, finalArray);
    }
  }, {
    key: "getSheetNameAndSheetCountFromInitDocJSON",
    value: function getSheetNameAndSheetCountFromInitDocJSON(initDocJSON, dependantSheetArrayInModel) {

      //Add The Required Number of Sheets in Model
      if (initDocJSON.sheetCount >= dependantSheetArrayInModel.length) {
        var sheetCountDiff = initDocJSON.sheetCount - dependantSheetArrayInModel.length;
        while (sheetCountDiff > 0) {
          dependantSheetArrayInModel.push(JSON.parse(JSON.stringify(dependantSheetArrayInModel[dependantSheetArrayInModel.length - 1])));
          sheetCountDiff--;
        }
      }

      //Add Sheet Names From Init Doc JSON
      for (var sheetNum = 0; sheetNum < initDocJSON.sheetCount; sheetNum++) {
        dependantSheetArrayInModel[sheetNum].name = initDocJSON.sheets[sheetNum].name;
      }
    }
  }, {
    key: "addSheetNamesToDropdown",
    value: function addSheetNamesToDropdown(initDocJSON, dependantSheetArrayInModel) {

      //Empty the existing array
      while (dependantSheetArrayInModel.length > 0) {
        dependantSheetArrayInModel.pop(); //https://jsperf.com/array-clear-methods/3
      }
      //Add Sheet Names to Array From Init Doc JSON
      for (var sheetNum = 0; sheetNum < initDocJSON.sheetCount; sheetNum++) {
        dependantSheetArrayInModel.push(initDocJSON.sheets[sheetNum].name);
      }
    }
  }, {
    key: "updateSheetNameUsingDropdown",
    value: function updateSheetNameUsingDropdown(selectedSheetName, dependentSheetNameInModel) {
      dependentSheetNameInModel.name = selectedSheetName;
    }
  }]);

  return moveCellContent;
}(ExcelBaseSkill);

module.exports = moveCellContent;