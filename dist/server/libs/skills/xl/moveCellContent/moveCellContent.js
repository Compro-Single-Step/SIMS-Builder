var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// this file contains all the functions for the MovecellContent with the object implementation of the parameterArray


var ExcelBaseSkill = require("../common/xlSkill");

var MoveCellContent = function (_ExcelBaseSkill) {
  _inherits(MoveCellContent, _ExcelBaseSkill);

  function MoveCellContent() {
    _classCallCheck(this, MoveCellContent);

    return _possibleConstructorReturn(this, (MoveCellContent.__proto__ || Object.getPrototypeOf(MoveCellContent)).apply(this, arguments));
  }

  _createClass(MoveCellContent, [{
    key: "init",


    //dynamic sheet update
    value: function init(data) {
      var initDocJSonPath = data.stepUIState.views["1"].documentData.path;
      var skilldata = { "initDocJSonPath": initDocJSonPath, "dbMgr": data.dbFilestoreMgr };
      return _get(MoveCellContent.prototype.__proto__ || Object.getPrototypeOf(MoveCellContent.prototype), "init", this).call(this, skilldata);
    }

    // function moved to XLskill
    // init DOC JSON 
    // createJsonPath(skillParams) {
    // }

  }, {
    key: "getSelectedCell",
    value: function getSelectedCell(skillParams) {
      var paramValueObj = skillParams.paramsObj;
      paramValueObj["srcRange"] = paramValueObj["srcRange"].toUpperCase();
      var resolveParams = { "attrValue": paramValueObj["srcRange"] };
      return Promise.resolve(resolveParams);
    }
  }, {
    key: "getSelDragCell",
    value: function getSelDragCell(skillParams) {

      var paramValueObj = skillParams.paramsObj;
      //requires sheet name using init doc json
      var finalObject = {};
      finalObject["sheetNo"] = this.getSheetNumber(paramValueObj.sheetAction);
      finalObject["startRange"] = paramValueObj["srcRange"].toUpperCase();
      finalObject["endRange"] = paramValueObj["destRange"].toUpperCase();
      finalObject = JSON.stringify(finalObject);
      var resolveParams = { "attrValue": finalObject };
      return Promise.resolve(resolveParams);
    }
  }, {
    key: "createHighlightJson",
    value: function createHighlightJson(skillParams) {

      var paramValueObj = skillParams.paramsObj;
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

  }, {
    key: "getSelectedCellFinal",
    value: function getSelectedCellFinal(skillParams) {

      var paramValueObj = skillParams.paramsObj;
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
          if (iterator != 0 || index != 0) finalArray.push(col1 + row1 + ":" + String.fromCharCode(col1.charCodeAt(0) + iterator) + (row1 + index));
        }
      }
      var resolveParams = { "attrValue": finalArray };
      return Promise.resolve(resolveParams);
    }
  }, {
    key: "getSheetDetails",
    value: function getSheetDetails(initDocJSON, dependantSheetArrayInModel, clonedDependantSheetArrayInModel) {
      while (dependantSheetArrayInModel.length > 0) {
        dependantSheetArrayInModel.pop(); //https://jsperf.com/array-clear-methods/3
      }

      if (initDocJSON === null || initDocJSON === undefined) {
        //initDocJSON Removed
        dependantSheetArrayInModel.push(clonedDependantSheetArrayInModel[0]);
      } else {
        //initDocJSON Added

        //Add Sheet Names From Init Doc JSON
        if (initDocJSON.sheets) {
          for (var sheetNum = 0; sheetNum < initDocJSON.sheetCount; sheetNum++) {
            dependantSheetArrayInModel.push(JSON.parse(JSON.stringify(clonedDependantSheetArrayInModel[0])));
            dependantSheetArrayInModel[sheetNum].name = initDocJSON.sheets[sheetNum].name;
          }
        } else {
          dependantSheetArrayInModel.push(clonedDependantSheetArrayInModel[0]);
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
      if (initDocJSON !== null && initDocJSON !== undefined) {
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
  }]);

  return MoveCellContent;
}(ExcelBaseSkill);

module.exports = MoveCellContent;