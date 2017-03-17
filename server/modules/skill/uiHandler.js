const dbFilestoreManagerObj = require('./dbFilestoreMgr');

class UIHandler {

    getUIConfig(templateId, data, callback) {
        return dbFilestoreManagerObj.getUIConfig(templateId, callback);
    }
}

module.exports = new UIHandler();