const dal = require('./databaseAccessLayerController');
const fal = require('./fileAccessLayerController');

module.exports.getUIConfig = function(templateId, callback) {
    
    let absolutePath; 
    dal.getUIConfigPath(templateId, (data, error) => {
        if(!error && data.success) {
            absolutePath = fal.getUIConfig(data[0].ui_config_path, callback);
        }
    });
};

module.exports.getSkillXML = function(templateId, callback) {
    
    let absolutePath; 
    dal.getSkillXMLPath(templateId, (data, error) => {
        if(!error && data.success) {
            absolutePath = fal.getSkillXML(data[0].skill_xml_path, callback);
        }
    });
};

module.exports.getIOMap = function(templateId, callback) {
    
    let absolutePath; 
    dal.getIOMapPath(templateId, (data, error) => {
        if(!error && data.success) {
            absolutePath = fal.getIOMap(data[0].io_map_path, callback);
        }
    });
};

module.exports.getSkillModel = function(templateId, callback) {
    
    let absolutePath; 
    dal.getSkillModelPath(templateId, (data, error) => {
        if(!error && data.success) {
            absolutePath = fal.getSkillModel(data[0].io_map_path, callback);
        }
    });
};

module.exports.getStepUIState = function(taskId, stateIndex, callback) {
    
    dal.getStepUIState(taskId, stateIndex, (data, error) => {
        callback(data, error);
    });
};