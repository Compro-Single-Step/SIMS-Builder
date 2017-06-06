const localFilestore = require('../content.store/local.filestore');
const s3Filestore = require('../content.store/s3.filestore');

module.exports = {
    'local': localFilestore,
    's3': s3Filestore
};