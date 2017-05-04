// this file contains all the functions for the IMPORT ACCESS OBJECT with the object implementation of the parameterArray
const AccessBaseSkill = require("../common/acSkill");

class importAccessobject extends AccessBaseSkill {
  constructor(){
    super();
    this.projJSON = {};
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
        if(Object.keys(this.projJSON).length != 0){
          return;
        }
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
          return;
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
        let finalString = "[";
        for(let index=0;index<this.projJSON[objType].length;index++){
          finalString+=this.projJSON[objType][index];
        }
        finalString+="]";
        resolveParams = { "attrValue": finalString};
      }
      else
        resolveParams = { "attrValue": null};
       return Promise.resolve(resolveParams);
    }
    else{
      return skillParams.taskParams.dbFilestoreMgr.readFileFromFileStore(paramValueObj.DBdata).then(function (resolveParam) {
      var DataJSON = JSON.parse(resolveParam.fileData);
      self.getFinalDBConfig(DataJSON);
      if(self.projJSON[objType]){
        let finalString = "[";
        for(let index=0;index<self.projJSON[objType].length;index++){
          finalString+=self.projJSON[objType][index];
        }
        finalString+="]";
        resolveParams = { "attrValue": finalString};    
      }
      else
        resolveParams = { "attrValue": null};
       return Promise.resolve(resolveParams);
      });
    }
  }
  getFinalSelectedObjectType(skillParams){
    var resolveParams;
    var paramValueObj = skillParams.paramsObj;
    if(paramValueObj.skillmode == "2"){
      resolveParams = { "attrValue":"Tables"};
      return Promise.resolve(resolveParams);
    }
    else{
      return super.getSelectedObjectType(skillParams);
    } 
  }
  getFinalSelectedObject(skillParams){
    var paramValueObj = skillParams.paramsObj;
    var resolveParams = { "attrValue":paramValueObj.skillmode};
    if(paramValueObj.skillmode == "2"){
      return this.getLastTableSelected(skillParams);
    }
    else{
      return super.getSelectedObject(skillParams); 
    } 
  }
  getLastTableSelected(skillParams){
    let paramValueObj = skillParams.paramsObj;
    let resolveParams;
    let self = this;
    if(Object.keys(this.projJSON).length != 0){
      resolveParams = { "attrValue": this.projJSON["tables"][this.projJSON["tables"].length-1]};
      return Promise.resolve(resolveParams);
    }
    else{
      return skillParams.taskParams.dbFilestoreMgr.readFileFromFileStore(paramValueObj.DBdata).then(function (resolveParam) {
        var DataJSON = JSON.parse(resolveParam.fileData);
        self.getFinalDBConfig(DataJSON);
        resolveParams = { "attrValue": self.projJSON["tables"][self.projJSON["tables"].length-1]};
        return Promise.resolve(resolveParams);
      });
    }
  }
}
module.exports = importAccessobject;
