const path = require('path');
const config = require('../config/config');
const fs = require('fs');
const multer = require('multer');
const mkdirp = require('mkdirp');

class FileStoreController {

    getUIConfig(filepath, callback) {
        FileStoreController.readFromFileStore(filepath, callback);
    }

    getSkillXML(filepath, callback) {
        FileStoreController.readFromFileStore(filepath, callback);
    }

    getIOMap(filepath, callback) {
        FileStoreController.readFromFileStore(filepath, callback);
    }

    getSkillModel(filepath, callback) {
        FileStoreController.readFromFileStore(filepath, callback);
    }

    static readFromFileStore(filepath, callback) {
        let absolutePath = config.root + "/" + filepath;

        fs.readFile(absolutePath, 'utf8', function (err, data) {
            callback(err, data);
        });
    }

    static uploadFileHandler(filePath) {
        let storage = multer.diskStorage({
            destination: function (req, file, callback) {
                let destinationFilePath = filePath;

                mkdirp(destinationFilePath, (error) => {
                    if(error) {
                        console.log(error);
                    }
                });

                callback(null, destinationFilePath);
            },
            filename: function (req, file, callback) {
                callback(null, file.originalname);
            }
        });
        let upload = multer({ storage: storage });
        return upload.fields([{ name: 'Browse', maxCount: 1 }]);
    }

    saveResourceFile(templateId, taskId, stepIndex, fileName) {
        let filePath = FileStoreController.getFilePath(taskId);

        return FileStoreController.uploadFileHandler(filePath);
    }

    static getFilePath(taskId) {
        let taskIdArr = taskId.toLowerCase().split('.');
        taskIdArr[0] = taskIdArr[0].slice(0, taskIdArr[0].length - 2);
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
        
        let filePath = config.fileStore.baseURL + config.fileStore.relativePath + '/' + taskIdPath + taskFolder;
        return filePath;
    }
}

module.exports = new FileStoreController();
