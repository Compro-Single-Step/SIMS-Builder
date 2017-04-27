const path = require('path');
const config = require('../config/config');
const fs = require('fs');
const multer = require('multer');
const mkdirp = require('mkdirp');
const fse = require('fs-extra');
const ResourceUtil = require('../utils/resourceUtil');

const fileTypeFolderMap = {
    "SKILL": config.fileStore.skillFolder,
    "RESOURCE": config.fileStore.resourceFolder,
    "XML": config.fileStore.xmlFolder
};

const resTypeMap = {
    "png": "img",
    "jpeg": "img",
    "jpg": "img",
    "json": "json",
    "txt": "text",
    "html": "html",
    "xml": "xml"
};

class FileStoreController {

    getFileStoreStepFolderPath(taskId, stepIdx) {
        return config.fileStore.xmlFolder + taskId + "/" + stepIdx + "/";
    }

    getSimsXmlStepFolderPath(taskId, stepIdx) {
        return this.getTaskFolderPath(taskId, stepIdx) + stepIdx + "/";
    }

    copyAssetToTaskFolder(srcPath, taskParams) {

        var filepathArr = srcPath.split("/");
        var fileName = filepathArr[filepathArr.length - 1].trim();
        var fileTypeArr = fileName.split(".");
        var fileType = fileTypeArr[fileTypeArr.length - 1];
        var resFileType = fileType;
        if (resTypeMap[fileType]) {
            resFileType = resTypeMap[fileType];
        }
        //path to save the file
        var absFilePath = this.getFileStoreStepFolderPath(taskParams.taskId, taskParams.stepIndex);

        //path to return for the file
        var srcPath = config.fileStore.resourceFolder + srcPath;
        var destPath = this.getStepXMLFolderPath(taskParams.taskId, taskParams.stepIndex);
        var relativeXmlPath = this.getSimsXmlStepFolderPath(taskParams.taskId, taskParams.stepIndex);

        if (taskParams.parentFolder) {
            destPath += taskParams.parentFolder + "/";
            relativeXmlPath += taskParams.parentFolder + "/";
        }

        destPath += fileName;

        return new Promise(function (resolve, reject) {

            fse.copy(srcPath, destPath, { overwrite: false }, function (error) {
                if (!error) {
                    var resolveParam = { "filePath": relativeXmlPath + fileName, "fileType": resFileType };
                    resolve(resolveParam);
                } else {
                    reject(error);
                }
            });
        });
    }

    readTaskRes(filepath) {
        var absolutePath = config.fileStore.resourceFolder + filepath;
        return new Promise(function (resolve, reject) {
            fs.readFile(absolutePath, 'utf8', function (error, fileData) {
                if (!error) {
                    var resolveParam = { "fileData": fileData, "filePath": absolutePath };
                    resolve(resolveParam);
                } else {
                    reject(error);
                }
            });
        });
    }
    getTaskFolderPath(taskId) {

        let taskIdArr = taskId.toLowerCase().split('.');
        // if(taskIdArr[0].length > 3) {
        //     taskIdArr[0] = taskIdArr[0].slice(0, taskIdArr[0].length - 2);
        // }

        let taskIdPath = "";
        let taskFolder = "";

        for (let i = 0; i < taskIdArr.length; i++) {
            if (i < taskIdArr.length - 3) {
                taskIdPath += taskIdArr[i] + "/";
            } else if (i == taskIdArr.length - 1) {
                taskFolder += taskIdArr[i] + "/";
            } else {
                taskFolder += taskIdArr[i] + ".";
            }
        }

        // let filePath = config.fileStore.xmlFolder + "XMLs/TaskXmls/" + taskIdPath + taskFolder;
        let filePath = "XMLs/TaskXmls/" + taskIdPath + taskFolder;
        return filePath;
    }

    saveStepXML(taskId, stepIndex, OutputXML) {

        let folderPath = this.getStepXMLFolderPath(taskId, stepIndex);
        let fileName = "task.xml"; //this will come from out side.
        return this.saveFileToFileStore(folderPath, fileName, OutputXML);
    }

    saveResourceFile() {
        return this.uploadFileHandler();
    }

    removeResourceFile(filePath) {
        return new Promise((resolve, reject) => {
            filePath = config.fileStore.resourceFolder + filePath;
            fs.unlink(filePath, error => {
                if (error) {
                    reject(error);
                } else {
                    resolve("success");
                }
            });
        });
    }

    getFileFromFileStore(filePath, folder) {
        return new Promise((resolve, reject) => {
            let absolutePath = filePath;;

            if (folder) {
                absolutePath = folder + filePath;
            }

            fs.readFile(absolutePath, 'utf8', function (error, data) {
                if (error) {
                    error.filePath = filePath;
                    reject(error);
                } else {
                    resolve(data);
                }
            });
        });
    }

    uploadFileHandler() {
        let self = this;
        let storage = multer.diskStorage({
            destination: function (req, file, callback) {
                let taskId = req.body.taskId;
                let stepIndex = req.body.stepIndex;
                let resFolderPath = ResourceUtil.getUploadResourceFolderRelativePath(taskId, stepIndex);
                req.body.folder = resFolderPath;
                let destinationFolder = self.getUploadedResourceFolderPath(resFolderPath);

                self.createFolder(destinationFolder).then(success => {
                    callback(null, destinationFolder);
                }, error => {
                    console.log("Folder not created.");
                });
            },
            filename: function (req, file, callback) {
                let timestamp = new Date().getTime().toString();
                let fileName = timestamp + "." + file.originalname;

                req.body.filePath = req.body.folder + fileName;
                callback(null, fileName);
            }
        });
        let upload = multer({ storage: storage });
        return upload.fields([{ name: 'dzfile', maxCount: 1 }]);
    }

    createFolder(folderPath) {
        return new Promise((resolve, reject) => {
            mkdirp(folderPath, error => {
                if (error) {
                    reject(error);
                } else {
                    resolve(true);
                }
            });
        });
    }

    getStepXMLFolderPath(taskId, stepIndex) {
        return config.fileStore.xmlFolder + taskId + "/" + stepIndex + "/";
    }

    getUploadedResourceFolderPath(relPath) {
        return config.fileStore.resourceFolder + relPath;
    }

    saveFileToFileStore(filepath, fileName, file) {
        return this.createFolder(filepath).then(success => {
            fs.writeFile(filepath + fileName, file, err => {
                if (err) {
                    return Promise.reject(err);
                } else {
                    return Promise.resolve("saved in directory");
                }
            });
        }, err => {
            return Promise.reject(err);
        });
    }

    getResourcePath(filePath, folder) {
        return folder + filePath;
    }
}

module.exports.fileStoreController = new FileStoreController();
module.exports.fileTypeFolderMap = fileTypeFolderMap;