const dbController = require('../../controllers/db.controller');
const FAL = require('../../controllers/filestore.controller');
const fsc = FAL.fileStoreController;
const skillConfigTypes = require('../../models/skillConfigRepo.model').skillConfigTypes;
const folderMap = FAL.fileTypeFolderMap;

class DatabaseFileStoreManager {


    copyTaskAssetFile(residentPath, taskParams, callback){
        fsc.copyAssetToTaskFolder(residentPath, taskParams, callback);
    }
    
    copyAssetFolderContents(srcPath, stepIndex, taskId, callback){
        fsc.copyResToTaskFolder(srcPath, stepIndex, taskId, callback);
    }

    getUIConfig(templateId, callback) {
        dbController.getSkillConfigPath(templateId, skillConfigTypes.UI_CONFIG, (filePath, error) => {
            if(!error) {
                if(filePath !== undefined) {
                    fsc.getFileFromFileStore(filePath, folderMap.SKILL, callback);
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
                    fsc.getFileFromFileStore(filePath, folderMap.SKILL, callback);
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
                    fsc.getFileFromFileStore(filePath, folderMap.SKILL, callback);
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
                    fsc.getFileFromFileStore(filePath, folderMap.SKILL, callback);
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

    getSkillHelperFile(filePath, callback) {
        return fsc.getFileFromFileStoreEnhanced(filePath);
    }

    saveStepUIState(taskId, stepIndex, stepUIData, callback) {
        dbController.saveStepUIState(taskId, stepIndex, stepUIData, (error, data) => {
            callback(error, data);
        });
    }

    saveStepXML(taskId, stepIndex, OutputXML, callback){
        fsc.saveStepXML(taskId, stepIndex, OutputXML, callback);
	}

    saveResourceFile() {
        return fsc.saveResourceFile();
    }
}

module.exports = new DatabaseFileStoreManager();