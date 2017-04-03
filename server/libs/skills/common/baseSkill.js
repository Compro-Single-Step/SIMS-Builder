module.exports = class baseSkill{
    // This is the function of the TaskBar tooltip image path
    createTooltipImagePath(skillParams, callback){
            
      var taskParams = skillParams.taskParams;
      var paramValueObj = skillParams.paramsObj;
      taskParams.dbFilestoreMgr.copyTaskAssetFile(paramValueObj["tbPrvImage"].path, taskParams, function(error, xmlPath, fileType){
           var preloadResArr = [];
           preloadResArr.push({"path":"" + xmlPath,"type":"" + fileType});
          if(!error){
            callback(null, xmlPath, preloadResArr);
          }
          else{
            callback(error);
          }
      })
      
  }
  
    extractSingleParamVal(skillParams, callback){

      var paramValueObj = skillParams.paramsObj;
        callback(null,paramValueObj[Object.keys(paramValueObj)[0]]);
    }
}