const dataMgr = require('./databaseFileStoreManager');


module.exports.getUIConfig = function(templateId, data, callback) {
    return dataMgr.getUIConfig(templateId, callback);
};