const path = require('path');
const config = require('../../config/config');
const fs = require('fs');

const resTypeMap = {
    "png": "img",
    "jpeg": "img",
    "jpg": "img",
    "json": "json",
    "txt": "text",
    "html": "html",
    "xml": "xml"
};

const fileTypeFunctionMap = {
    "csv": "readCsvFile"
}


class BaseFileStore {

    constructor() {

    }

    readCsvFile(absolutePath) {
        let resultArr = [];
        const csv = require('csvtojson');

        return this.readFile(absolutePath)
            .then((data) => {
                return new Promise((resolve, reject) => {
                    csv().fromString(data)
                        .on('json', (jsonObj) => {
                            resultArr.push(jsonObj);
                        })
                        .on('done', (error) => {
                            if (resultArr.length == 0) {
                                error.message = error.message + "\n<Error occured while reading the csv type file>";
                                reject(error);
                            }
                            else {
                                var resolveParam = { "fileData": resultArr, "filePath": absolutePath };
                                resolve(resolveParam);
                            }
                        })
                        .on('error', (error) => {
                            error.message = error.message + "\n<Error occured while reading the csv type file>";
                            reject(error);
                        });
                });
            })
            .catch((err) => {
                return Promise.reject(err);
            });
    }
    // Below function was a duplicate. Use 'getStepXMLFolderPath' instead.
    // getFileStoreStepFolderPath(taskId, stepIdx) {
    //  }

    getSimsXmlStepFolderPath(taskId, stepIdx) {
        return this.getTaskFolderPath(taskId, stepIdx) + stepIdx + "/";
    }


    copyAssetToTaskFolder(srcPath, taskParams) {
        try {
            if(!srcPath) {
                return Promise.resolve(true);
            }
            var filepathArr = srcPath.split("/")
            var fileName = filepathArr[filepathArr.length - 1].trim();
            var fileTypeArr = fileName.split(".")
            var fileType = fileTypeArr[fileTypeArr.length - 1];
            var resFileType = fileType;
            if (resTypeMap[fileType]) {
                resFileType = resTypeMap[fileType]
            }
            //path to save the file
            var absFilePath = this.getStepXMLFolderPath(taskParams.taskId, taskParams.stepIndex);

            //path to return for the file
            var srcPath = config.fileStore.resourceFolder + srcPath;
            var destPath = this.getStepXMLFolderPath(taskParams.taskId, taskParams.stepIndex);
            var relativeXmlPath = this.getSimsXmlStepFolderPath(taskParams.taskId, taskParams.stepIndex);

            if (taskParams.parentFolder) {
                destPath += taskParams.parentFolder + "/"
                relativeXmlPath += taskParams.parentFolder + "/";
            }

            destPath += fileName;
        } catch (error) {
            error.message = error.message + "\n<Error occured while creating source and destination path to copy file>";
            return Promise.reject(error);
        }

        return this.copyFile(srcPath, destPath)
            .then((data) => {
                var resolveParam = { "filePath": relativeXmlPath + fileName, "fileType": resFileType };
                return resolveParam;
            })
            .catch((error) => {
                error.message = error.message + "\n<Error occured in function: copyAssetToTaskFolder(), while coppying files>";
                return Promise.reject(error);
            });
    }
    /**
     * @param {*} sourceFileLocation : Location from which file to be copied 
     * Ex: "GO16.WD.12.12B.02.T1/1/1493790231823.DocumentData.json"
     * @param {*} resourceMap : It's an object which contains following key-value pairs:
     *   AssetFolderHierarchy: Any custom folder hierarchy
     *   fileName: "1493790231823.DocumentData.json"
     *   resourceType: "step | skill" => 
     *          skill means that it's a skill resource and has to be copied from "filestore/skills/" folder
     *          step means that it's a user uploaded resource and has to be copied from "filestore/resources/" folder
     * @param {*} taskId : Task ID
     * @param {*} stepIndex : Step Index
     * OUTPUT : This function copies the resource file from a source location to corresponding 
     * destination and returns the promise for same
     */
    copyAssetToTaskFolderEnhanced(sourceFileLocation, resourceMap, taskId, stepIndex) {
        
        if(!sourceFileLocation) {
            return Promise.resolve(true);
        }
        let srcPath;
        let destPath;
        try {
            if (resourceMap.resourceType === "step")
                srcPath = config.fileStore.resourceFolder + sourceFileLocation;
            else
                srcPath = path.join(config.fileStore.skillFolder, sourceFileLocation);

            destPath = path.join(this.getStepAssetsFolderPath(taskId, stepIndex), resourceMap.AssetFolderHierarchy, resourceMap.fileName);

        } catch (error) {
            error.message = error.message + "\n<Error occured while creating source and destination path to copy file>";
            return Promise.reject(error);
        }

        return this.copyFile(srcPath, destPath)
            .catch((error) => {
                error.message = error.message + "\n<Error occured in function: copyAssetToTaskFolderEnhanced(), while coppying files>";
                return Promise.reject(error);
            });
    }

