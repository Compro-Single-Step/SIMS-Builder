const BaseSkill = require("../../common/baseSkill");
const xmlUtil = require("../../../../utils/xmlUtil");

module.exports = class PPTBaseSkill extends BaseSkill {
    init(data) {
        var self = this;
        var initDocJSonPath = data.initDocJSonPath;
        var dbMgr = data.dbMgr;


    return dbMgr.readFileFromFileStore(initDocJSonPath).then(function (resolveParam) {

            self.initDocJson = JSON.parse(resolveParam.fileData);
            self.generateSheetNamesMap();
            return Promise.resolve(true);

        }, function (error) {
            return Promise.reject(error)
        });
    }
}
