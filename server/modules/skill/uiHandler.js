const dbFilestoreManagerObj = require('./dbFilestoreMgr');

class UIHandler {

    getUIConfig(templateId, taskId, stepIndex, callback) {
        return dbFilestoreManagerObj.getUIConfig(templateId, taskId, stepIndex, callback);
    }
}

module.exports = new UIHandler();