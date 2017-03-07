const path = require('path');

module.exports.getUIConfig = function(filepath) {
    let absolutePath = path.join(__dirname, "../" + filepath);
    return absolutePath;
};