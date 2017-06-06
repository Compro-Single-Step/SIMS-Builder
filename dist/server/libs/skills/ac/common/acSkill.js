var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var BaseSkill = require("../../common/baseSkill");
//Access based Common Functionality goes here 

var xmlUtil = require("../../../../utils/xmlUtil");

module.exports = function (_BaseSkill) {
  _inherits(AccessBaseSkill, _BaseSkill);

  function AccessBaseSkill() {
    _classCallCheck(this, AccessBaseSkill);

    return _possibleConstructorReturn(this, (AccessBaseSkill.__proto__ || Object.getPrototypeOf(AccessBaseSkill)).apply(this, arguments));
  }

  _createClass(AccessBaseSkill, [{
    key: "getTaskbarTooltipText",

    /**
     * 
     * @param {*} skillParams : Contains taskParams (it contains data such as taskid, stepNo etc and refrence to dbFileStoreManager ) and paramsObj (it contains the parameters passed to function when called in iomap).
     * Same definition of skill params is being used for all the function in tis file.
     * paramsOBj: It contains doctitile 
     * Output:Document name to be shown in access ribbon
     */
    value: function getTaskbarTooltipText(skillParams) {
      var paramValueObj = skillParams.paramsObj;
      var resolveParams = { "attrValue": "Access - " + paramValueObj["DocTitle"] };
      return Promise.resolve(resolveParams);
    }
    /**
     * 
     * @param {*} paramsObj: selectedObj: navigation pane selected object
     * output: Name of the DB Object to be shown selected
     */

  }, {
    key: "getSelectedDBObjectName",
    value: function getSelectedDBObjectName(skillParams) {
      var paramValueObj = skillParams.paramsObj;
      var resolveParams = { "attrValue": paramValueObj.selectedObj.data.objectName };
      return Promise.resolve(resolveParams);
    }
    /**
     * 
     * @param {*} paramsObj: selectedObj: navigation pane selected object
     * output: Type of the DB Object to be shown selected
     */

  }, {
    key: "getSelectedDBObjectType",
    value: function getSelectedDBObjectType(skillParams) {
      var paramValueObj = skillParams.paramsObj;
      var objectMap = {
        "Table": "Tables",
        "Query": "Queries",
        "Form": "Forms",
        "Report": "Reports",
        "Macro": "Macros",
        "Module": "Modules"
      };
      var resolveParams = { "attrValue": objectMap[paramValueObj.selectedObj.data.objectType] };
      return Promise.resolve(resolveParams);
    }
    // Front End Function use to populate the dropdown list items from project json.

  }, {
    key: "addDatabaseObjectToDropdown",
    value: function addDatabaseObjectToDropdown(navigationPaneJSON, navaigationPaneDatabaseObjectArray) {
      var objectType;
      var objectMap = {
        "tables": "Table",
        "queries": "Query",
        "forms": "Form",
        "reports": "Report",
        "macros": "Macro",
        "modules": "Module"
      };

      while (navaigationPaneDatabaseObjectArray.value.length > 0) {
        navaigationPaneDatabaseObjectArray.value.pop(); //https://jsperf.com/array-clear-methods/3
      }

      for (var key in navigationPaneJSON) {
        if (navigationPaneJSON[key]) {
          objectType = objectMap[key];
          for (var i = 0; i < navigationPaneJSON[key].length; i++) {
            navaigationPaneDatabaseObjectArray.value.push({ "label": objectType + ': ' + navigationPaneJSON[key][i].name, "data": { "objectType": objectType, "objectName": navigationPaneJSON[key][i].name } });
          }
        }
      }
    }
  }]);

  return AccessBaseSkill;
}(BaseSkill);