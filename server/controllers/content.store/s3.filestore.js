const path = require('path');
const config = require('../../config/config');
const multer = require('multer');
const ResourceUtil = require('../../utils/resourceUtil');
const XMLUtil = require('../../utils/xmlUtil');
const baseFilestore = require('./base.filestore');
const AWS = require('aws-sdk');
const multerS3 = require('multer-s3');
const mkdirp = require('mkdirp');

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

class s3Filestore extends baseFilestore{

    constructor(config){
        super();
        this.s3 = new AWS.S3({
            accessKeyId: config.key,
            secretAccessKey: config.secret,
            signatureVersion: "v4" 
        });
    }

    readCsvFile(absolutePath) {
        return new Promise(function (resolve, reject) {
            let resultArr = [];
            const csv = require('csvtojson');
            csv()
                .fromFile(absolutePath)
                .on('json', (jsonObj) => {
                    console.log(jsonObj);
                    resultArr.push(jsonObj);

                    // combine csv header row and csv line to a json object 
                    // jsonObj.a ==> 1 or 4 
                })
                .on('done', (error) => {
                    if (resultArr.length == 0) {
                        var error = new Error("Error occured while reading the csv type file at path " + absolutePath);
                        reject(error);
                    }
                    else {
                        var resolveParam = { "fileData": resultArr, "filePath": absolutePath };
                        resolve(resolveParam);
                    }
                })
        });
    }


    copyAssetToTaskFolder(srcPath, taskParams) {

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

        return new Promise(function (resolve, reject) {
            let params = {
                Bucket: 'sims-builder-store', /* required */
                CopySource: 'sims-builder-store/' + srcPath, /* required */
                Key: destPath /* required */
            };
            this.s3.copyObject(params, function(err, data) {
                if (err){
                    reject(err);
                } 
                else{
                    var resolveParam = { "filePath": relativeXmlPath + fileName, "fileType": resFileType };
                    resolve(resolveParam);
                }
            });

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

        let srcPath;
        if (resourceMap.resourceType === "step")
            srcPath = config.fileStore.resourceFolder + sourceFileLocation;
        else
            srcPath = path.join(config.fileStore.skillFolder, sourceFileLocation);

        let destPath = path.join(this.getStepAssetsFolderPath(taskId, stepIndex), resourceMap.AssetFolderHierarchy, resourceMap.fileName);

        return new Promise((resolve, reject) => {
            let params = {
                Bucket: 'sims-builder-store', /* required */
                CopySource: 'sims-builder-store/' + srcPath, /* required */
                Key: destPath /* required */
            };
            this.s3.copyObject(params, function(err, data) {
                if (err){
                    reject(err);
                } 
                else{
                    resolve("success");
                }
            });
        });
    }

    readTaskRes(filepath, readFileType) {
        var absolutePath = config.fileStore.resourceFolder + filepath;
        if (readFileType && fileTypeFunctionMap[readFileType]) {

            return this[fileTypeFunctionMap[readFileType]](absolutePath);
        }
        else {
            return new Promise(function (resolve, reject) {
                var params = {
                    Bucket: 'sims-builder-store', /* required */
                    Key: absolutePath, /* required */
                };
                this.s3.getObject(getParams, function(err, data) {
                    if (!err) {
                        var resolveParam = { "fileData": fileData, "filePath": absolutePath };
                        resolve(resolveParam);
                    }
                    else {
                        reject(err);
                    }
                });
            });
        }

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

    removeResourceFile(filePath) {
        return new Promise((resolve, reject) => {
            filePath = config.fileStore.resourceFolder + filePath;
            var params = {
                Bucket: 'sims-builder-store', /* required */
                Key: filePath, /* required */
            };
            this.s3.deleteObject(params, function(error, data) {
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
            let absolutePath = filePath;

            if (folder) {
                absolutePath = folder + filePath;
            }

            var params = {
                Bucket: 'sims-builder-store', /* required */
                Key: absolutePath, /* required */
            };
            this.s3.getObject(params, function(err, data) {
                // Handle any error and exit
                if (err){
                    err.filePath = filePath;
                    reject(err);
                }
                // No error happened
                // Convert Body from a Buffer to a String
                else{
                    let objectData = data.Body.toString('utf-8'); // Use the encoding necessary.
                    resolve(objectData);
                }
                
            });
        })
    }

    uploadFileHandler() {
        let self = this;
        var upload = multer({
            storage: multerS3({
                s3: self.s3,
                bucket: 'sims-builder-store',
                key: function (req, file, callback) {
                    let timestamp = new Date().getTime().toString();
                    let fileName = timestamp + "." + file.originalname;

                    req.body.filePath = req.body.folder + fileName;
                    callback(null, fileName);
                }
            })
        });
        return upload.fields([{ name: 'dzfile', maxCount: 1 }]);
    }

    saveFileToFileStore(filepath, fileName, file) {
        return new Promise((resolve, reject) => {
            this.s3.putObject(
                {
                    Bucket: 'sims-builder-store',
                    Key: filepath + fileName,
                    Body: file
                }, function(err,data){
                    if(err){
                        return Promise.reject(err);
                    }
                    else{
                        return Promise.resolve("saved in directory");
                    }
            });
        })
    }

}

module.exports = s3Filestore;