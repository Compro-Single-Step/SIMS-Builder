const uiHandler = require('../modules/skill/uiHandler');
const dbFilestoreMgr = require('../modules/skill/dbFilestoreMgr');

module.exports.getUIConfig = function(templateId, data, callback) {
    return uiHandler.getUIConfig(templateId, data, callback);
};

module.exports.saveStepUIState = function(taskId, stepIndex, stepUIData, callback) {
    dbFilestoreMgr.saveStepUIState(taskId, stepIndex, stepUIData, callback);
};