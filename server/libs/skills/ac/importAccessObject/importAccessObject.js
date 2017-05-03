// this file contains all the functions for the MovecellContent with the object implementation of the parameterArray
const baseSkill = require("../../common/baseSkill");

const xmlUtil = require("../../../../utils/xmlUtil");

class importAccessobject extends baseSkill {
  constructor(){
    super();
    this.projJSON = {};
  }
  //tooltip text to be displayed
  getTootlTipText(skillParams) {
    var paramValueObj = skillParams.paramsObj;
    var resolveParams = { "attrValue":  "Access - " + paramValueObj["DocTitle"] };
    return Promise.resolve(resolveParams);
  }
  getSkillMode(skillParams){
    var paramValueObj = skillParams.paramsObj;
    var resolveParams = { "attrValue":paramValueObj.skillmode};
    return Promise.resolve(resolveParams);
  }
  getSaveAsText(skillParams){
    var paramValueObj = skillParams.paramsObj;
    var resolveParams = this.splitFilename(paramValueObj.databasePath);
    resolveParams = { "attrValue":"Import-"+resolveParams.split(".")[0]};
    return Promise.resolve(resolveParams);
  }
  splitFilename(filePath){
    var res = filePath.split("\\");
    return res[res.length-1];
  }
  getFileNameWithExtension(skillParams) {
    var paramValueObj = skillParams.paramsObj;
    var resolveParams = { "attrValue": this.splitFilename(paramValueObj.databasePath)};
    return Promise.resolve(resolveParams);
  }
  getFileName(skillParams) {
    var paramValueObj = skillParams.paramsObj;
    var resolveParams = this.splitFilename(paramValueObj.databasePath);
    resolveParams = { "attrValue": resolveParams.split(".")[0]};
    return Promise.resolve(resolveParams);
  }
  getSelectedObject(skillParams){
    var paramValueObj = skillParams.paramsObj;
    var resolveParams = { "attrValue": paramValueObj.selectedObj.data.split(".")[1]};
    return Promise.resolve(resolveParams);
  }
  getSelectedObjectType(skillParams){
    var paramValueObj = skillParams.paramsObj;
    let objectMap = {
      "Table":"Tables",
      "Query":"Queries",
      "Form":"Forms",
      "Report":"Reports",
      "Macro":"Macros",
      "Module":"Modules"
    }
    var resolveParams = { "attrValue": objectMap[paramValueObj.selectedObj.data.split(".")[0]]};
    return Promise.resolve(resolveParams);
  }
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
            navaigationPaneDatabaseObjectArray.value.push({"label": (objectType + ' : ' + navigationPaneJSON[key][i].name),"data":(objectType + '.' + navigationPaneJSON[key][i].name)});
        }        
     }
    }
  }
  getInitialDBConfig(skillParams) {
    var paramValueObj = skillParams.paramsObj;
    var initialConfig = {
    "objects": []
    };
    var self = this;
    return skillParams.taskParams.dbFilestoreMgr.readFileFromFileStore(paramValueObj.DBdata).then(function (resolveParam) {
      var DataJSON = JSON.parse(resolveParam.fileData);

      self.getFinalDBConfig(DataJSON);
      for (var objtype in DataJSON){
        var typeObj = {
          "objectType":objtype,
          "names":[]
        };
        for(var dataObject in DataJSON[objtype])
        {
          typeObj.names.push(DataJSON[objtype][dataObject].name);
        }
        initialConfig.objects.push(typeObj);
      }
      return skillParams.taskParams.dbFilestoreMgr.saveXMLDynamicResource(skillParams.taskParams,JSON.stringify(initialConfig),"InitialConfig.json").then( (resolvePath)=>{
        var preloadResArr = [];
        var finalPath = resolvePath
        //finalPath [finalPath.length -1] = "InitialConfig";
        preloadResArr.push({ "path": "" + finalPath, "type": "json" })
        var resolveParams = { "attrValue": finalPath, "preloadResArr": preloadResArr }

        return Promise.resolve(resolveParams);
      });
    });
  }
  getFinalDBConfig(DBJson){
        var validationConfig = {};
          var DataJSON = DBJson;
          for (var objtype in DataJSON){
            var names = [];
            for(var dataObject in DataJSON[objtype])
            {
              if(DataJSON[objtype][dataObject]["import"] == "true")
              names.push(DataJSON[objtype][dataObject]["name"]);
            }
            if(names.length != 0)
              validationConfig[objtype] = names;
          }
          this.projJSON = validationConfig;
  }
  
  // generateTreeXML(skillParams){
  //   var path = "ac/importAccessObject/Resources/tree.xml";
  //   skillParams.taskParams.dbFilestoreMgrgetSkillResources(path);

  // }
  getFinalTableValidation(skillParams) { 
    return this.checkIfObjectExist(skillParams,"tables");
  }
  getFinalReportValidation(skillParams) {
    return this.checkIfObjectExist(skillParams,"reports");
  }
  getFinalQueryValidation(skillParams) {
    return this.checkIfObjectExist(skillParams,"queries");
  }
  getFinalFormValidation(skillParams) {
    return this.checkIfObjectExist(skillParams,"forms");
  }
  getFinalMacroValidation(skillParams) {
    return this.checkIfObjectExist(skillParams,"macros");
  }
  getFinalModuleValidation(skillParams) {    
    return this.checkIfObjectExist(skillParams,"modules");
  }
  checkIfObjectExist(skillParams,objType){
    let paramValueObj = skillParams.paramsObj;
    let resolveParams;
    let self = this;
    if(Object.keys(this.projJSON).length != 0){
      if(this.projJSON[objType]){
        let finalString = "["+this.projJSON[objType][0];
        for(let index=1;index<this.projJSON[objType].length;index++){
          finalString+=","+this.projJSON[objType][index];
        }
        finalString+="]";
        resolveParams = { "attrValue": finalString};
      }
      else
        resolveParams = { "attrValue": null};
       console.log(resolveParams);
       return Promise.resolve(resolveParams);
    }
    else{
      return skillParams.taskParams.dbFilestoreMgr.readFileFromFileStore(paramValueObj.DBdata).then(function (resolveParam) {
      var DataJSON = JSON.parse(resolveParam.fileData);
      self.getFinalDBConfig(DataJSON);
      if(self.projJSON[objType]){
        let finalString = "["+self.projJSON[objType][0];
        for(let index=1;index<self.projJSON[objType].length;index++){
          finalString+=","+self.projJSON[objType][index];
        }
        finalString+="]";
        resolveParams = { "attrValue": finalString};    
      }
      else
        resolveParams = { "attrValue": null};
       console.log(resolveParams);
       return Promise.resolve(resolveParams);
      });
    }
  }
}
module.exports = importAccessobject;
