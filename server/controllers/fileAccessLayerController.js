const path = require('path');
const config = require('../config/config');

module.exports.getAbsoluteFilePath = function(filepath) {
    let absolutePath = config.root + "/" + filepath;
    return absolutePath;
};