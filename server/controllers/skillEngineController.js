const skillController = require('./skillController');

module.exports.getUIConfig = function(templateId, data, callback) {
    return skillController.getUIConfig(templateId, data, callback);
};