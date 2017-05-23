const storeRepo = require('./content.store/filestore.repository');
const config = require('../config/config');

class FilestoreFactory {
    constructor(config) {
        this.storeType = config.contentStore.type;
        this.storeConfig =  config.contentStore[storeType];
    }

    getFilestoreInstance(){
        var fsClass = this.getFileStoreClass(this.storeType);
        var fsInstance = new fsClass(this.storeConfig);
        return fsInstance;
    }

    getFileStoreClass(storeType) {
        return storeRepo[storeType];
    }
}

module.exports = new FilestoreFactory(config);