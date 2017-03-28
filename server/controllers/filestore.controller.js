const path = require('path');
const config = require('../config/config');
const fs = require('fs');
const multer = require('multer');
const mkdirp = require('mkdirp');

class FileStoreController {

    constructor() {
        this.fileTypeFolderMap = {
            "skillConfig": config.fileStore.skillFolder,
            "uploadedResource": config.fileStore.resourceFolder,
            "xml": config.fileStore.xmlFolderPath
        };
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

    getFileFromFileStore(filepath, fileType, callback) {
        let absolutePath = this.fileTypeFolderMap[fileType] + filepath;

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

module.exports = new FileStoreController();
