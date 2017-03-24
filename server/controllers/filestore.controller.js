const path = require('path');
const config = require('../config/config');
const fs = require('fs');
const multer = require('multer');
const mkdirp = require('mkdirp');

class FileStoreController {

    saveStepXML(taskId, stepIndex, OutputXML, callback){
        //HARDCODING task ID here
        var taskId = "EXP16.WD.02.03.01.t1";
        let filePath = FileStoreController.getTaskFolderPath(taskId) + "stepxmls/";
        let fileName = stepIndex + ".xml";
        
        FileStoreController.saveToFileStore(filePath, fileName, OutputXML, callback);
    }

    saveResourceFile(templateId, taskId, stepIndex, fileName) {
        let filePath = FileStoreController.getTaskFolderPath(taskId) + "Assets/step-" + stepIndex;

        return FileStoreController.uploadFileHandler(filePath);
    }

    getFromFileStore(filepath, callback) {
        let absolutePath = config.fileStore.skillFolderPath + filepath;

        fs.readFile(absolutePath, 'utf8', function (err, data) {
            callback(err, data);
        });
    }

    static uploadFileHandler(filePath) {
        let storage = multer.diskStorage({
            destination: function (req, file, callback) {
                let destinationFilePath = filePath;

                FileStoreController.createFolder(destinationFilePath, (error) => {
                    callback(null, destinationFilePath);
                });
            },
            filename: function (req, file, callback) {
                callback(null, file.originalname);
            }
        });
        let upload = multer({ storage: storage });
        return upload.fields([{ name: 'Browse', maxCount: 1 }]);
    }

    static createFolder(folderPath, callback){
        mkdirp(folderPath, (error) => {
            callback(error);
        });
    }

    static getTaskFolderPath(taskId) {
        let taskIdArr = taskId.toLowerCase().split('.');
        if(taskIdArr[0].length > 3) {
            taskIdArr[0] = taskIdArr[0].slice(0, taskIdArr[0].length - 2);
        }
        
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
        
        let filePath = config.fileStore.xmlFolderPath+ taskIdPath + taskFolder;
        return filePath;
    }

    static saveToFileStore(filepath, fileName, file, callback) {
        
        //Create Folder if already don't exist
        FileStoreController.createFolder(filepath, (error) => {
            if(!error){
                //Saving XML
                fs.writeFile(filepath + fileName, file, (err) => {
                    callback(err);
                });
            }
            else
                 callback(err);
        });
    }
}

module.exports = new FileStoreController();
