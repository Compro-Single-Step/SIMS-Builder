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

  addDatabaseObjectToDropdown(navigationPaneJSON, navaigationPaneDatabaseObjectArray) {
    let objectType;
    let objectMap = {
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
            navaigationPaneDatabaseObjectArray.value.push({"label": (objectType + ' -> ' + navigationPaneJSON[key][i].name),"data":(objectType + ' -> ' + navigationPaneJSON[key][i].name)});
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
          typeObj.names.push(dataObject);
        }
        initialConfig.objects.push(typeObj);
      }
      console.log(initialConfig);
      var preloadResArr = [];
      preloadResArr.push({ "path": "" + resolveParam.filePath, "type": "" + resolveParam.fileType })
      var resolveParams = { "attrValue": initialConfig, "preloadResArr": preloadResArr }

      return Promise.resolve(resolveParams);
    });
  }
  getFinalDBConfig(DBJson){
        var validationConfig = {};
          var DataJSON = DBJson;
          for (var objtype in DataJSON){
            var names = [];
            for(var dataObject in DataJSON[objtype])
            {
              if(DataJSON[objtype][dataObject])
              names.push(dataObject);
            }
            if(names.length != 0)
              validationConfig[objtype] = names;
          }
          this.projJSON = validationConfig;
  }
  getFinalTableValidation(skillParams) {
    var paramValueObj = skillParams.paramsObj;
    var self = this;
    let resolveParams;
    if(Object.keys(this.projJSON).length != 0){
      if(this.projJSON.tables){
        resolveParams = { "attrValue": this.projJSON.tables};
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
      if(self.projJSON.tables){
        resolveParams = { "attrValue": self.projJSON.tables};    
      }
      else
        resolveParams = { "attrValue": null};
       console.log(resolveParams);
       return Promise.resolve(resolveParams);
      });
    }
    

  }
  getFinalReportValidation(skillParams) {
    var paramValueObj = skillParams.paramsObj;
    var self = this;
    let resolveParams;
    if(Object.keys(this.projJSON).length != 0){
      if(this.projJSON.reports){
        resolveParams = { "attrValue": this.projJSON.reports};    
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
      if(self.projJSON.reports){
        resolveParams = { "attrValue": self.projJSON.reports};    
      }
      else
        resolveParams = { "attrValue": null};
       console.log(resolveParams);
       return Promise.resolve(resolveParams);
      });
    }
    

  }
  getFinalQueryValidation(skillParams) {
    var paramValueObj = skillParams.paramsObj;
    var self = this;
    let resolveParams;
    if(Object.keys(this.projJSON).length != 0){
      if(this.projJSON.queries){
        resolveParams = { "attrValue": this.projJSON.queries};    
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
      if(self.projJSON.queries){
        resolveParams = { "attrValue": self.projJSON.queries};    
      }
      else
        resolveParams = { "attrValue": null};
       console.log(resolveParams);
       return Promise.resolve(resolveParams);
      });
    }
    

  }
  getFinalFormValidation(skillParams) {
    var paramValueObj = skillParams.paramsObj;
    var self = this;
    let resolveParams;
    if(Object.keys(this.projJSON).length != 0){
      if(this.projJSON.forms){
        resolveParams = { "attrValue": this.projJSON.forms};    
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
      if(self.projJSON.forms){
        resolveParams = { "attrValue": self.projJSON.forms};    
      }
      else
        resolveParams = { "attrValue": null};
       console.log(resolveParams);
       return Promise.resolve(resolveParams);
      });
    }
    

  }
  getFinalMacroValidation(skillParams) {
    var paramValueObj = skillParams.paramsObj;
    var self = this;
    let resolveParams;
    if(Object.keys(this.projJSON).length != 0){
      if(this.projJSON.macros){
        resolveParams = { "attrValue": this.projJSON.macros};    
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
      if(self.projJSON.macros){
        resolveParams = { "attrValue": self.projJSON.macros};    
      }
      else
        resolveParams = { "attrValue": null};
       console.log(resolveParams);
       return Promise.resolve(resolveParams);
      });
    }
    

  }
  getFinalModuleValidation(skillParams) {
    var paramValueObj = skillParams.paramsObj;
    var self = this;
    let resolveParams;
    if(Object.keys(this.projJSON).length != 0){
      if(this.projJSON.modules){
        resolveParams = { "attrValue": this.projJSON.modules};    
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
      if(self.projJSON.modules){
        resolveParams = { "attrValue": self.projJSON.modules};    
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
