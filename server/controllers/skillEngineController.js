const skillController = require('./skillController');

module.exports.getUIConfig = function(templateId, data, callback) {
    return skillController.getUIConfig(templateId, data, callback);
};

module.exports.generateStepXML = function(taskId, stepIndex, templateId, callback) {
    return skillController.generateStepXML(taskId, stepIndex, templateId, callback);
};