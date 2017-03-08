const dal = require('./databaseAccessLayerController');
const fal = require('./fileAccessLayerController');

module.exports.getUIConfig = function(templateId, callback1) {
    
    let absolutePath; 
    dal.getUIConfigPath(templateId, (data, error) => {
        if(!error && data.success) {
            absolutePath = fal.getUIConfig(data[0].ui_config_path);
            callback1(absolutePath);
        }
    });
};