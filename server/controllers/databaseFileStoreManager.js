const dal = require('./databaseAccessLayerController');
const fal = require('./fileAccessLayerController');

module.exports.getUIConfig = function(templateId, callback1) {
    
    let uiconfig; 
    dal.getUIConfigPath(templateId, (data, error) => {
        if(!error && data.success) {
            uiconfig = fal.getUIConfig(data[0].ui_config_path);
            callback1(uiconfig);
        }
    });
};