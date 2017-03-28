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

        let taskId = "EXP16.WD.02.03.01.t1";
        let folderPath = this.getStepXMLFolderPath(taskId, stepIndex);
        
        this.saveToFileStore(folderPath, OutputXML, callback);
    }

    saveResourceFile(templateId, taskId, stepIndex, fileName) {
        let folderPath = this.getUploadedResourceFolderPath(taskId, stepIndex);

        return this.uploadFileHandler(folderPath);
    }

    getFileFromFileStore(filepath, fileType, callback) {
        let absolutePath = this.fileTypeFolderMap[fileType] + filepath;

        fs.readFile(absolutePath, 'utf8', function (err, data) {
            callback(err, data);
        });
    }

    uploadFileHandler(folderPath) {
        let storage = multer.diskStorage({
            destination: function (req, file, callback) {
                let destinationFolder = folderPath;

                this.createFolder(destinationFolder, (error) => {
                    callback(null, destinationFolder);
                });
            },
            filename: function (req, file, callback) {
                callback(null, file.originalname);
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

    saveToFileStore(filepath, file, callback) {
        this.createFolder(filepath, (error) => {
            if(!error) {
                fs.writeFile(filepath + "task.xml", file, (err) => {
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
