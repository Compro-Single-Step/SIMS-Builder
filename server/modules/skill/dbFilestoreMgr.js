const dbController = require('../../controllers/db.controller');
const fileStoreController = require('../../controllers/filestore.controller');
const fileStoreObj = fileStoreController.fileStoreObj;
const skillConfigTypes = require('../../models/skillConfigRepo.model').skillConfigTypes;
const folderMap = fileStoreController.fileTypeFolderMap;

class DatabaseFileStoreManager {
    getUIConfig(templateId, callback) {
        dbController.getSkillConfigPath(templateId, skillConfigTypes.UI_CONFIG, (filePath, error) => {
            if(!error) {
                if(filePath !== undefined) {
                    fileStoreObj.getFileFromFileStore(filePath, folderMap.SKILL, callback);
                }
                else {
                    callback({error: "UI Config doesn't exist in database"});    
                }
            }
            else {
                callback(error);
            }
        });
    }
 
    getSkillXML(templateId, callback) {
        dbController.getSkillConfigPath(templateId, skillConfigTypes.XML, (filePath, error) => {
            if(!error) {
                if(filePath !== undefined) {
                    fileStoreObj.getFileFromFileStore(filePath, folderMap.SKILL, callback);
                }
                else {
                    callback({error: "Skill XML doesn't exist in database"});    
                }
            }
            else {
                callback(error);
            }
        });
    }

    getIOMap(templateId, callback) {
        dbController.getSkillConfigPath(templateId, skillConfigTypes.IO_MAP, (filePath, error) => {
            if(!error) {
                if(filePath !== undefined) {
                    fileStoreObj.getFileFromFileStore(filePath, folderMap.SKILL, callback);
                }
                else {
                    callback({error: "IO Map doesn't exist in database"});    
                }
            }
            else {
                callback(error);
            }
        });
    }

    getSkillModel(templateId, callback) {
        dbController.getSkillConfigPath(templateId, skillConfigTypes.MODEL, (filePath, error) => {
            if(!error) {
                if(filePath !== undefined) {
                    fileStoreObj.getFileFromFileStore(filePath, folderMap.SKILL, callback);
                }
                else {
                    callback({error: "Model doesn't exist in database"});    
                }
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
        fileStoreObj.saveStepXML(taskId, stepIndex, OutputXML, callback);
	}

    saveResourceFile(templateId, taskId, stepIndex, fileName) {
        return fileStoreObj.saveResourceFile(templateId, taskId, stepIndex, fileName);
    }
}

module.exports = new DatabaseFileStoreManager();