var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

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
    key: "init",


    //dynamic sheet update
    value: function init(data, callback) {
      var initDocJSonPath = data.stepUIState.views["1"].documentData.path;
      var skilldata = { "initDocJSonPath": initDocJSonPath, "dbMgr": data.dbFilestoreMgr };
      return _get(moveCellContent.prototype.__proto__ || Object.getPrototypeOf(moveCellContent.prototype), "init", this).call(this, skilldata);
    }

    //init DOC JSON 

  }, {
    key: "createJsonPath",
    value: function createJsonPath(skillParams, callback) {

      var taskParams = skillParams.taskParams;
      var paramValueObj = skillParams.paramsObj;

      return taskParams.dbFilestoreMgr.copyTaskAssetFile(paramValueObj["docData"], taskParams).then(function (resolveParam) {
        paramValueObj["docData"] = resolveParam.filePath;
        var preloadResArr = [];
        preloadResArr.push({ "path": "" + resolveParam.filePath, "type": "" + resolveParam.fileType });
        resolveParam = { "attrValue": paramValueObj["docData"], "preloadResArr": preloadResArr };
        return Promise.resolve(resolveParam);
      }, function (error) {
        return Promise.reject(error);
        console.log("rejection at the movecellcontent");
      }).catch(function (error) {
        return Promise.reject(error);
      });
    }
  }, {
    key: "getSelectedCell",
    value: function getSelectedCell(skillParams, callback) {

      var paramValueObj = skillParams.paramsObj;
      var resolveParams = { "attrValue": paramValueObj["srcRange"] };
      return Promise.resolve(resolveParams);
    }
  }, {
    key: "getSelDragCell",
    value: function getSelDragCell(skillParams, callback) {

      var paramValueObj = skillParams.paramsObj;
      //requires sheet name using init doc json
      var finalObject = {};
      finalObject["sheetNo"] = this.getSheetNumber(paramValueObj.sheetAction);
      finalObject["startRange"] = paramValueObj["srcRange"];
      finalObject["endRange"] = paramValueObj["destRange"];
      finalObject = JSON.stringify(finalObject);
      var resolveParams = { "attrValue": finalObject };
      return Promise.resolve(resolveParams);
    }
  }, {
    key: "createHighlightJson",
    value: function createHighlightJson(skillParams, callback) {

      var paramValueObj = skillParams.paramsObj;
      // requires sheet number using Init Doc json
      var finalObject = {};
      finalObject["sheetNo"] = this.getSheetNumber(paramValueObj.sheetAction);
      finalObject["range"] = paramValueObj["srcRange"];
      finalObject = JSON.stringify(finalObject);
      var resolveParams = { "attrValue": finalObject };
      return Promise.resolve(resolveParams);
    }
  }, {
    key: "createSheetCellData",
    value: function createSheetCellData(skillParams, callback) {

      var taskParams = skillParams.taskParams;
      var paramValueObj = skillParams.paramsObj;
      var finalObject = {};
      finalObject["sheetNo"] = this.getSheetNumber(paramValueObj.sheetAction);
      return taskParams.dbFilestoreMgr.copyTaskAssetFile(paramValueObj["wbData"], taskParams).then(function (resolaveParams) {
        paramValueObj["wbData"] = resolaveParams.filePath;
        finalObject["dataJSONPath"] = paramValueObj["wbData"];
        finalObject = JSON.stringify(finalObject);
        var preloadResArr = [];
        preloadResArr.push({ "path": "" + resolaveParams.filePath, "type": "" + resolaveParams.fileType });
        var resolveParams = { "attrValue": finalObject, "preloadResArr": preloadResArr };
        return Promise.resolve(resolveParams);
      }, function (error) {
        return Promise.reject(error);
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
      var resolveParams = { "attrValue": finalArray };
      return Promise.resolve(resolveParams);
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