    readTaskRes(filepath, readFileType) {

        var absolutePath = config.fileStore.resourceFolder + filepath;
        if (readFileType && fileTypeFunctionMap[readFileType]) {
            return this[fileTypeFunctionMap[readFileType]](absolutePath);
        }
        else {
            return this.readFile(absolutePath)
            .then((fileData) => {
                let resolveParam = { "fileData": fileData, "filePath": absolutePath };
                return resolveParam;
            }, (err) => {
                return Promise.reject(err);
            })
        }

    }

    getTaskFolderPath(taskId) {
        return '{#approot#}/';
    }

    getSkillFile(filePath, folder) {
        return new Promise((resolve, reject) => {
            let absolutePath = filePath;

            if (folder) {
                absolutePath = folder + filePath;
            }

            fs.readFile(absolutePath, 'utf8', function (error, data) {
                if (error) {
                    error.filePath = filePath;
                    reject(error);
                }
                else {
                    resolve(data);
                }
            });
        })
    }

    saveStepXML(taskId, stepIndex, OutputXML) {

        let folderPath = this.getStepXMLFolderPath(taskId, stepIndex);
        let fileName = "task.xml";//this will come from out side.
        return this.saveFileToFileStore(folderPath, fileName, OutputXML);
    }

    /**
     * 
     * @param {*} taskParams TaskParamas contains task metadata.
     * @param {*} File The data that is to be stored in the File
     * @param {*} FileName Name for the File to be stored
     * Output: Relative Path of the File saved in File Store to be added in Task XML
     */
    saveTaskResources(taskParams, File, FileName) {
        let destPath = this.getStepXMLFolderPath(taskParams.taskId, taskParams.stepIndex);
        let relativeXmlPath = this.getSimsXmlStepFolderPath(taskParams.taskId, taskParams.stepIndex);
        let fileName = FileName; //this will come from out side.
        return this.saveFileToFileStore(destPath, fileName, File).then(() => {
            var relativeResourcePath = relativeXmlPath + fileName;
            return Promise.resolve(relativeResourcePath);
        });
    }

    saveResourceFile() {
        return this.uploadFileHandler();
    }

    removeResourceFile(filePath) {
        filePath = config.fileStore.resourceFolder + filePath;
        return this.removeFile(filePath);
    }

    getFileFromFileStore(filePath, folder) {
        let absolutePath = filePath;

        if (folder) {
            absolutePath = folder + filePath;
        }

        return this.readFile(absolutePath, filePath);

    }

    uploadFileHandler() {

    }

    createFolder(folderPath) {

    }

    getStepXMLFolderPath(taskId, stepIndex) {
        return config.fileStore.xmlFolder + taskId + "/" + stepIndex + "/";
    }

    /**
     * @param {*} taskId : Task ID
     * @param {*} stepIndex : Step Number
     * OUTPUT : Absolute Folder Path of the corresponding Task till the Assets folder
     */
    getStepAssetsFolderPath(taskId, stepIndex) {
        return this.getStepXMLFolderPath(taskId, stepIndex) + "Assets/";
    }

    getUploadedResourceFolderPath(relPath) {
        return config.fileStore.resourceFolder + relPath;
    }

    saveFileToFileStore(filepath, fileName, file) {
        return this.saveFile(filepath, fileName, file)
            .catch((error) => {
                error.message = error.message + "\n<Error occured in function: saveFileToFileStore(), while writing file>"
                return Promise.reject(error);
            });
    }

    getResource(filePath, folder) {
        return this.getFileFromFileStore(filePath, folder);
    }

    getResourcePath(filePath, folder) {
        return folder + filePath;
    }

    copyFile(srcPath, destPath) {

    }

    removeFile(filePath) {

    }

    readFile(absFilePath, relFilePath) {

    }

    saveFile(filepath, fileName, file) {

    }

    getTaskFolderOnLocal(taskId) {

    }
}

module.exports = BaseFileStore;