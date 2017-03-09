const dal = require('./databaseAccessLayerController');
const fal = require('./fileAccessLayerController');

module.exports.getUIConfig = function(templateId, callback) {
    
    let absolutePath; 
    dal.getUIConfigPath(templateId, (data, error) => {
        if(!error && data.success) {
            absolutePath = fal.getAbsoluteFilePath(data[0].ui_config_path);
            callback(absolutePath);
        }
    });
};

module.exports.getSkillXML = function(templateId, callback) {
    
    let absolutePath; 
    dal.getSkillXMLPath(templateId, (data, error) => {
        if(!error && data.success) {
            absolutePath = fal.getAbsoluteFilePath(data[0].skill_xml_path);
            callback(absolutePath);
        }
    });
};

module.exports.getIOMap = function(templateId, callback) {
    
    let absolutePath; 
    dal.getIOMapPath(templateId, (data, error) => {
        if(!error && data.success) {
            absolutePath = fal.getAbsoluteFilePath(data[0].io_map_path);
            callback(absolutePath);
        }
    });
};

module.exports.getSkillModel = function(templateId, callback) {
    
    let absolutePath; 
    dal.getSkillModelPath(templateId, (data, error) => {
        if(!error && data.success) {
            absolutePath = fal.getAbsoluteFilePath(data[0].io_map_path);
            callback(absolutePath);
        }
    });
};

module.exports.getStepUIState = function(taskId, stateIndex, callback) {
    
    dal.getStepUIState(taskId, stateIndex, (data, error) => {
        callback(data, error);
    });
};