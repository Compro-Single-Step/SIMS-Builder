const dbController = require('../../controllers/db.controller');
const FAL = require('../../controllers/filestore.controller');
const fsc = FAL.fileStoreController;
const skillConfigTypes = require('../../models/skillConfigRepo.model').skillConfigTypes;
const folderMap = FAL.fileTypeFolderMap;

class DatabaseFileStoreManager {
    getUIConfig(templateId) {
        return dbController.getSkillConfigPath(templateId, skillConfigTypes.UI_CONFIG)
        .then((filePath)=> {
            return fsc.getFileFromFileStore(filePath, folderMap.SKILL);
        }, (error)=> {
            Promise.reject(error);
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

    getSkillModel(templateId) {
        return dbController.getSkillConfigPath(templateId, skillConfigTypes.MODEL)
        .then((filePath)=> {
            return fsc.getFileFromFileStore(filePath, folderMap.SKILL);
        }, (error)=> {
            Promise.reject(error);
        });
    }

    getStepUIState(taskId, stepIndex) {
        return dbController.getStepUIState(taskId, stepIndex);
    }

    saveStepUIState(taskId, stepIndex, stepUIData) {
        return dbController.saveStepUIState(taskId, stepIndex, stepUIData);
    }

    saveStepXML(taskId, stepIndex, OutputXML, callback){
        fsc.saveStepXML(taskId, stepIndex, OutputXML, callback);
	}

    saveResourceFile(templateId, taskId, stepIndex, fileName) {
        return fsc.saveResourceFile(templateId, taskId, stepIndex, fileName);
    }
}

module.exports = new DatabaseFileStoreManager();