const uiHandlerObj = require('../modules/skill/uiHandler');
const dbFilestoreMgrObj = require('../modules/skill/dbFilestoreMgr');
const xmlGenerationHandler = require('../modules/skill/xmlGenerationHandler');

class SkillController {

    getUIConfig(templateId, data, callback) {
        return uiHandlerObj.getUIConfig(templateId, data, callback);
    }

    saveStepUIState(taskId, stepIndex, stepUIData, callback) {
        dbFilestoreMgrObj.saveStepUIState(taskId, stepIndex, stepUIData, callback);
    }

    generateXML(templateId, taskId, stepIdx, callback) {
        xmlGenerationHandler.generateStepXML(templateId, taskId, stepIdx, callback);
    }
};

module.exports = new SkillController();


