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

    saveStepXML(taskId, stepIndex, OutputXML) {

        let folderPath = this.getStepXMLFolderPath(taskId, stepIndex);
        let fileName = "task.xml";  //this will come from out side.
        return this.saveFileToFileStore(folderPath, fileName, OutputXML);
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

    createFolder(folderPath) {
        return new Promise((resolve, reject)=> {
            mkdirp(folderPath, (error) => {
                if(error) {
                    reject(error);
                }
                else {
                    resolve(true);
                }
            });
        });
    }

    getStepXMLFolderPath(taskId, stepIndex) {
        return config.fileStore.xmlFolderPath + taskId + "/step-" + stepIndex + "/";
    }

    getUploadedResourceFolderPath(taskId, stepIndex) {
        return config.fileStore.resourceFolder + taskId + "/" + stepIndex + "/";
    }

    saveFileToFileStore(filepath, fileName, file) {
        return this.createFolder(filepath)
        .then((success)=> {
            fs.writeFile(filepath + fileName, file, (err) => {
                if(error) {
                    Promise.reject(error);
                }
                else {
                    Promise.resolve("saved in directory");
                }
            });
        }, (error)=> {
            Promise.reject(error);
        });
    }
}

module.exports.fileStoreController = new FileStoreController();
module.exports.fileTypeFolderMap = fileTypeFolderMap;

