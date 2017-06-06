const dbController = require('../../controllers/db.controller');
const FAL = require('../../controllers/filestore.controller');
const fsc = FAL.fileStoreController;
const skillConfigTypes = require('../../models/skillConfigRepo.model').skillConfigTypes;
const folderMap = FAL.fileTypeFolderMap;

class DatabaseFileStoreManager {

    //dynamic sheet num 
    readFileFromFileStore(filePath, readFileType) {
        return fsc.readTaskRes(filePath, readFileType);
    }

    copyTaskAssetFile(residentPath, taskParams) {
        //construct a promise in filestore controller and return that promise 
        // this function will as it is return the promise object whether it is resolved or rejected
        return fsc.copyAssetToTaskFolder(residentPath, taskParams);
    }

    /**
    * This function has beedn added to provide an enhanced fnality over copyTaskAssetFile
    * As part of enhanced functionality this fn will be able to copy skill psecifc resources also based on resourceType value in resourceMap
    *
    *
    *  todo: remove "copyTaskAssetFile" fn when all the templates start working as per new implementation
    *
    * This function calls the 'copyAssetToTaskFolderEnhanced' function of file store controller 
    * which copies the resource file from a source location to corresponding destination and 
    * returns the promise for same
    */
    copyTaskAssetFileEnhanced(sourceFileLocation, resourceMap, taskId, stepIndex) {
        //construct a promise in filestore controller and return that promise 
        // this function will as it is return the promise object whether it is resolved or rejected
        return fsc.copyAssetToTaskFolderEnhanced(sourceFileLocation, resourceMap, taskId, stepIndex);
    }

    getUIConfig(templateId) {
        return dbController.getSkillConfigPath(templateId, skillConfigTypes.UI_CONFIG).then(filePath => {
            if (filePath === undefined || filePath === null) {
                return Promise.reject(new Error("Skill Config for template id " + templateId + " doesn't exist in database"));
            } else {
                return fsc.getFileFromFileStore(filePath, folderMap.SKILL);
            }
        }, error => {
            return Promise.reject(error);
        });
    }

    getSkillXML(templateId) {
        return dbController.getSkillConfigPath(templateId, skillConfigTypes.XML).then(filePath => {
            if (filePath === undefined || filePath === null) {
                return Promise.reject(new Error("Skill XML for template id " + templateId + " doesn't exist in database"));
            } else {
                return fsc.getFileFromFileStore(filePath, folderMap.SKILL);
            }
        }, error => {
            return Promise.reject(error);
        });
    }

    getIOMap(templateId) {
        return dbController.getSkillConfigPath(templateId, skillConfigTypes.IO_MAP).then(filePath => {
            if (filePath === undefined || filePath === null) {
                return Promise.reject(new Error("I/O Map for template id " + templateId + " doesn't exist in database"));
            } else {
                return fsc.getFileFromFileStore(filePath, folderMap.SKILL);
            }
        }, error => {
            return Promise.reject(error);
        });
    }

    getSkillModel(templateId) {
        return dbController.getSkillConfigPath(templateId, skillConfigTypes.MODEL).then(filePath => {
            if (filePath === undefined || filePath === null) {
                return Promise.reject(new Error("Skill Model for template id " + templateId + " doesn't exist in database"));
            } else {
                return fsc.getFileFromFileStore(filePath, folderMap.SKILL);
            }
        }, error => {
            return Promise.reject(error);
        });
    }

    getStepUIState(taskId, stepIndex) {
        return dbController.getStepUIState(taskId, stepIndex);
    }

    getSkillHelperFile(filePath, folder) {
        return fsc.getSkillFile(filePath, folder);
    }

    saveStepUIState(taskId, stepIndex, stepUIData) {
        return dbController.saveStepUIState(taskId, stepIndex, stepUIData);
    }

    saveStepXML(taskId, stepIndex, OutputXML) {
        return fsc.saveStepXML(taskId, stepIndex, OutputXML);
    }
    saveTaskDynamicResource(taskParams, File, FileName) {
        return fsc.saveTaskResources(taskParams, File, FileName);
    }

    saveResourceFile() {
        return fsc.saveResourceFile();
    }

    removeResourceFile(filePath) {
        return fsc.removeResourceFile(filePath);
    }

    getResource(filePath) {
        return fsc.getResource(filePath, folderMap.RESOURCE);
    }

    getResourcePath(filePath) {
        return fsc.getResourcePath(filePath, folderMap.RESOURCE);
    }

    getFileFromFileStore(filePath) {
        return fsc.getFileFromFileStore(filePath);
    }

    getTaskFolderOnLocal(taskId) {
        return fsc.getTaskFolderOnLocal(taskId);
    }
}

module.exports = new DatabaseFileStoreManager();