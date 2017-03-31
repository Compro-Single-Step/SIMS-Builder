const skillConfigRepoModel = require('../models/skillConfigRepo.model').skillConfigRepo;
const uiTaskStepModel = require('../models/uiTaskStep.model').uiTaskStepModel;

class DatabaseController {

    getStepUIState(taskId, stepIndex, callback) {
        uiTaskStepModel.getStepUI(taskId, stepIndex, callback);
    }

    saveStepUIState(taskId, stepIndex, stepUIData, callback) {
        uiTaskStepModel.updateStepUIData(taskId, stepIndex, stepUIData, callback);
    }

    getSkillConfigPath(templateId, configType, callback) {
        skillConfigRepoModel.getSkillConfigPath(templateId, configType, callback);
    }
}

module.exports = new DatabaseController();