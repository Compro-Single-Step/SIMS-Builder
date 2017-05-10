var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// class importAccessobject contains all the functions for the IMPORT ACCESS OBJECT with the object implementation of the parameterArray
var AccessBaseSkill = require("../common/acSkill");

var importAccessobject = function (_AccessBaseSkill) {
  _inherits(importAccessobject, _AccessBaseSkill);

  function importAccessobject() {
    _classCallCheck(this, importAccessobject);

    var _this = _possibleConstructorReturn(this, (importAccessobject.__proto__ || Object.getPrototypeOf(importAccessobject)).call(this));

    _this.importedObjectJSON = {};
    _this.importDialogInputJSON = {};
    return _this;
  }
  // This function reads a file from filestore to be used by multiple functions in this class. Also it populates a json object to be used by multiple functions 


  _createClass(importAccessobject, [{
    key: "init",
    value: function init(data) {
      var self = this;
      return data.dbFilestoreMgr.readFileFromFileStore(data.stepUIState.views["2"].importDBConfig.path).then(function (resolveParam) {
        self.importDialogInputJSON = JSON.parse(resolveParam.fileData);
        self.importedObjectJSON = self.getFinalDBConfig(self.importDialogInputJSON);
        return Promise.resolve();
      });
    }
    /**
     *
     * @param {*} skillParams : Contains taskParams and paramsObj
     * @Ouput: Mode in which the database is to be imported 
     */

  }, {
    key: "getSkillMode",
    value: function getSkillMode(skillParams) {
      var paramValueObj = skillParams.paramsObj;
      var resolveParams = { "attrValue": paramValueObj.skillmode };
      return Promise.resolve(resolveParams);
    }
    //This function return a string to be used for an atrribute of Get External Data to demonstrate the name with which the nam eof the step have to be saved.

  }, {
    key: "getSaveAsText",
    value: function getSaveAsText(skillParams) {
      var paramValueObj = skillParams.paramsObj;
      var fileName = this.getFileNameFromFilePath(paramValueObj.databasePath);
      fileName = "Import-" + this.removeExtFromFileName(fileName);
      var resolveParams = { "attrValue": fileName };
      return Promise.resolve(resolveParams);
    }
    //This function splits the document name and returns the access database file name.

  }, {
    key: "getFileNameFromFilePath",
    value: function getFileNameFromFilePath(filePath) {
      var res = filePath.split("\\");
      return res[res.length - 1];
    }
    //It returns the name of the database file along with extension.

  }, {
    key: "getFileNameWithExtension",
    value: function getFileNameWithExtension(skillParams) {
      var paramValueObj = skillParams.paramsObj;
      var resolveParams = { "attrValue": this.getFileNameFromFilePath(paramValueObj.databasePath) };
      return Promise.resolve(resolveParams);
    }
    //It returns the name of the dtabase file without extension.

  }, {
    key: "getFileName",
    value: function getFileName(skillParams) {
      var paramValueObj = skillParams.paramsObj;
      var fileName = this.getFileNameFromFilePath(paramValueObj.databasePath);
      fileName = this.removeExtFromFileName(fileName);
      var resolveParams = { "attrValue": fileName };
      return Promise.resolve(resolveParams);
    }
  }, {
    key: "removeExtFromFileName",
    value: function removeExtFromFileName(fileName) {
      var temp = fileName.split(".");
      var fileExt = "." + temp[temp.length - 1];
      return fileName.replace(fileExt, "");
    }
    //This function stores a JSON in filestore to render Import Objects component and returns the path of the JSON. 

  }, {
    key: "getInitialDBConfig",
    value: function getInitialDBConfig(skillParams) {
      var paramValueObj = skillParams.paramsObj;
      var initialConfig = {
        "objects": []
      };
      var DataJSON = this.importDialogInputJSON;
      // change objType name - done
      for (var objtype in DataJSON) {
        var DBObj = {
          "objectType": objtype,
          "names": []
        };
        for (var dataObject in DataJSON[objtype]) {
          DBObj.names.push(DataJSON[objtype][dataObject].name);
        }
        initialConfig.objects.push(DBObj);
      }
      // change name of the saveXMLDynamicResource - changes to saveTaskDynamicResource
      return skillParams.taskParams.dbFilestoreMgr.saveTaskDynamicResource(skillParams.taskParams, JSON.stringify(initialConfig), "InitialConfig.json").then(function (resolvePath) {
        var preloadResArr = [];
        var finalPath = resolvePath;
        preloadResArr.push({ "path": "" + finalPath, "type": "json" });
        var resolveParams = { "attrValue": finalPath, "preloadResArr": preloadResArr };

        return Promise.resolve(resolveParams);
      });
    }
    // It populates a json object which is further used for final attribute validations

  }, {
    key: "getFinalDBConfig",
    value: function getFinalDBConfig(DBJson) {
      var validationConfig = {};
      var DataJSON = DBJson;
      for (var objtype in DataJSON) {
        var names = [];
        for (var dataObject in DataJSON[objtype]) {
          if (DataJSON[objtype][dataObject]["import"] == "true") names.push(DataJSON[objtype][dataObject]["name"]);
        }
        if (names.length != 0) validationConfig[objtype] = names;
      }
      return validationConfig;
    }

    // Below function are used to check whether particular datatype exist in the populated json to create final attributes fro the same.

  }, {
    key: "getFinalTableValidation",
    value: function getFinalTableValidation(skillParams) {
      return this.checkIfObjectExist(skillParams, "tables");
    }
  }, {
    key: "getFinalReportValidation",
    value: function getFinalReportValidation(skillParams) {
      return this.checkIfObjectExist(skillParams, "reports");
    }
  }, {
    key: "getFinalQueryValidation",
    value: function getFinalQueryValidation(skillParams) {
      return this.checkIfObjectExist(skillParams, "queries");
    }
  }, {
    key: "getFinalFormValidation",
    value: function getFinalFormValidation(skillParams) {
      return this.checkIfObjectExist(skillParams, "forms");
    }
  }, {
    key: "getFinalMacroValidation",
    value: function getFinalMacroValidation(skillParams) {
      return this.checkIfObjectExist(skillParams, "macros");
    }
  }, {
    key: "getFinalModuleValidation",
    value: function getFinalModuleValidation(skillParams) {
      return this.checkIfObjectExist(skillParams, "modules");
    }
    // This fucntion is called for each type of DB Object and returns attribute values for each of them

  }, {
    key: "checkIfObjectExist",
    value: function checkIfObjectExist(skillParams, objType) {
      var paramValueObj = skillParams.paramsObj;
      var resolveParams = void 0;
      var self = this;
      if (this.importedObjectJSON[objType]) {
        // It is not made and stringified as there are no comma between file names in attr value..
        var finalString = "[";
        for (var index = 0; index < this.importedObjectJSON[objType].length; index++) {
          finalString += this.importedObjectJSON[objType][index];
        }
        finalString += "]";
        resolveParams = { "attrValue": finalString };
      } else {
        resolveParams = { "attrValue": null };
      }
      return Promise.resolve(resolveParams);
    }
    //This function returns the type of the DB object to be shown selecetd in the final state.

  }, {
    key: "getFinalSelectedObjectType",
    value: function getFinalSelectedObjectType(skillParams) {
      var resolveParams;
      var paramValueObj = skillParams.paramsObj;
      if (paramValueObj.skillmode == "2") {
        resolveParams = { "attrValue": "Tables" };
        return Promise.resolve(resolveParams);
      } else {
        return this.getSelectedDBObjectType(skillParams);
      }
    }
    //This function returns the name of the DB object to be shown selecetd in the final state.

  }, {
    key: "getFinalSelectedObjectName",
    value: function getFinalSelectedObjectName(skillParams) {
      var paramValueObj = skillParams.paramsObj;
      var resolveParams = { "attrValue": paramValueObj.skillmode };
      if (paramValueObj.skillmode == "2") {
        return this.getLastTableSelected(skillParams);
      } else {
        return this.getSelectedDBObjectName(skillParams);
      }
    }
    // This function returns the name of the last table selected if mode of import is Linked table

  }, {
    key: "getLastTableSelected",
    value: function getLastTableSelected(skillParams) {
      var paramValueObj = skillParams.paramsObj;
      var resolveParams = void 0;
      var self = this;
      var tableObj = this.importedObjectJSON["tables"];
      resolveParams = { "attrValue": tableObj[tableObj.length - 1] };
      return Promise.resolve(resolveParams);
    }
  }, {
    key: "getImportObjectCompTitle",
    value: function getImportObjectCompTitle(skillParams) {
      var paramValueObj = skillParams.paramsObj;
      var compTitle = "";
      if (paramValueObj.mode == "1") {
        compTitle = "Import Objects";
      } else {
        compTitle = "Link Tables";
      }
      var resolveParams = { "attrValue": compTitle };
      return Promise.resolve(resolveParams);
    }
  }]);

  return importAccessobject;
}(AccessBaseSkill);

module.exports = importAccessobject;