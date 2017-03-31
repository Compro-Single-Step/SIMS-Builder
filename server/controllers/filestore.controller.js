const path = require('path');
const config = require('../config/config');
const fs = require('fs');
const multer = require('multer');
const mkdirp = require('mkdirp');

const fileTypeFolderMap = {
    "SKILL": config.fileStore.skillFolder,
    "RESOURCE": config.fileStore.resourceFolder,
    "XML": config.fileStore.xmlFolderPath
};

class FileStoreController {

    saveStepXML(taskId, stepIndex, OutputXML, callback) {

        let folderPath = this.getStepXMLFolderPath(taskId, stepIndex);
        let fileName = "task.xml";  //this will come from out side.
        this.saveFileToFileStore(folderPath, fileName, OutputXML, callback);
    }

    saveResourceFile() {
        return this.uploadFileHandler();
    }

    getFileFromFileStore(filepath, folder) {
        return new Promise((resolve, reject)=> {
            let absolutePath = folder + filepath;

            fs.readFile(absolutePath, 'utf8', function (error, data) {
                if(error) {
                    reject(error);
                }
                else {
                    resolve(data);
                }
            });
        })
    }

    uploadFileHandler() {
        let self = this;
        let storage = multer.diskStorage({
            destination: function (req, file, callback) {
                let taskId = req.body.taskId;
                let stepIndex = req.body.stepIndex;
                let destinationFolder = self.getUploadedResourceFolderPath(taskId, stepIndex);
                self.createFolder(destinationFolder, (error) => {
                    callback(null, destinationFolder);
                });
            },
            filename: function (req, file, callback) {
                let fileName = req.body.fileName;
                fileName = fileName || file.originalname;
                callback(null, fileName);
            }
        });
        let upload = multer({ storage: storage });
        return upload.fields([{ name: 'dzfile', maxCount: 1 }]);
    }

    createFolder(folderPath, callback) {
        mkdirp(folderPath, (error) => {
            callback(error);
        });
    }

    getStepXMLFolderPath(taskId, stepIndex) {
        return config.fileStore.xmlFolderPath + taskId + "/step-" + stepIndex + "/";
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

