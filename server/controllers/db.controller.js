const skillConfigRepoModel = require('../models/skillConfigRepo.model').skill_config_repo;
const taskStepUIModel = require('../models/taskStepUI.model').taskStepUIModel;

class DatabaseController {
    
    getUIConfigPath(templateId, callback) {
        DatabaseController.getFilePath(templateId, 'ui_config_path', callback);
    }

    getSkillXMLPath(templateId, callback) {
        DatabaseController.getFilePath(templateId, 'skill_xml_path', callback);
    }

    getIOMapPath(templateId, callback) {
        DatabaseController.getFilePath(templateId, 'io_map_path', callback);
    }

    getSkillModelPath(templateId, callback) {
        DatabaseController.getFilePath(templateId, 'data_model_path', callback);
    }

    getStepUIState(taskId, stepIndex, callback) {
        let condition = {"task_id": taskId};
        let jsonKey = "task_data.step_" + stepIndex;
        let map = {"_id": false};
        map[jsonKey] = true;

        taskStepUIModel.getStepUI(condition, map, (error, data) => {
            callback(data, error);
        });
    }

    saveStepUIState(taskId, stepIndex, stepUIData, callback) {
        let updateCriteria = {"task_id": taskId};
        let jsonKey = "task_data.step_" + stepIndex;
        let updateData = { $set: {}};
        updateData.$set[jsonKey] = stepUIData;
        let options = { upsert: true };

        taskStepUIModel.updateStepUIData(updateCriteria, updateData, options, (error, success) => {
            callback(error, success);
        });
    }

    static getFilePath(templateId, fileKey, callback) {
        let filterCriteria = {"_id": false};
        filterCriteria[fileKey] = true;

        skillConfigRepoModel.getFilePath({"template_id": templateId}, filterCriteria, (error, data) => {
            callback(data[0][fileKey], error);
        });
    }
}

module.exports = new DatabaseController();