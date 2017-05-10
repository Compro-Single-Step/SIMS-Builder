var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

module.exports = function () {
  function BaseSkill() {
    _classCallCheck(this, BaseSkill);
  }

  _createClass(BaseSkill, [{
    key: "init",


    /**
     * function for some processing which is required for IO Map translation of all the applications
     * @param {*} data : an object of values having certain data to be used
     */
    value: function init(data) {
      // returning empty promise
      // equivalent to do nothing
      return Promise.resolve(true);
    }

    // This is the function of the TaskBar tooltip image path

  }, {
    key: "createTooltipImagePath",
    value: function createTooltipImagePath(skillParams) {

      var taskParams = skillParams.taskParams;
      var paramValueObj = skillParams.paramsObj;
      return taskParams.dbFilestoreMgr.copyTaskAssetFile(paramValueObj["tbPrvImage"], taskParams).then(function (resolveParam) {
        var preloadResArr = [];
        preloadResArr.push({ "path": "" + resolveParam.filePath, "type": resolveParam.fileType });
        var resolveParams = { "attrValue": resolveParam.filePath, "preloadResArr": preloadResArr };
        return Promise.resolve(resolveParams);
      }, function (error) {
        return Promise.reject(error);
      });
    }
  }, {
    key: "extractSingleParamVal",
    value: function extractSingleParamVal(skillParams) {

      var paramValueObj = skillParams.paramsObj;
      var resolveParam = { "attrValue": paramValueObj[Object.keys(paramValueObj)[0]] };
      return Promise.resolve(resolveParam);
    }
  }]);

  return BaseSkill;
}();