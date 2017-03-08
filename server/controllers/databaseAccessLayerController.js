//const skillController = require('./skillController');
const skillConfigRepoModel = require('../molels/skillConfigRepoModel').skill_config_repo;

module.exports.getUIConfigPath = function(templateId, callback) {
    getFilePath(templateId, callback);
};

module.exports.getSkillXMLPath = function(templateId, callback) {
    getFilePath(templateId, callback);
};

module.exports.getIOMapPath = function(templateId, callback) {
    getFilePath(templateId, callback);
};

module.exports.getSkillModelPath = function(templateId, callback) {
    getFilePath(templateId, callback);
};

function getFilePath(templateId, callback) {
    skillConfigRepoModel.getFilesPathArray({"template_id": templateId}, {"_id": false}, (error, data) => {
        if(!error && data !== null) {
            data.success = true;
        }
        callback(data, error);
    });
}