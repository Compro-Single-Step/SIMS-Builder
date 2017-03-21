const dbController = require('../../controllers/db.controller');
const fileStoreController = require('../../controllers/filestore.controller');

class DatabaseFileStoreManager {
    getUIConfig(templateId, callback) {
        dbController.getUIConfigPath(templateId, (filePath, error) => {
            if(!error) {
                fileStoreController.getUIConfig(filePath, callback);
            }
            else {
                callback(error);
            }
        });
    }

    getSkillXML(templateId, callback) {
        dbController.getSkillXMLPath(templateId, (filePath, error) => {
            if(!error) {
                fileStoreController.getSkillXML(filePath, callback);
            }
            else {
                callback(error);
            }
        });
    }

    getIOMap(templateId, callback) {
        dbController.getIOMapPath(templateId, (filePath, error) => {
            if(!error) {
                fileStoreController.getIOMap(filePath, callback);
            }
            else {
                callback(error);
            }
        });
    }

    getSkillModel(templateId, callback) {
        dbController.getSkillModelPath(templateId, (filePath, error) => {
            if(!error) {
                fileStoreController.getSkillModel(filePath, callback);
            }
            else {
                callback(error);
            }
        });
    }

    getStepUIState(taskId, stepIndex, callback) {
        dbController.getStepUIState(taskId, stepIndex, (data, error) => {
            callback(data, error);
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