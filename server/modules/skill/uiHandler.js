const DatabaseFileStoreManager = require('./dbFilestoreMgr');

module.exports = class UIHandler {
    
    constructor() {
        this.dbFilestoreMgr = new DatabaseFileStoreManager();
    }

    getUIConfig(templateId, data, callback) {
        return this.dbFilestoreMgr.getUIConfig(templateId, callback);
    }
}