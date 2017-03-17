const path = require('path');
const config = require('../config/config');
const fs = require('fs');

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
}

module.exports = new FileStoreController();
