const dbController = require('../../controllers/db.controller');
const fileStoreController = require('../../controllers/filestore.controller');
const constants = require('../../config/constants.config');

class DatabaseFileStoreManager {
    getUIConfig(templateId, callback) {
        dbController.getSkillConfigPath(templateId, constants.skillConfigType.UI_CONFIG, (filePath, error) => {
            if(!error) {
                fileStoreController.getFileFromFileStore(filePath, constants.fileTypes.SKILL_CONFIG, callback);
            }
            else {
                callback(error);
            }
        });
    }
 
    getSkillXML(templateId, callback) {
        dbController.getSkillConfigPath(templateId, constants.skillConfigType.XML, (filePath, error) => {
            if(!error) {
                fileStoreController.getFileFromFileStore(filePath, constants.fileTypes.SKILL_CONFIG, callback);
            }
            else {
                callback(error);
            }
        });
    }

    getIOMap(templateId, callback) {
        dbController.getSkillConfigPath(templateId, constants.skillConfigType.IO_MAP, (filePath, error) => {
            if(!error) {
                fileStoreController.getFileFromFileStore(filePath, constants.fileTypes.SKILL_CONFIG, callback);
            }
            else {
                callback(error);
            }
        });
    }

    getSkillModel(templateId, callback) {
        dbController.getSkillConfigPath(templateId, constants.skillConfigType.MODEL, (filePath, error) => {
            if(!error) {
                fileStoreController.getFileFromFileStore(filePath, constants.fileTypes.SKILL_CONFIG, callback);
            }
            else {
                callback(error);
            }
        });
    }

    getStepUIState(taskId, stepIndex, callback) {
        dbController.getStepUIState(taskId, stepIndex, (error, data) => {
            callback(error, data);
        });
    }

    saveStepUIState(taskId, stepIndex, stepUIData, callback) {
        dbController.saveStepUIState(taskId, stepIndex, stepUIData, (error, data) => {
            callback(error, data);
        });
    }

    saveStepXML(taskId, stepIndex, OutputXML, callback){
        fileStoreController.saveStepXML(taskId, stepIndex, OutputXML, callback);
	}

    saveResourceFile(templateId, taskId, stepIndex, fileName) {
        return fileStoreController.saveResourceFile(templateId, taskId, stepIndex, fileName);
    }
}

module.exports = new DatabaseFileStoreManager();