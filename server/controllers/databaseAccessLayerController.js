//const skillController = require('./skillController');
const skillConfigRepoModel = require('../molels/skillConfigRepoModel').skill_config_repo;

module.exports.getUIConfigPath = function(templateId, callback) {
    skillConfigRepoModel.getConfigPath({"template_id": templateId}, {"ui_config_path": true, "_id": false}, (error, data) => {
        if(!error && data !== null) {
            data.success = true;
        }
        callback(data, error);
    });
};