const dbFilestoreMgr = require('./dbFilestoreMgr');

module.exports.getUIConfig = function(templateId, data, callback) {
    return dbFilestoreMgr.getUIConfig(templateId, callback);
};