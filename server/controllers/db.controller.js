const skillConfigRepoModel = require('../models/skillConfigRepo.model').skill_config_repo;
const uiTaskStepModel = require('../models/uiTaskStep.model').uiTaskStepModel;

class DatabaseController {

    getStepUIState(taskId, stepIndex, callback) {
        uiTaskStepModel.getStepUI(taskId, stepIndex, callback);
    }

    saveStepUIState(taskId, stepIndex, stepUIData, callback) {
        let condition = {"task_id": taskId};
        let jsonKey = "task_data.step_" + stepIndex;
        let updateData = { $set: {}};
        updateData.$set[jsonKey] = stepUIData;
        let options = { upsert: true };

        uiTaskStepModel.updateStepUIData(condition, updateData, options, (error, success) => {
            callback(error, success);
        });
    }

    getSkillConfigPath(templateId, configType, callback) {
        skillConfigRepoModel.getSkillConfigPath(templateId, configType, callback);
    }
}

module.exports = new DatabaseController();