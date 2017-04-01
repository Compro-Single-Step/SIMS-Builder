module.exports = class baseSkill{
    // This is the function of the TaskBar tooltip image path
    createTooltipImagePath(skillParams, callback){
            
      var taskParams = skillParams.taskParams;
      var paramValueObj = skillParams.paramsObj;
      taskParams.dbFilestoreMgr.copyAssetFolderContents(paramValueObj["tbPrvImage"].path, taskParams.stepIndex,taskParams.taskId, function(error, newFilePath, fileType){
           var preloadResArr = [];
           preloadResArr.push({"path":"" + newFilePath,"type":"" + fileType});
          if(!error){
            callback(null, newFilePath, preloadResArr);
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