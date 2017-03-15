const skillUIController = require('./skillUIController');
const xmlGenerationController = require('./xmlGenerationController');

module.exports.getUIConfig = function(templateId, data, callback) {
    return skillUIController.getUIConfig(templateId, data, callback);
};

module.exports.generateStepXML = function(taskId, stepIndex, templateId, callback) {
    return xmlGenerationController.generateStepXML(taskId, stepIndex, templateId, callback);
};