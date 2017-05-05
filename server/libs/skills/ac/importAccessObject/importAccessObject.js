// class importAccessobject contains all the functions for the IMPORT ACCESS OBJECT with the object implementation of the parameterArray
const AccessBaseSkill = require("../common/acSkill");

class importAccessobject extends AccessBaseSkill {
  constructor(){
    super();
    this.projJSON = {};
    this.IntialDataJSON ={};
  }
  // This function reads a file from filestore to be used by multiple functions in this class. Also it populates a json object to be used by multiple functions 
  init(data) {
    var self = this;
    return data.dbFilestoreMgr.readFileFromFileStore(data.stepUIState.views["2"].importDBConfig.path).then(function (resolveParam) {
      self.IntialDataJSON = JSON.parse(resolveParam.fileData);
      self.projJSON = self.getFinalDBConfig(self.IntialDataJSON);
      return Promise.resolve();
    });
  }
  /**
   *
   * @param {*} skillParams : Contains taskParams and paramsObj
   * @Ouput: Mode in which the database is to be imported 
   */
  getSkillMode(skillParams){
    var paramValueObj = skillParams.paramsObj;
    var resolveParams = { "attrValue":paramValueObj.skillmode};
    return Promise.resolve(resolveParams);
  }
  //This function return a string to be used for an atrribute of Get External Data to demonstrate the name with which the nam eof the step have to be saved.
  getSaveAsText(skillParams){
    var paramValueObj = skillParams.paramsObj;
    var fileName = this.splitFilename(paramValueObj.databasePath);
    //this code replaces the extension with empty string, effectively removing the File Extension
    var resolveParams = fileName.replace("."+fileName.split(".")[fileName.split(".").length-1],"")
    // splitting in "." might end the file name before it gets completed -done
    resolveParams = { "attrValue":"Import-"+resolveParams};
    return Promise.resolve(resolveParams);
  }
  //This function splits the document name and returns the access database file name.
  splitFilename(filePath){
    var res = filePath.split("\\");
    return res[res.length-1];
  }
  //It returns the name of the database file along with extension.
  getFileNameWithExtension(skillParams) {
    var paramValueObj = skillParams.paramsObj;
    var resolveParams = { "attrValue": this.splitFilename(paramValueObj.databasePath)};
    return Promise.resolve(resolveParams);
  }
  //It returns the name of the dtabase file without extension.
  getFileName(skillParams) {
    var paramValueObj = skillParams.paramsObj;
    var fileName = this.splitFilename(paramValueObj.databasePath);
    var resolveParams = fileName.replace("."+fileName.split(".")[fileName.split(".").length-1],"")
    resolveParams = { "attrValue": resolveParams};
    return Promise.resolve(resolveParams);
  }
  //This function stores a JSON in filestore to render Import Objects component and returns the path of the JSON. 
  getInitialDBConfig(skillParams) {
    var paramValueObj = skillParams.paramsObj;
    var initialConfig = {
    "objects": []
    };
    var DataJSON = this.IntialDataJSON
      // change objType name - done
      for (var objtype in DataJSON){
        var DBObj = {
          "objectType":objtype,
          "names":[]
        };
        for(var dataObject in DataJSON[objtype])
        {
          DBObj.names.push(DataJSON[objtype][dataObject].name);
        }
        initialConfig.objects.push(DBObj);
      }
      // change name of the saveXMLDynamicResource - changes to saveTaskDynamicResource
      return skillParams.taskParams.dbFilestoreMgr.saveTaskDynamicResource(skillParams.taskParams,JSON.stringify(initialConfig),"InitialConfig.json").then( (resolvePath)=>{
        var preloadResArr = [];
        var finalPath = resolvePath
        preloadResArr.push({ "path": "" + finalPath, "type": "json" })
        var resolveParams = { "attrValue": finalPath, "preloadResArr": preloadResArr }

        return Promise.resolve(resolveParams);
      });
  }
  // It populates a json object which is further used for final attribute validations
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
      return validationConfig;
  }

  // Below function are used to check whether particular datatype exist in the populated json to create final attributes fro the same.
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
  // This fucntion is called for each type of DB Object and returns attribute values for each of them
  checkIfObjectExist(skillParams,objType){
    let paramValueObj = skillParams.paramsObj;
    let resolveParams;
    let self = this;
    if(this.projJSON[objType]){
      // It is not made and stringified as there are no comma between file names in attr value..
      let finalString = "[";
      for(let index=0;index<this.projJSON[objType].length;index++){
        finalString+=this.projJSON[objType][index];
      }
      finalString+="]";
      resolveParams = { "attrValue": finalString};
    }
    else{
      resolveParams = { "attrValue": null};
    }
    return Promise.resolve(resolveParams);
  }
  //This function returns the type of the DB object to be shown selecetd in the final state.
  getFinalSelectedObjectType(skillParams){
    var resolveParams;
    var paramValueObj = skillParams.paramsObj;
    if(paramValueObj.skillmode == "2"){
      resolveParams = { "attrValue":"Tables"};
      return Promise.resolve(resolveParams);
    }
    else{
      return this.getSelectedDBObjectType(skillParams);
    } 
  }
  //This function returns the name of the DB object to be shown selecetd in the final state.
  getFinalSelectedObject(skillParams){
    var paramValueObj = skillParams.paramsObj;
    var resolveParams = { "attrValue":paramValueObj.skillmode};
    if(paramValueObj.skillmode == "2"){
      return this.getLastTableSelected(skillParams);
    }
    else{
      return this.getSelectedDBObjectName(skillParams); 
    } 
  }
  // This function returns the name of the last table selected if mode of import is Linked table
  getLastTableSelected(skillParams){
    let paramValueObj = skillParams.paramsObj;
    let resolveParams;
    let self = this;
    let tableObj = this.projJSON["tables"];
    resolveParams = { "attrValue": tableObj[tableObj.length-1]};
    return Promise.resolve(resolveParams);
  }
}
module.exports = importAccessobject;
