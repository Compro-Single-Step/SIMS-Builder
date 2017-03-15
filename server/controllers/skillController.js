const skillUIController = require('./skillUIController');
const xmlGeneratorController = require('./xmlGeneratorController');

module.exports.getUIConfig = function(templateId, data, callback) {
    return skillUIController.getUIConfig(templateId, data, callback);
};

module.exports.generateStepXML = function(taskId, stepIndex, templateId, callback) {
    return xmlGeneratorController.generateStepXML(taskId, stepIndex, templateId, callback);
};