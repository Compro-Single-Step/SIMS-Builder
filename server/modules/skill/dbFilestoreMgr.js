const dbController = require('../../controllers/db.controller');
const fileStoreController = require('../../controllers/filestore.controller');

class DatabaseFileStoreManager {
    getUIConfig(templateId, callback) {
        dbController.getSkillConfigFilePath(templateId, 'ui_config_path', (filePath, error) => {
            if(!error) {
                fileStoreController.getUIConfig(filePath, callback);
            }
            else {
                callback(error);
            }
        });
    }

    getSkillXML(templateId, callback) {
        dbController.getSkillConfigFilePath(templateId, 'skill_xml_path', (filePath, error) => {
            if(!error) {
                fileStoreController.getSkillXML(filePath, callback);
            }
            else {
                callback(error);
            }
        });
    }

    getIOMap(templateId, callback) {
        dbController.getSkillConfigFilePath(templateId, 'io_map_path', (filePath, error) => {
            if(!error) {
                fileStoreController.getIOMap(filePath, callback);
            }
            else {
                callback(error);
            }
        });
    }

    getSkillModel(templateId, callback) {
        dbController.getSkillConfigFilePath(templateId, 'data_model_path', (filePath, error) => {
            if(!error) {
                fileStoreController.getSkillModel(filePath, callback);
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