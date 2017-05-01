module.exports = class BaseSkill {
  
  /**
   * function for some processing which is required for IO Map translation of all the applications
   * @param {*} data : an object of values having certain data to be used
   */
  init (data){
    // returning empty promise
    // equivalent to do nothing
    return Promise.resolve(true);
  }
  
  // This is the function of the TaskBar tooltip image path
  createTooltipImagePath(skillParams) {

    var taskParams = skillParams.taskParams;
    var paramValueObj = skillParams.paramsObj;
    return taskParams.dbFilestoreMgr.copyTaskAssetFile(paramValueObj["tbPrvImage"], taskParams)
      .then(function (resolveParam) {
        var preloadResArr = [];
        preloadResArr.push({ "path": "" + resolveParam.filePath, "type": resolveParam.fileType });
        var resolveParams = { "attrValue": resolveParam.filePath, "preloadResArr": preloadResArr };
        return Promise.resolve(resolveParams);
      }, function (error) {
        return Promise.reject(error);
      });
  }

  extractSingleParamVal(skillParams) {

    var paramValueObj = skillParams.paramsObj;
    var resolveParam = { "attrValue": paramValueObj[Object.keys(paramValueObj)[0]] };
    return Promise.resolve(resolveParam);

  }
  extractAttrPath(skillParams){  //Use this function instead of createTooltipImagePath for tooltip in next iteration of Move Cell Content 
      var taskParams = skillParams.taskParams;
      var paramValueObj = skillParams.paramsObj;
      if(paramValueObj[Object.keys(paramValueObj)[0]] != "")
      {
        return taskParams.dbFilestoreMgr.copyTaskAssetFile(paramValueObj[Object.keys(paramValueObj)[0]], taskParams)
          .then(function (resolveParam) {
            var preloadResArr = [];
            preloadResArr.push({ "path": "" + resolveParam.filePath, "type": resolveParam.fileType });
            var resolveParams = { "attrValue": resolveParam.filePath, "preloadResArr": preloadResArr };
            return Promise.resolve(resolveParams);
          }, function (error) {
            return Promise.reject(error);
          });
      }
      else{
        var resolveParams = { "attrValue": "" };
        return Promise.resolve(resolveParams);
      }
  }
}