const dbController = require('../../controllers/db.controller');
const FAL = require('../../controllers/filestore.controller');
const fsc = FAL.fileStoreController;
const skillConfigTypes = require('../../models/skillConfigRepo.model').skillConfigTypes;
const folderMap = FAL.fileTypeFolderMap;

class DatabaseFileStoreManager {

    //dynamic sheet num 
      readFileFromFileStore(filePath, readFileType){
          return fsc.readTaskRes(filePath, readFileType)
     }

    copyTaskAssetFile(residentPath, taskParams) {
        //construct a promise in filestore controller and return that promise 
        // this function will as it is return the promise object whether it is resolved or rejected
        return fsc.copyAssetToTaskFolder(residentPath, taskParams);
    }

     /**
     * @param {*} sourceFileLocation : Location from which file to be copied 
     * Ex: "GO16.WD.12.12B.02.T1/1/1493790231823.DocumentData.json"
     * @param {*} resourceMap : It's an object which contains following key-value pairs:
     *   absFilePath:"XMLs/TaskXmls/go16/wd/12/12b.02.t1/1/Assets/1493790231823.DocumentData.json"
     *   customParentFolder: Any custom folder hierarchy
     *   fileName: "1493790231823.DocumentData.json"
     *   fileType: "json"
     *   resourceType: "step"
     * @param {*} taskId : Task ID
     * @param {*} stepIndex : Step Index
     * OUTPUT : This function calls the 'copyAssetToTaskFolderEnhanced' function of file store controller 
     * which copies the resource file from a source location to corresponding destination and 
     * returns the promise for same
     */
    copyTaskAssetFileEnhanced(sourceFileLocation, resourceMap, taskId, stepIndex) {
        //construct a promise in filestore controller and return that promise 
        // this function will as it is return the promise object whether it is resolved or rejected
        return fsc.copyAssetToTaskFolderEnhanced(sourceFileLocation, resourceMap, taskId, stepIndex);
    }
    
    getUIConfig(templateId) {
        return dbController.getSkillConfigPath(templateId, skillConfigTypes.UI_CONFIG)
        .then((filePath)=> {
            if(filePath === undefined || filePath === null) {
                return Promise.reject("Skill Config for template id " + templateId + " doesn't exist in database");
            }
            else {
                return fsc.getFileFromFileStore(filePath, folderMap.SKILL);
            }
        }, (error)=> {
            return Promise.reject(error);
        });
    }
 
    getSkillXML(templateId) {
        return dbController.getSkillConfigPath(templateId, skillConfigTypes.XML)
        .then((filePath)=> {
            if(filePath === undefined || filePath === null) {
                return Promise.reject("Skill XML for template id "+ templateId + " doesn't exist in database");
            }
            else {
                return fsc.getFileFromFileStore(filePath, folderMap.SKILL);
            }
        }, (error)=> {
            return Promise.reject(error);
        });
    }

    getIOMap(templateId) {
        return dbController.getSkillConfigPath(templateId, skillConfigTypes.IO_MAP)
        .then((filePath)=> {
            if(filePath === undefined || filePath === null) {
                return Promise.reject("I/O Map for template id "+ templateId + " doesn't exist in database");
            }
            else {
                return fsc.getFileFromFileStore(filePath, folderMap.SKILL);
            }
        }, (error)=> {
            return Promise.reject(error);
        });
    }

    getSkillModel(templateId) {
        return dbController.getSkillConfigPath(templateId, skillConfigTypes.MODEL)
        .then((filePath)=> {
            if(filePath === undefined || filePath === null) {
                return Promise.reject("Skill Model for template id "+ templateId + " doesn't exist in database");
            }
            else {
                return fsc.getFileFromFileStore(filePath, folderMap.SKILL);
            }
        }, (error)=> {
            return Promise.reject(error);
        });
    }

    getStepUIState(taskId, stepIndex) {
        return dbController.getStepUIState(taskId, stepIndex);
    }
    
    getSkillHelperFile(filePath, folder) {
        return fsc.getFileFromFileStore(filePath, folder);
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

    removeResourceFile(filePath) {
        return fsc.removeResourceFile(filePath);
    }

    getResourcePath(filePath){
        return fsc.getResourcePath(filePath, folderMap.RESOURCE);
    }
}

module.exports = new DatabaseFileStoreManager();