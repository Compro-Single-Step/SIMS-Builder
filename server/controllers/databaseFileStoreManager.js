const dal = require('./databaseAccessLayerController');
const fal = require('./fileAccessLayerController');

module.exports.getUIConfig = function(templateId, callback1) {
    
    let absolutePath; 
    dal.getUIConfigPath(templateId, (data, error) => {
        if(!error && data.success) {
            absolutePath = fal.getAbsoluteFilePath(data[0].ui_config_path);
            callback1(absolutePath);
        }
    });
};

module.exports.getSkillXML = function(templateId, callback1) {
    
    let absolutePath; 
    dal.getSkillXMLPath(templateId, (data, error) => {
        if(!error && data.success) {
            absolutePath = fal.getAbsoluteFilePath(data[0].skill_xml_path);
            callback1(absolutePath);
        }
    });
};