const dbFileStoreController = require('./dbFileStoreController');

module.exports.getUIConfig = function(templateId, data, callback) {
    return dbFileStoreController.getUIConfig(templateId, callback);
};