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
  
    /**
 * fnality
 * function takes the path of the taskkbar preview image and moves the image resource and returns its new path
 */
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

     /**
 * if any attribute is not given any function value then this function is called 
 * it takes the value fo the first key in the params value and returns its value as the resolveParam
 */

  extractSingleParamVal(skillParams) {

    var paramValueObj = skillParams.paramsObj;
    var resolveParam = { "attrValue": paramValueObj[Object.keys(paramValueObj)[0]] };
    return Promise.resolve(resolveParam);

  }

  getSubribbon(skillParams) {
    var skillParamsObj = skillParams.skillParamsObj;
    var pathArray = [
      {
        "path": skillParamsObj["subribbonPath"],
        "resourceType": "skill",
        "addToPreload": "false"
      },
      {
        "path": skillParamsObj["subribbonPath_1024"],
        "resourceType": "skill",
        "addToPreload": "false"
      }
    ];
    let attrValue = skillParams.taskParams.addResourceToMap(pathArray)[0]["absFilePath"];
    return Promise.resolve({ attrValue });
  }
}