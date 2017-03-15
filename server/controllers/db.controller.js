const skillConfigRepoModel = require('../models/skillConfigRepoModel').skill_config_repo;
const taskStepUIModel = require('../models/taskStepUIModel').taskStepUIModel;

module.exports.getUIConfigPath = function(templateId, callback) {
    getFilePath(templateId, 'ui_config_path', callback);
};

module.exports.getSkillXMLPath = function(templateId, callback) {
    getFilePath(templateId, 'skill_xml_path', callback);
};

module.exports.getIOMapPath = function(templateId, callback) {
    getFilePath(templateId, 'io_map_path', callback);
};

module.exports.getSkillModelPath = function(templateId, callback) {
    getFilePath(templateId, 'data_model_path', callback);
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

function getFilePath(templateId, fileKey, callback) {
    let filterCriteria = {"_id": false};
    filterCriteria[fileKey] = true;

    skillConfigRepoModel.getFilePath({"template_id": templateId}, filterCriteria, (error, data) => {
        callback(data[0][fileKey], error);
    });
}