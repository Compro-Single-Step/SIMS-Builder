const multer = require('multer');
const mkdirp = require('mkdirp');

const uiHandler = require('../modules/skill/uiHandler');
const dbFilestoreMgr = require('../modules/skill/dbFilestoreMgr');
const xmlGenerationHandler = require('../modules/skill/xmlGenerationHandler');

class SkillController {

    getUIConfig(templateId, taskId, stepIndex, callback) {
        return uiHandler.getUIConfig(templateId, taskId, stepIndex, callback);
    }

    saveStepUIState(taskId, stepIndex, stepUIData, callback) {
        dbFilestoreMgr.saveStepUIState(taskId, stepIndex, stepUIData, callback);
    }

    generateXML(templateId, taskId, stepIdx, callback) {
        xmlGenerationHandler.generateStepXML(templateId, taskId, stepIdx, callback);
    }

    saveResourceFile(templateId, taskId, stepIndex) {
        return dbFilestoreMgr.saveResourceFile(templateId, taskId, stepIndex);
    }
};

module.exports = new SkillController();


