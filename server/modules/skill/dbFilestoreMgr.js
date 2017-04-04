const dbController = require('../../controllers/db.controller');
const FAL = require('../../controllers/filestore.controller');
const fsc = FAL.fileStoreController;
const skillConfigTypes = require('../../models/skillConfigRepo.model').skillConfigTypes;
const folderMap = FAL.fileTypeFolderMap;

class DatabaseFileStoreManager {
    getUIConfig(templateId) {
        return dbController.getSkillConfigPath(templateId, skillConfigTypes.UI_CONFIG)
        .then((filePath)=> {
            if(filePath === undefined || filePath === null) {
                Promise.reject("Skill Config for template id " + templateId + " doesn't exist in database");
            }
            else {
                return fsc.getFileFromFileStore(filePath, folderMap.SKILL);
            }
        }, (error)=> {
            Promise.reject(error);
        });
    }
 
    getSkillXML(templateId) {
        return dbController.getSkillConfigPath(templateId, skillConfigTypes.XML)
        .then((filePath)=> {
            if(filePath === undefined || filePath === null) {
                Promise.reject("Skill XML for template id "+ templateId + " doesn't exist in database");
            }
            else {
                return fsc.getFileFromFileStore(filePath, folderMap.SKILL);
            }
        }, (error)=> {
            Promise.reject(error);
        });
    }

    getIOMap(templateId) {
        return dbController.getSkillConfigPath(templateId, skillConfigTypes.IO_MAP)
        .then((filePath)=> {
            if(filePath === undefined || filePath === null) {
                Promise.reject("I/O Map for template id "+ templateId + " doesn't exist in database");
            }
            else {
                return fsc.getFileFromFileStore(filePath, folderMap.SKILL);
            }
        }, (error)=> {
            Promise.reject(error);
        });
    }

    getSkillModel(templateId) {
        return dbController.getSkillConfigPath(templateId, skillConfigTypes.MODEL)
        .then((filePath)=> {
            if(filePath === undefined || filePath === null) {
                Promise.reject("Skill Model for template id "+ templateId + " doesn't exist in database");
            }
            else {
                return fsc.getFileFromFileStore(filePath, folderMap.SKILL);
            }
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

    saveStepXML(taskId, stepIndex, OutputXML){
        return fsc.saveStepXML(taskId, stepIndex, OutputXML);
	}

    saveResourceFile() {
        return fsc.saveResourceFile();
    }
}

module.exports = new DatabaseFileStoreManager();