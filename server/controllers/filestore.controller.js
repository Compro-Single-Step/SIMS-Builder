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

    saveResourceFile(templateId, taskId, stepIndex, fileName) {
        let folderPath = this.getUploadedResourceFolderPath(taskId, stepIndex);

        return this.uploadFileHandler(folderPath, fileName);
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

