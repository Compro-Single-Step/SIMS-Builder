//const skillController = require('./skillController');
const skillConfigRepoModel = require('../molels/skillConfigRepoModel').skill_config_repo;
const taskStepUIModel = require('../molels/taskStepUIModel').taskStepUIModel;

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

module.exports.getStepUIState = function(taskId, stateIndex, callback) {
    let condition = {"task_id": taskId};
    let jsonKey = "task_data.step_" + stateIndex;
    let map = {"_id": false};
    map[jsonKey] = true;

    taskStepUIModel.getStepUI(condition, map, (error, data) => {
        callback(data, error);
    });
};

function getFilePath(templateId, callback) {
    skillConfigRepoModel.getFilesPathArray({"template_id": templateId}, {"_id": false}, (error, data) => {
        if(!error && data !== null) {
            data.success = true;
        }
        callback(data, error);
    });
}