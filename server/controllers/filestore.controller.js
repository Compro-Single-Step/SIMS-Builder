const path = require('path');
const config = require('../config/config');
const fs = require('fs');
const multer = require('multer');
const mkdirp = require('mkdirp');

class FileStoreController {

    getUIConfig(filepath, callback) {
        FileStoreController.readFromFileStore(filepath, callback);
    }

    getSkillXML(filepath, callback) {
        FileStoreController.readFromFileStore(filepath, callback);
    }

    getIOMap(filepath, callback) {
        FileStoreController.readFromFileStore(filepath, callback);
    }

    getSkillModel(filepath, callback) {
        FileStoreController.readFromFileStore(filepath, callback);
    }

    static readFromFileStore(filepath, callback) {
        let absolutePath = config.root + "/" + filepath;

        fs.readFile(absolutePath, 'utf8', function (err, data) {
            callback(err, data);
        });
    }

    static uploadFileHandler() {
        let storage = multer.diskStorage({
            destination: function (req, file, callback) {
                let destinationFilePath = config.root + '/fileStore/XMLs';

                mkdirp(destinationFilePath, (error) => {
                    console.log(error);
                });

                callback(null, destinationFilePath);
            },
            filename: function (req, file, callback) {
                callback(null, file.originalname);
            }
        });
        let upload = multer({ storage: storage });
        return upload.fields([{ name: 'Browse', maxCount: 1 }]);
    }

    saveResourceFile() {

        return FileStoreController.uploadFileHandler();
    }

}

module.exports = new FileStoreController();
