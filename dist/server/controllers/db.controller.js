const skillConfigRepoModel = require('../models/skillConfigRepo.model').skillConfigRepo;
const uiTaskStepModel = require('../models/uiTaskStep.model').uiTaskStepModel;

class DatabaseController {

    getStepUIState(taskId, stepIndex) {
        return uiTaskStepModel.getStepUI(taskId, stepIndex);
    }

    saveStepUIState(taskId, stepIndex, stepUIData) {
        return uiTaskStepModel.updateStepUIData(taskId, stepIndex, stepUIData);
    }

    getSkillConfigPath(templateId, configType) {
        return skillConfigRepoModel.getSkillConfigPath(templateId, configType);
    }
}
module.exports = new DatabaseController();