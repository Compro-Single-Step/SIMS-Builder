const dfsmController = require('./dfsmController');

module.exports.getUIConfig = function(templateId, data, callback) {
    return dfsmController.getUIConfig(templateId, callback);
};