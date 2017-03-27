const multer = require('multer');
const mkdirp = require('mkdirp');

const uiHandler = require('../modules/skill/uiHandler');
const dbFilestoreMgr = require('../modules/skill/dbFilestoreMgr');
const xmlGenerationHandler = require('../modules/skill/xmlGenerationHandler');
const skillFactoryRef  = require("../modules/skill/skillFactory")

class SkillController {

    getStepUIConfig(templateId, taskId, stepIndex, callback) {
        uiHandler.getStepUIConfig(templateId, taskId, stepIndex, callback);
    }

    getUIConfig(templateId, callback) {
        dbFilestoreMgr.getUIConfig(templateId, callback);
    }

    getSkillModel(templateId, callback) {
        dbFilestoreMgr.getSkillModel(templateId, (error, skillModelData) => {
            if(!error) {
                callback(error, skillModelData);
            } else {
                callback(error);
            }
        });
    }

    getStepUIState(taskId, stepIndex, callback) {
        dbFilestoreMgr.getStepUIState(taskId, stepIndex, (error, skillModelData) => {
            if(!error) {
                callback(error, skillModelData);
            } else {
                callback(error);
            }
        });
    }

    saveStepUIState(taskId, stepIndex, stepUIData, callback) {
        dbFilestoreMgr.saveStepUIState(taskId, stepIndex, stepUIData, callback);
    }

    generateXML(templateId, taskId, stepIdx, callback) {
        var skillRef = skillFactoryRef.getSkillObjectRef(templateId)
        xmlGenerationHandler.generateStepXML(templateId, taskId, stepIdx, skillRef, callback);
    }

    saveResourceFile(templateId, taskId, stepIndex) {
        return dbFilestoreMgr.saveResourceFile(templateId, taskId, stepIndex);
    }
};

module.exports = new SkillController();


