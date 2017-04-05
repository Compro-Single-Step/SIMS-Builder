
var sheetNameMap = {};

class BaseSkill{
    // This is the function of the TaskBar tooltip image path
    createTooltipImagePath(skillParams, callback){
            
      var taskParams = skillParams.taskParams;
      var paramValueObj = skillParams.paramsObj;
      taskParams.dbFilestoreMgr.copyTaskAssetFile(paramValueObj["tbPrvImage"].path, taskParams, function(error, xmlPath, fileType){
           var preloadResArr = [];
           preloadResArr.push({"path":"" + xmlPath,"type":"img"});
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

    getSheetNameMap(initDocJSonPath, skillParams, callback){
        var taskParams = skillParams.taskParams;
        if(Object.keys(sheetNameMap) == 0){
          taskParams.dbFilestoreMgr.readFileFromFileStore(initDocJSonPath, function(error, initDocJson){
              if(!error){
                initDocJson = JSON.parse(initDocJson);
                for(var index = 0; index < initDocJson.sheets.length; ++index){
                  sheetNameMap[initDocJson.sheets[index].name] = (index+1);
                }
                callback(null, sheetNameMap);
              }
              else{
                callback(error);
              }
          });
        }
          else{
            callback(null, sheetNameMap);
          }  
      
    }

}

module.exports.BaseSkill = BaseSkill;
module.exports.sheetNameMap = sheetNameMap;