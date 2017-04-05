const multer = require('multer');
const mkdirp = require('mkdirp');

const uiHandler = require('../modules/skill/uiHandler');
const dbFilestoreMgr = require('../modules/skill/dbFilestoreMgr');
const xmlGenerationHandler = require('../modules/skill/xmlGenerationHandler');
const skillFactory  = require("../modules/skill/skillFactory")

class SkillController {

    getStepUIConfig(templateId, taskId, stepIndex, callback) {
        uiHandler.getStepUIConfig(templateId, taskId, stepIndex, callback);
    }
    //will rename this function after meeting feedback.
    getUIConfig(templateId, callback) {
        dbFilestoreMgr.getUIConfig(templateId, callback);
    }

    getSkillModel(templateId, callback) {
        dbFilestoreMgr.getSkillModel(templateId, callback);
    }

    getStepUIState(taskId, stepIndex, callback) {
        dbFilestoreMgr.getStepUIState(taskId, stepIndex, callback);
    }

    saveStepUIState(taskId, stepIndex, stepUIData, callback) {
        dbFilestoreMgr.saveStepUIState(taskId, stepIndex, stepUIData, callback);
    }

    generateXML(templateId, taskId, stepIdx, callback) {
        var skill = skillFactory.getSkillObject(templateId);
        xmlGenerationHandler.generateStepXML(templateId, taskId, stepIdx, skill, callback);
    }

    saveResourceFile() {
        return dbFilestoreMgr.saveResourceFile();
    }
};

module.exports = new SkillController();


