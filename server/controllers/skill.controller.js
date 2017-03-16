const uiHandler = require('../modules/skill/uiHandler');

module.exports.getUIConfig = function(templateId, data, callback) {
    return uiHandler.getUIConfig(templateId, data, callback);
};