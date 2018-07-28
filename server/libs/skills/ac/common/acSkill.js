const BaseSkill = require("../../common/baseSkill");
//Access based Common Functionality goes here 

const xmlUtil = require("../../../../utils/xmlUtil");

module.exports = class AccessBaseSkill extends BaseSkill {

  constructor() {
    super();
    /* Creating a list of he mandatory initial attributes which are application specific, these are mandatorily needed 
        to succeed in the AttrValueMap generation */
    this.mandatoryAttributeList = ["PROJECT_JSON","SELECTED_DB_OBJECT_TYPE", "SELECTED_DB_OBJECT"];
  }
/**
 * 
 * @param {*} skillParams : Contains taskParams (it contains data such as taskid, stepNo etc and refrence to dbFileStoreManager ) and paramsObj (it contains the parameters passed to function when called in iomap).
 * Same definition of skill params is being used for all the function in tis file.
 * paramsOBj: It contains doctitile 
 * Output:Document name to be shown in access ribbon
 */
  getTaskbarTooltipText(skillParams) {
    var paramValueObj = skillParams.paramsObj;
    var resolveParams = { "attrValue":  "Access - " + paramValueObj["DocTitle"] };
    return Promise.resolve(resolveParams);
  }
  /**
   * 
   * @param {*} paramsObj: selectedObj: navigation pane selected object
   * output: Name of the DB Object to be shown selected
   */
   getSelectedDBObjectName(skillParams){
    var paramValueObj = skillParams.paramsObj;
    try{
      var resolveParams = { "attrValue": paramValueObj.selectedObj.data.objectName};
    }
    catch(err){
      var resolveParams = { "attrValue": "null"};
    }
     return Promise.resolve(resolveParams);
  }
  /**
   * 
   * @param {*} paramsObj: selectedObj: navigation pane selected object
   * output: Type of the DB Object to be shown selected
   */
  getSelectedDBObjectType(skillParams){
    var paramValueObj = skillParams.paramsObj;
    let selectedType = "";
    let objectMap = {
      "Table":"Tables",
      "Query":"Queries",
      "Form":"Forms",
      "Report":"Reports",
      "Macro":"Macros",
      "Module":"Modules"
    }
    try{
      selectedType = objectMap[paramValueObj.selectedObj.data.objectType];    
      var resolveParams = { "attrValue": selectedType};
    }
    catch(err){
      var resolveParams = { "attrValue": "null"};
    }
     return Promise.resolve(resolveParams);
  }
  // Front End Function use to populate the dropdown list items from project json.
  addDatabaseObjectToDropdown(navigationPaneJSON, navaigationPaneDatabaseObjectArray) {
    var objectType;
    var objectMap = {
      "tables" : "Table",
      "queries" : "Query",
      "forms" : "Form",
      "reports" : "Report",
      "macros" : "Macro",
      "modules" : "Module"
    }

    while (navaigationPaneDatabaseObjectArray.value.length > 0) {
      navaigationPaneDatabaseObjectArray.value.pop(); //https://jsperf.com/array-clear-methods/3
    }

    for (let key in navigationPaneJSON) {
      if (navigationPaneJSON[key]) {
        objectType = objectMap[key];
        for(let i=0; i<navigationPaneJSON[key].length;i++ ){
            navaigationPaneDatabaseObjectArray.value.push({"label": (objectType + ': ' + navigationPaneJSON[key][i].name),"data":({"objectType":objectType,"objectName":navigationPaneJSON[key][i].name})});
        }        
     }
    }
  }
}