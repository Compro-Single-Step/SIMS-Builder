const path = require('path');
const config = require('../../config/config');
const fs = require('fs');
const multer = require('multer');
const mkdirp = require('mkdirp');
const fse = require('fs-extra');
const ResourceUtil = require('../../utils/resourceUtil');
const baseFilestore = require('./base.filestore');


class localFilestore extends baseFilestore{

    constructor(config){
        super();
    }

    copyFile(srcPath, destPath) {

        return new Promise((resolve, reject) => {
            fse.copy(srcPath, destPath, { overwrite: false }, error => {
                if (!error) {
                    resolve("success");
                }
                else {
                    reject(error);
                }
            });
        });
    }

    removeFile(filePath) {
        return new Promise((resolve, reject) => {
            fs.unlink(filePath, (error) => {
                if (error) {
                    reject(error);
                } else {
                    resolve("success");
                }
            });
        });
    }

    readFile(absFilePath, relFilePath) {
        return new Promise((resolve, reject) => {
            fs.readFile(absFilePath, 'utf8', function (error, data) {
                if (error) {
                    error.filePath = relFilePath;
                    reject(error);
                }
                else {
                    resolve(data);
                }
            });
        })
    }

    createFolder(folderPath) {
        return new Promise((resolve, reject) => {
            mkdirp(folderPath, (error) => {
                if (error) {
                    reject(error);
                }
                else {
                    resolve(true);
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

                self.createFolder(destinationFolder)
                    .then((success) => {
                        callback(null, destinationFolder);
                    }, (error) => {
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

    saveFile(filepath, fileName, file) {
        return this.createFolder(filepath)
            .then((success) => {
                fs.writeFile(filepath + fileName, file, (err) => {
                    if (err) {
                        return Promise.reject(err);
                    }
                    else {
                        return Promise.resolve("saved in directory");
                    }
                });
            }, (err) => {
                return Promise.reject(err);
            });
    }

    getTaskFolderOnLocal(taskId){
        var self = this;
        return new Promise((resolve,reject) => {
            resolve(config.fileStore.xmlFolder + taskId);
        })
    }

}

module.exports = localFilestore;
