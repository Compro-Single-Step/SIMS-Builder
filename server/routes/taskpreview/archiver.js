var file_system = require('fs');
var archiver = require('archiver');
var path = require('path');
var serverConfig = require('../../config/server.config');
var config = require('../../config/config');
var dbFileStoreManager = require('../../modules/skill/dbFilestoreMgr');

module.exports = function (req, res, next) {

    var archive = archiver.create('zip', {});
    var taskId = req.query.taskId || "GO16.XL.03.3A.02.T1";
    var serverRootPath = path.normalize(__dirname + '/../..');
    dbFileStoreManager.getTaskFolderOnLocal(taskId)
        .then((directoryPath) => {
            var dirToCompress = directoryPath;
            var output = file_system.createWriteStream(path.join(serverRootPath, 'myZip.zip')); //path to create .zip file
            archive.on('error', function (err) {
                throw err;
            });
            output.on('close', function () {
                next();
            });

            archive.pipe(output);
            archive.directory(dirToCompress, '');
            archive.finalize();
        })
        .catch((err) => {
            throw err;
        })
};