const path = require('path');
const config = require('../config/config');
const fs = require('fs');

module.exports.getUIConfig = function(filepath, callback) {
    readFromFileStore(filepath, callback);
};

module.exports.getSkillXML = function(filepath, callback) {
    readFromFileStore(filepath, callback);
};

module.exports.getIOMap = function(filepath, callback) {
    readFromFileStore(filepath, callback);
};

module.exports.getSkillModel = function(filepath, callback) {
    readFromFileStore(filepath, callback);
};

function readFromFileStore(filepath, callback) {
    let absolutePath = config.root + "/" + filepath;

    fs.readFile(absolutePath, 'utf8', function (err, data) {
        callback(err, data);
    });
};