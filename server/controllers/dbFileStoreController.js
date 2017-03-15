const dal = require('./dalController');
const fal = require('./falController');

module.exports.getUIConfig = function(templateId, callback) {
    dal.getUIConfigPath(templateId, (filePath, error) => {
        if(!error) {
            fal.getUIConfig(filePath, callback);
        }
        else {
            callback(error);
        }
    });
};

module.exports.getSkillXML = function(templateId, callback) {
    dal.getSkillXMLPath(templateId, (filePath, error) => {
        if(!error) {
            fal.getSkillXML(filePath, callback);
        }
        else {
            callback(error);
        }
    });
};

module.exports.getIOMap = function(templateId, callback) {
    dal.getIOMapPath(templateId, (filePath, error) => {
        if(!error) {
            fal.getIOMap(filePath, callback);
        }
        else {
            callback(error);
        }
    });
};

module.exports.getSkillModel = function(templateId, callback) {
    dal.getSkillModelPath(templateId, (filePath, error) => {
        if(!error) {
            fal.getSkillModel(filePath, callback);
        }
        else {
            callback(error);
        }
    });
};

module.exports.getStepUIState = function(taskId, stepIndex, callback) {
    dal.getStepUIState(taskId, stepIndex, (data, error) => {
        callback(data, error);
    });
};