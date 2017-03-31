const dbController = require('../../controllers/db.controller');
const FAL = require('../../controllers/filestore.controller');
const fsc = FAL.fileStoreController;
const skillConfigTypes = require('../../models/skillConfigRepo.model').skillConfigTypes;
const folderMap = FAL.fileTypeFolderMap;

class DatabaseFileStoreManager {


    copyTaskAssetFile(residentPath, taskParams, callback){

    //take out the filename from the path 
    var filepathArr = residentPath.split("/")
    var fileName = filepathArr[filepathArr.length-1].trim();
    var fileTypeArr = fileName.split(".")
    var fileType = fileTypeArr[fileTypeArr.length-1];

    taskParams.dbFilestoreMgr.getTaskAsset(residentPath,function(error,data){
        if(!error){
          taskParams.dbFilestoreMgr.storeTaskAssets(taskParams.taskId, taskParams.stepIndex, fileName, data, function(error,path){
              if(!error){
                // this.updateResourcePath(path)
                //returning the fileType as well
                callback(error, path, fileType);
              }
              else{
                callback(error);
              }
          });
        }
        else{
            callback(error)
        } 
    });
  }
    
    copyAssetFolderContents(srcPath, stepIndex, taskId, callback){
        fsc.copyResToTaskFolder(srcPath, stepIndex, taskId, callback);
    }

    getTaskAsset( filePath,callback){
        fsc.getTaskRes(filePath,callback)
    }

    storeTaskAssets(taskId, stepIdx, fileName, data, callback){
        fsc.saveTaskRes(taskId, stepIdx, fileName, data, callback);
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

    saveStepUIState(taskId, stepIndex, stepUIData, callback) {
        dbController.saveStepUIState(taskId, stepIndex, stepUIData, (error, data) => {
            callback(error, data);
        });
    }

    saveStepXML(taskId, stepIndex, OutputXML, callback){
        fsc.saveStepXML(taskId, stepIndex, OutputXML, callback);
	}

    saveResourceFile(templateId, taskId, stepIndex, fileName) {
        return fsc.saveResourceFile(templateId, taskId, stepIndex, fileName);
    }
}

module.exports = new DatabaseFileStoreManager();