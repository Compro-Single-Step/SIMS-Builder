const multer = require('multer');
const mkdirp = require('mkdirp');

const uiHandler = require('../modules/skill/uiHandler');
const dbFilestoreMgr = require('../modules/skill/dbFilestoreMgr');
const xmlGenerationHandler = require('../modules/skill/xmlGenerationHandler');
const skillFactory  = require("../modules/skill/skillFactory")

class SkillController {

    getStepUIConfig(templateId, taskId, stepIndex) {
        return uiHandler.getStepUIConfig(templateId, taskId, stepIndex);
    }
    //will rename this function after meeting feedback.
    getUIConfig(templateId) {
        return dbFilestoreMgr.getUIConfig(templateId);
    }

    getSkillModel(templateId) {
        return dbFilestoreMgr.getSkillModel(templateId);
    }

    getStepUIState(taskId, stepIndex) {
        return dbFilestoreMgr.getStepUIState(taskId, stepIndex);
    }

    saveStepUIState(taskId, stepIndex, stepUIData) {
        return dbFilestoreMgr.saveStepUIState(taskId, stepIndex, stepUIData);
    }

    generateXML(templateId, taskId, stepIdx, callback) {
        var skillFactoryRef = new skillFactory();
        var skillRef = skillFactoryRef.getSkillObjectRef(templateId)
        xmlGenerationHandler.generateStepXML(templateId, taskId, stepIdx, skillRef, callback);
    }

    saveResourceFile(templateId, taskId, stepIndex) {
        return dbFilestoreMgr.saveResourceFile(templateId, taskId, stepIndex);
    }
};

module.exports = new SkillController();


