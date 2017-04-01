const path = require('path');
const config = require('../config/config');
const fs = require('fs');
const multer = require('multer');
const mkdirp = require('mkdirp');
const fse = require('fs-extra');

const fileTypeFolderMap = {
    "SKILL": config.fileStore.skillFolder,
    "RESOURCE": config.fileStore.resourceFolder,
    "XML": config.fileStore.xmlFolder
};

class FileStoreController {

    getTaskRes(filepath, callback){
        this.readTaskRes(filepath, callback);
    }

    getFileStoreStepFolderPath(taskId, stepIdx){
        return taskId + "/" + stepIdx + "/";
    }
    getSimsXmlTaskFolderPath(taskId, stepIdx){
        return this.getTaskFolderPath(taskId, stepIdx);
    }

    copyAssetToTaskFolder(residentPath, taskParams, callback){
    
    var filepathArr = residentPath.split("/")
    var fileName = filepathArr[filepathArr.length-1].trim();
    var fileTypeArr = fileName.split(".")
    var fileType = fileTypeArr[fileTypeArr.length-1];
    var self =  this;
    self.getTaskAsset(residentPath,function(error,data){
        if(!error){
          self.storeTaskAsset(taskParams.taskId, taskParams.stepIndex, fileName, data, function(error,path){
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
    getTaskAsset( filePath,callback){
        this.getTaskRes(filePath,callback)
    }

    storeTaskAsset(taskId, stepIdx, fileName, data, callback){
        this.saveTaskRes(taskId, stepIdx, fileName, data, callback);
    }

    saveTaskRes(taskId, stepIdx, fileName, fileContent, callback){
        
        var absFilePath = this.getFileStoreStepFolderPath(taskId, stepIdx);

        // var relativeXmlPath = this.getTaskFolderPath(taskId);
        var relativeXmlPath = this.getSimsXmlTaskFolderPath(taskId, stepIdx);
        
        this.saveFileToFileStore(absFilePath, fileName, fileContent, function(error){
            if(!error){
                callback(null, relativeXmlPath + fileName);
            }
            else{
                callback(error);
            }
        });
    }

    copyResToTaskFolder(srcPath, stepIndex, taskId, callback){

        var folderPathArr = srcPath.split("/");

        var folderName = folderPathArr[folderPathArr.length-1];
        var relativeDestPath = this.getFileStoreStepFolderPath(taskId, stepIndex);
         var relativeXmlPath = this.getSimsXmlTaskFolderPath(taskId, stepIndex);
        var destPath = config.fileStore.xmlFolder + relativeDestPath + folderName;

        srcPath  = config.fileStore.resourceFolder + srcPath;


        this.copyFolderContents(srcPath, destPath, function(error){
            
            if(!error){
                callback(error , relativeXmlPath + folderName);
            }
            else{
                callback(error);
            }
        })
        
    }

    copyFolderContents(srcPath, destPath, callback){
        fse.copy(srcPath, destPath, function(error){
            callback(error);
        });                                     
    }

    readTaskRes(filepath, callback) {
        let absolutePath = config.fileStore.resourceFolder + filepath;

        fs.readFile (absolutePath, 'utf8', function (err, data) {
            callback(err, data);
        });
    }
    getTaskFolderPath(taskId) {

        let taskIdArr = taskId.toLowerCase().split('.');
        // if(taskIdArr[0].length > 3) {
        //     taskIdArr[0] = taskIdArr[0].slice(0, taskIdArr[0].length - 2);
        // }
        
        let taskIdPath = "";
        let taskFolder = "";

        for(let i = 0; i < taskIdArr.length; i++) {
            if(i < taskIdArr.length - 3) {
                taskIdPath += taskIdArr[i] + "/";
            }
            else if (i == taskIdArr.length - 1){
                taskFolder += taskIdArr[i] + "/";
            }
            else {
                taskFolder += taskIdArr[i] + ".";
            }
        }
        
        // let filePath = config.fileStore.xmlFolder + "XMLs/TaskXmls/" + taskIdPath + taskFolder;
        let filePath =  "XMLs/TaskXmls/" + taskIdPath + taskFolder;
        return filePath;
    }

    saveStepXML(taskId, stepIndex, OutputXML, callback) {

        let folderPath = this.getStepXMLFolderPath(taskId, stepIndex);
        let fileName = "task.xml";  //this will come from out side.
        this.saveFileToFileStore(folderPath, fileName, OutputXML, callback);
    }

    saveResourceFile(templateId, taskId, stepIndex, fileName) {
        let folderPath = this.getUploadedResourceFolderPath(taskId, stepIndex);

        return this.uploadFileHandler(folderPath, fileName);
    }

    getFileFromFileStore(filepath, folder, callback) {
        let absolutePath = folder + filepath;

        fs.readFile(absolutePath, 'utf8', function (err, data) {
            callback(err, data);
        });
    }

    uploadFileHandler(folderPath, fileName) {
        let storage = multer.diskStorage({
            destination: function (req, file, callback) {
                let destinationFolder = folderPath;

                this.createFolder(destinationFolder, (error) => {
                    callback(null, destinationFolder);
                });
            },
            filename: function (req, file, callback) {
                callback(null, fileName || file.originalname);
            }
        });
        let upload = multer({ storage: storage });
        return upload.fields([{ name: 'Browse', maxCount: 1 }]);
    }

    createFolder(folderPath, callback) {
        mkdirp(folderPath, (error) => {
            callback(error);
        });
    }

    getStepXMLFolderPath(taskId, stepIndex) {
        return config.fileStore.xmlFolder + taskId + "/" + stepIndex + "/";
    }

    getUploadedResourceFolderPath(taskId, stepIndex) {
        return config.fileStore.resourceFolder + taskId + "/" + stepIndex + "/";
    }

    saveFileToFileStore(filepath, fileName, file, callback) {
        this.createFolder(filepath, (error) => {
            if(!error) {
                fs.writeFile(filepath + fileName, file, (err) => {
                    callback(err);
                });
            }
            else {
                callback(err);
            }
        });
    }
}

module.exports.fileStoreController = new FileStoreController();
module.exports.fileTypeFolderMap = fileTypeFolderMap;

