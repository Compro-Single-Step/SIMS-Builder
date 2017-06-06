const path = require('path');
const config = require('../../config/config');
const multer = require('multer');
const ResourceUtil = require('../../utils/resourceUtil');
const baseFilestore = require('./base.filestore');
const AWS = require('aws-sdk');
const s3Module = require('s3');
const multerS3 = require('multer-s3');


class s3Filestore extends baseFilestore{

    constructor(config){
        super();
        this.s3 = new AWS.S3({
            accessKeyId: config.key,
            secretAccessKey: config.secret,
            signatureVersion: "v4" 
        });
    }

    copyFile(srcPath, destPath) {
        let self = this;
        return new Promise((resolve, reject) => {
            let params = {
                Bucket: 'sims-builder-store', /* required */
                CopySource: 'sims-builder-store/' + srcPath.replace(/\\/g, "/"), /* required */
                Key: destPath.replace(/\\/g, "/") /* required */
            };
            self.s3.copyObject(params, function(err, data) {
                if (err){
                    reject(err);
                } 
                else{
                    resolve("success");
                }
            });
        });
    }

    removeFile(filePath) {
        let self = this;
        return new Promise((resolve, reject) => {
            var params = {
                Bucket: 'sims-builder-store', /* required */
                Key: filePath, /* required */
            };
            self.s3.deleteObject(params, function(error, data) {
                if (error) {
                    reject(error);
                } else {
                    resolve("success");
                }
            });
        });
    }

    readFile(absFilePath, relFilePath) {
        let self = this;
        return new Promise((resolve, reject) => { 
            var params = {
                Bucket: 'sims-builder-store', /* required */
                Key: absFilePath, /* required */
            };
            self.s3.getObject(params, function(err, data) {
                // Handle any error and exit
                if (err){
                    err.filePath = relFilePath || absFilePath;
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
                    let taskId = req.body.taskId;
                    let stepIndex = req.body.stepIndex;
                    let resFolderPath = ResourceUtil.getUploadResourceFolderRelativePath(taskId, stepIndex);
                    let timestamp = new Date().getTime().toString();
                    let fileName = timestamp + "." + file.originalname;
                    req.body.filePath = resFolderPath + fileName;
                    callback(null, config.fileStore.resourceFolder + req.body.filePath);
                }
            })
        });
        return upload.fields([{ name: 'dzfile', maxCount: 1 }]);
    }

    saveFile(filepath, fileName, file) {
        var self = this;
        return new Promise((resolve, reject) => {
            self.s3.putObject(
                {
                    Bucket: 'sims-builder-store',
                    Key: filepath + fileName,
                    Body: file
                }, function(err,data){
                    if(err){
                        reject(err);
                    }
                    else{
                        resolve("saved in s3");
                    }
            });
        })
    }

    getTaskFolderOnLocal(taskId){
        var self = this;
        return new Promise((resolve,reject) => {
            var options = {
                s3Client: self.s3
            };
            var client = s3Module.createClient(options);
            var params = {
                localDir: path.join(config.root, 'tmp'),
                deleteRemoved: true, // default false, whether to remove s3 objects 
                // that have no corresponding local file. 
                s3Params: {
                    Bucket: "sims-builder-store",
                    Prefix: config.fileStore.xmlFolder + taskId
                }
            };

            var uploader = client.downloadDir(params);
            uploader.on('error', function (err) {
                reject(err);
            });
            uploader.on('end', function () {
                resolve(params.localDir);
            });
        })
    }

}

module.exports = s3Filestore;