const skillUIController = require('./skillUIController');

module.exports.getUIConfig = function(templateId, data, callback) {
    return skillUIController.getUIConfig(templateId, data, callback);
};