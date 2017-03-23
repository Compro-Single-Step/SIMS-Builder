const skillConfigRepoModel = require('../models/skillConfigRepo.model').skill_config_repo;
const uiTaskStepModel = require('../models/uiTaskStep.model').uiTaskStepModel;

class DatabaseController {
    
    getUIConfigPath(templateId) {
        return DatabaseController.getFilePath(templateId, 'ui_config_path');
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

        uiTaskStepModel.getStepUI(condition, map, (error, data) => {
            let stepId = "step_" + stepIndex;
            let stepUIState = data[0]._doc.task_data[stepId];
            callback(error, stepUIState);
        });
    }

    saveStepUIState(taskId, stepIndex, stepUIData, callback) {
        let updateCriteria = {"task_id": taskId};
        let jsonKey = "task_data.step_" + stepIndex;
        let updateData = { $set: {}};
        updateData.$set[jsonKey] = stepUIData;
        let options = { upsert: true };

        uiTaskStepModel.updateStepUIData(updateCriteria, updateData, options, (error, success) => {
            callback(error, success);
        });
    }

    static getFilePath(templateId, fileKey) {
        return new Promise((resolve, reject)=> {
            let filterCriteria = {"_id": false};
            filterCriteria[fileKey] = true;

            skillConfigRepoModel.getFilePath({"template_id": templateId}, filterCriteria, (error, data) => {
                if(error) {
                    reject(error);
                }
                else {
                    resolve(data[0][fileKey])
                }
            });
        });
    }
}

module.exports = new DatabaseController();