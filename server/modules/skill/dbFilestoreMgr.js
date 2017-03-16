const dbController = require('../../controllers/db.controller');
const fileStoreController = require('../../controllers/filestore.controller');

module.exports.getUIConfig = function(templateId, callback) {
    dbController.getUIConfigPath(templateId, (filePath, error) => {
        if(!error) {
            fileStoreController.getUIConfig(filePath, callback);
        }
        else {
            callback(error);
        }
    });
};

module.exports.getSkillXML = function(templateId, callback) {
    dbController.getSkillXMLPath(templateId, (filePath, error) => {
        if(!error) {
            fileStoreController.getSkillXML(filePath, callback);
        }
        else {
            callback(error);
        }
    });
};

module.exports.getIOMap = function(templateId, callback) {
    dbController.getIOMapPath(templateId, (filePath, error) => {
        if(!error) {
            fileStoreController.getIOMap(filePath, callback);
        }
        else {
            callback(error);
        }
    });
};

module.exports.getSkillModel = function(templateId, callback) {
    dbController.getSkillModelPath(templateId, (filePath, error) => {
        if(!error) {
            fileStoreController.getSkillModel(filePath, callback);
        }
        else {
            callback(error);
        }
    });
};

module.exports.getStepUIState = function(taskId, stepIndex, callback) {
    dbController.getStepUIState(taskId, stepIndex, (data, error) => {
        callback(data, error);
    });
};

module.exports.saveStepUIState = function(taskId, stepIndex, stepUIData, callback) {
    dbController.saveStepUIState(taskId, stepIndex, stepUIData, (data, error) => {
        callback(data, error);
    });
};