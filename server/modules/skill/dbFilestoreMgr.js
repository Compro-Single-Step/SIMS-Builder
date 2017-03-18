const dbControllerObj = require('../../controllers/db.controller');
const fileStoreControllerObj = require('../../controllers/filestore.controller');

class DatabaseFileStoreManager {
    getUIConfig(templateId, callback) {
        dbControllerObj.getUIConfigPath(templateId, (filePath, error) => {
            if(!error) {
                fileStoreControllerObj.getUIConfig(filePath, callback);
            }
            else {
                callback(error);
            }
        });
    }

    getSkillXML(templateId, callback) {
        dbControllerObj.getSkillXMLPath(templateId, (filePath, error) => {
            if(!error) {
                fileStoreControllerObj.getSkillXML(filePath, callback);
            }
            else {
                callback(error);
            }
        });
    }

    getIOMap(templateId, callback) {
        dbControllerObj.getIOMapPath(templateId, (filePath, error) => {
            if(!error) {
                fileStoreControllerObj.getIOMap(filePath, callback);
            }
            else {
                callback(error);
            }
        });
    }

    getSkillModel(templateId, callback) {
        dbControllerObj.getSkillModelPath(templateId, (filePath, error) => {
            if(!error) {
                fileStoreControllerObj.getSkillModel(filePath, callback);
            }
            else {
                callback(error);
            }
        });
    }

    getStepUIState(taskId, stepIndex, callback) {
        dbControllerObj.getStepUIState(taskId, stepIndex, (data, error) => {
            callback(data, error);
        });
    }

    saveStepUIState(taskId, stepIndex, stepUIData, callback) {
        dbControllerObj.saveStepUIState(taskId, stepIndex, stepUIData, (data, error) => {
            callback(data, error);
        });
    }

    saveResourceFile(templateId, taskId, stepIndex, fileName) {
        return fileStoreControllerObj.saveResourceFile(templateId, taskId, stepIndex, fileName);
    }
}

module.exports = new DatabaseFileStoreManager();