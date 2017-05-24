var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ExcelBaseSkill = require("../common/xlSkill");

module.exports = function (_ExcelBaseSkill) {
  _inherits(maxFunction, _ExcelBaseSkill);

  function maxFunction() {
    _classCallCheck(this, maxFunction);

    return _possibleConstructorReturn(this, (maxFunction.__proto__ || Object.getPrototypeOf(maxFunction)).apply(this, arguments));
  }

  _createClass(maxFunction, [{
    key: "init",
    value: function init(data) {
      var initDocJSonPath = data.stepUIState.views["1"].documentData.path;
      var skilldata = { "initDocJSonPath": initDocJSonPath, "dbMgr": data.dbFilestoreMgr };
      return _get(maxFunction.prototype.__proto__ || Object.getPrototypeOf(maxFunction.prototype), "init", this).call(this, skilldata);
    }

    //init DOC JSON 

  }, {
    key: "createJsonPath",
    value: function createJsonPath(skillParams) {

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

    /* getCellFormulaPermutations
    @Inputs 
    cellContainingFormula: B23
    sheetInAction: 1
    formulaCellRangeReference: F5:F11
      @Output 
    {"sheetNo":1,"cellID":"B23","formula":"=MAX(F5:F11)"}
    {"sheetNo":1,"cellID":"B23","formula":"=MAXA(F5:F11)"}
    {"sheetNo":1,"cellID":"B23","formula":"=MAX((F5):(F11))"}
    {"sheetNo":1,"cellID":"B23","formula":"=MAXA((F5):(F11))"}
    {"sheetNo":1,"cellID":"B23","formula":"=MAXA"}
    {"sheetNo":1,"cellID":"B23","formula":"=MAX"}
    */

  }, {
    key: "getCellFormulas",
    value: function getCellFormulas(skillParams) {
      var taskParams = skillParams.taskParams,
          paramsObj = skillParams.paramsObj;

      var cellFormulas = [];
      var cellRange = paramsObj.formulaCellRangeReference.toUpperCase().split(':');

      var _cellRange = _slicedToArray(cellRange, 2),
          startCell = _cellRange[0],
          endCell = _cellRange[1];

      var sheetNumber = this.getSheetNumber(paramsObj.sheetInAction);
      var variations = ["=MAX(" + startCell + ":" + endCell + ")", "=MAXA(" + startCell + ":" + endCell + ")", "=MAX((" + startCell + "):(" + endCell + "))", "=MAXA((" + startCell + "):(" + endCell + "))", "=MAXA", "=MAX"];
      variations.forEach(function (value) {
        cellFormulas.push(JSON.stringify({ "sheetNo": sheetNumber, "cellID": paramsObj.cellContainingFormula, "formula": value }));
      });

      var resolveParams = { "attrValue": cellFormulas };
      return Promise.resolve(resolveParams);
    }
  }, {
    key: "getNumberCellsWithTilde",
    value: function getNumberCellsWithTilde(skillParams) {
      var taskParams = skillParams.taskParams,
          paramsObj = skillParams.paramsObj;

      var resolveParams = void 0;
      if (paramsObj.prefilledSelection === true) {
        var cellRange = paramsObj.formulaCellRangeReference.toUpperCase();
        resolveParams = { "attrValue": cellRange + "~" };
      } else {
        resolveParams = { "attrValue": "" };
      }

      return Promise.resolve(resolveParams);
    }
  }, {
    key: "getNumberCells",
    value: function getNumberCells(skillParams) {
      var taskParams = skillParams.taskParams,
          paramsObj = skillParams.paramsObj;

      var _paramsObj$formulaCel = paramsObj.formulaCellRangeReference.toUpperCase().split(":"),
          _paramsObj$formulaCel2 = _slicedToArray(_paramsObj$formulaCel, 2),
          startCell = _paramsObj$formulaCel2[0],
          endCell = _paramsObj$formulaCel2[1];

      var startSplitter = startCell.search(/\d/);
      var endSplitter = endCell.search(/\d/);
      var firstCol = startCell.substr(0, startSplitter);
      var firstRow = parseInt(startCell.substr(startSplitter));
      var secondCol = endCell.substr(0, endSplitter);
      var secondRow = parseInt(endCell.substr(endSplitter));
      var range = [];
      if (firstCol === secondCol) {
        for (var i = firstRow; i <= secondRow; i++) {
          range.push("" + firstCol + i);
        }
      } else if (firstRow === secondRow) {
        for (var _i = firstCol; _i <= secondCol; _i++) {
          range.push("" + _i + firstRow);
        }
      }
      var variations = ["(" + startCell + ":" + endCell + ")", "(" + startCell + "):(" + endCell + ")", "((" + startCell + "):(" + endCell + "))", range.toString(), range.toString().replace(/,/g, '~'), range.sort().toString().replace(/,/g, '~')];
      var resolveParams = { "attrValue": variations };
      return Promise.resolve(resolveParams);
    }
  }, {
    key: "getMAXCellText",
    value: function getMAXCellText(skillParams) {
      var taskParams = skillParams.taskParams,
          paramsObj = skillParams.paramsObj;

      var sheetNumber = this.getSheetNumber(paramsObj.sheetInAction);
      var cellText = { "sheetNo": sheetNumber, "cellID": paramsObj.cellContainingFormula.toUpperCase(), "formula": "MAX(F5:F11)" };
      var resolveParams = { "attrValue": JSON.stringify(cellText) };
      return Promise.resolve(resolveParams);
    }
  }, {
    key: "getMAXACellText",
    value: function getMAXACellText(skillParams) {
      var taskParams = skillParams.taskParams,
          paramsObj = skillParams.paramsObj;

      var sheetNumber = this.getSheetNumber(paramsObj.sheetInAction);
      var cellText = { "sheetNo": sheetNumber, "cellID": paramsObj.cellContainingFormula.toUpperCase(), "formula": "MAXA(F5:F11)" };
      var resolveParams = { "attrValue": JSON.stringify(cellText) };
      return Promise.resolve(resolveParams);
    }
  }, {
    key: "getCellValues",
    value: function getCellValues(skillParams) {
      var taskParams = skillParams.taskParams,
          paramsObj = skillParams.paramsObj;

      var resolveParams = void 0;
      if (paramsObj.prefilledSelection === true) {
        var cellValues = paramsObj.cellValues.replace(/,/g, ';');
        resolveParams = { "attrValue": "&#123;" + cellValues + "&#125;~" };
      } else {
        resolveParams = { "attrValue": "" };
      }
      return Promise.resolve(resolveParams);
    }
  }, {
    key: "getFormulaResult",
    value: function getFormulaResult(skillParams) {
      var taskParams = skillParams.taskParams,
          paramsObj = skillParams.paramsObj;

      var resolveParams = void 0;
      if (paramsObj.prefilledSelection === true) {
        resolveParams = { "attrValue": paramsObj.formulaResult };
      } else {
        resolveParams = { "attrValue": "" };
      }
      return Promise.resolve(resolveParams);
    }
  }, {
    key: "getEditCellText",
    value: function getEditCellText(skillParams) {
      var taskParams = skillParams.taskParams,
          paramsObj = skillParams.paramsObj;

      var editCellTextValue = {
        "typingText": "=MAX(" + paramsObj.formulaCellRangeReference.toUpperCase() + ")",
        "selectionStart": 5,
        "selectionEnd": paramsObj.formulaCellRangeReference.length + 5
      };
      var resolveParams = { "attrValue": JSON.stringify(editCellTextValue) };

      return Promise.resolve(resolveParams);
    }
  }, {
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
    key: "enableOrDisableOnSwitch",
    value: function enableOrDisableOnSwitch(componentInput, dependentObjectInModel) {
      dependentObjectInModel.disabled = !componentInput;
    }
  }]);

  return maxFunction;
}(ExcelBaseSkill);