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

    getTaskRes(filepath, callback) {
        this.readTaskRes(filepath, callback);
    }

    getFileStoreStepFolderPath(taskId, stepIdx) {
        return config.fileStore.xmlFolder + taskId + "/" + stepIdx + "/";
    }

    getSimsXmlStepFolderPath(taskId, stepIdx){
        return this.getTaskFolderPath(taskId, stepIdx) + stepIdx + "/";
    }

    copyAssetToTaskFolder(srcPath, taskParams, callback) {

        var filepathArr = srcPath.split("/")
        var fileName = filepathArr[filepathArr.length - 1].trim();
        var fileTypeArr = fileName.split(".")
        var fileType = fileTypeArr[fileTypeArr.length - 1];
        var resFileType = fileType;
        if (resTypeMap[fileType]) {
            resFileType = resTypeMap[fileType]
        }
        var self = this;

        let src = config.fileStore.resourceFolder + srcPath;
        let dest = config.fileStore.xmlFolder + taskParams.taskId + "/" + taskParams.stepIndex + "/";

        let relativeXmlPath = this.getTaskFolderPath(taskParams.taskId, taskParams.stepIndex) + taskParams.stepIndex + "/";

        if(taskParams.parentFolder){
            dest += taskParams.parentFolder
            relativeXmlPath += taskParams.parentFolder;
        }

        dest += fileName;

        fse.copy(src, dest, function (error) {
            if (!error) {
                callback(null, relativeXmlPath + fileName);
            }
            else {
                callback(error);
            }
        })


        // self.getTaskAsset(residentPath, function (error, data) {
        //     if (!error) {
        //         self.storeTaskAsset(taskParams, fileName, data, function (error, path) {
        //         // self.storeTaskAsset(taskParams.taskId, taskParams.stepIndex, fileName, data, function (error, path) {
        //             if (!error) {
        //                 // this.updateResourcePath(path)
        //                 //returning the fileType as well
        //                 callback(error, path, resFileType);
        //             }
        //             else {
        //                 callback(error);
        //             }
        //         });
        //     }
        //     else {
        //         callback(error)
        //     }
        // });

    }
    getTaskAsset(filePath, callback) {
        this.getTaskRes(filePath, callback)
    }

    // storeTaskAsset(taskId, stepIdx, fileName, data, callback) {
    storeTaskAsset(taskParams, fileName, data, callback) {
        // this.saveTaskRes(taskId, stepIdx, fileName, data, callback);
        this.saveTaskRes(taskParams, fileName, data, callback);
    }

    // saveTaskRes(taskId, stepIdx, fileName, fileContent, callback) {
    saveTaskRes(taskParams, fileName, fileContent, callback) {

        let absFilePath = this.getFileStoreStepFolderPath(taskParams.taskId, taskParams.stepIndex);
        let relativeXmlPath = this.getSimsXmlStepFolderPath(taskParams.taskId, taskParams.stepIndex);
        // var stateId = 1;
        if(taskParams.parentFolder){
            absFilePath += taskParams.parentFolder
            relativeXmlPath += taskParams.parentFolder;
        }
        // var relativeXmlPath = this.getTaskFolderPath(taskId);
        // var relativeXmlPath = this.getSimsXmlStepFolderPath(taskParams.taskId, taskParams.stepIndex);

        this.saveFileToFileStore(absFilePath, fileName, fileContent, function (error) {
            if (!error) {
                callback(null, relativeXmlPath + fileName);
            }
            else {
                callback(error);
            }
        });
    }

    copyResToTaskFolder(srcPath, stepIndex, taskId, callback) {

        var folderPathArr = srcPath.split("/");

        var folderName = folderPathArr[folderPathArr.length - 1];
        var relativeXmlPath = this.getSimsXmlStepFolderPath(taskId, stepIndex);
        var destPath = this.getFileStoreStepFolderPath(taskId, stepIndex) + folderName;

        srcPath = config.fileStore.resourceFolder + srcPath;


        this.copyFolderContents(srcPath, destPath, function (error) {

            if (!error) {
                callback(error, relativeXmlPath + folderName);
            }
            else {
                callback(error);
            }
        })

    }

    copyFolderContents(srcPath, destPath, callback) {
        fse.ensureDir(destPath, function (error) {
            if (!error) {
                fse.copy(srcPath, destPath, function (error) {
                    callback(error);
                });
            }
            else {
                callback(error);
            }
        });

    }

    readTaskRes(filepath, callback) {
        let absolutePath = config.fileStore.resourceFolder + filepath;

        fs.readFile(absolutePath, 'utf8', function (err, data, absolutePath) {
            if(err){
                console.log("aaaabsolutePath: ", absolutePath);
            }
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

        for (let i = 0; i < taskIdArr.length; i++) {
            if (i < taskIdArr.length - 3) {
                taskIdPath += taskIdArr[i] + "/";
            }
            else if (i == taskIdArr.length - 1) {
                taskFolder += taskIdArr[i] + "/";
            }
            else {
                taskFolder += taskIdArr[i] + ".";
            }
        }

        // let filePath = config.fileStore.xmlFolder + "XMLs/TaskXmls/" + taskIdPath + taskFolder;
        let filePath = "XMLs/TaskXmls/" + taskIdPath + taskFolder;
        return filePath;
    }

    saveStepXML(taskId, stepIndex, OutputXML) {

        let folderPath = this.getStepXMLFolderPath(taskId, stepIndex);
        let fileName = "task.xml";  //this will come from out side.
        return this.saveFileToFileStore(folderPath, fileName, OutputXML);
    }

    saveResourceFile() {
        return this.uploadFileHandler();
    }

    removeResourceFile(filePath) {
        return new Promise((resolve, reject)=> {
            filePath = config.fileStore.resourceFolder + filePath;
            fs.unlink(filePath, (error)=> {
                if(error) {
                    reject(error);
                } else {
                    resolve("success");
                }
            });
        });
    }

    getFileFromFileStore(filePath, folder) {
        return new Promise((resolve, reject)=> {
            let absolutePath = filePath;;
            
            if(folder) {
                absolutePath = folder + filePath;
            }

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
        return config.fileStore.xmlFolder + taskId + "/" + stepIndex + "/";
    }

    getUploadedResourceFolderPath(relPath) {
        return config.fileStore.resourceFolder + relPath;
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
