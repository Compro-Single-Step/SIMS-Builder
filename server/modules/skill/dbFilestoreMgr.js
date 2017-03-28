const dbController = require('../../controllers/db.controller');
const fileStoreController = require('../../controllers/filestore.controller');
const config = require('../../config/config');

class DatabaseFileStoreManager {
    getUIConfig(templateId, callback) {
        dbController.getSkillConfigPath(templateId, config.configType.UI_CONFIG, (filePath, error) => {
            if(!error) {
                fileStoreController.getFileFromFileStore(filePath, config.fileTypes.SKILL_CONFIG, callback);
            }
            else {
                callback(error);
            }
        });
    }
 
    getSkillXML(templateId, callback) {
        dbController.getSkillConfigPath(templateId, config.configType.XML, (filePath, error) => {
            if(!error) {
                fileStoreController.getFileFromFileStore(filePath, config.fileTypes.SKILL_CONFIG, callback);
            }
            else {
                callback(error);
            }
        });
    }

    getIOMap(templateId, callback) {
        dbController.getSkillConfigPath(templateId, config.configType.IO_MAP, (filePath, error) => {
            if(!error) {
                fileStoreController.getFileFromFileStore(filePath, config.fileTypes.SKILL_CONFIG, callback);
            }
            else {
                callback(error);
            }
        });
    }

    getSkillModel(templateId, callback) {
        dbController.getSkillConfigPath(templateId, config.configType.MODEL, (filePath, error) => {
            if(!error) {
                fileStoreController.getFileFromFileStore(filePath, config.fileTypes.SKILL_CONFIG, callback);
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