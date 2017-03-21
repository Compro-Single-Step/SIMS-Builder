const multer = require('multer');
const mkdirp = require('mkdirp');

const uiHandler = require('../modules/skill/uiHandler');
const dbFilestoreMgr = require('../modules/skill/dbFilestoreMgr');
const xmlGenerationHandler = require('../modules/skill/xmlGenerationHandler');
const skillFactory  = require("../modules/skill/skillFactory")

class SkillController {

    getUIConfig(templateId, taskId, stepIndex, callback) {
        return uiHandler.getUIConfig(templateId, taskId, stepIndex, callback);
    }

    saveStepUIState(taskId, stepIndex, stepUIData, callback) {
        dbFilestoreMgr.saveStepUIState(taskId, stepIndex, stepUIData, callback);
    }

    generateXML(templateId, taskId, stepIdx, callback) {
        var skillFactoryRef = new skillFactory();
        var skillRef = skillFactoryRef.getSkillObjectRef(templateId)
        xmlGenerationHandler.generateStepXML(templateId, taskId, stepIdx, skillRef, callback);
    }

    saveResourceFile(templateId, taskId, stepIndex) {
        return dbFilestoreMgr.saveResourceFile(templateId, taskId, stepIndex);
    }

    getSkillFiles(templateId, callback){
        let skillFilesObject = {},
            skillFactoryRef = new skillFactory();

        skillFilesObject["skill"] = skillFactoryRef.getSkillObjectRef(templateId);
        skillFilesObject["comps"] = skillFactoryRef.getCompsRef(templateId);

        callback(null, skillFilesObject);
    }
};

module.exports = new SkillController();


