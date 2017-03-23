const skillConfigRepoModel = require('../models/skillConfigRepo.model').skill_config_repo;
const uiTaskStepModel = require('../models/uiTaskStep.model').uiTaskStepModel;

class DatabaseController {

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

    getSkillConfigFilePath(templateId, fileKey, callback) {
        let filterCriteria = {"_id": false};
        filterCriteria[fileKey] = true;

        skillConfigRepoModel.getFilePath({"template_id": templateId}, filterCriteria, (error, data) => {
            callback(data[0][fileKey], error);
        });
    }
}

module.exports = new DatabaseController();