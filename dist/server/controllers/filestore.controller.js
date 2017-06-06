const fileStoreInstance = require('./filestore.factory').getFilestoreInstance();
const config = require('../config/config');

const fileTypeFolderMap = {
    "SKILL": config.fileStore.skillFolder,
    "RESOURCE": config.fileStore.resourceFolder,
    "XML": config.fileStore.xmlFolder
};

module.exports.fileStoreController = fileStoreInstance;
module.exports.fileTypeFolderMap = fileTypeFolderMap;