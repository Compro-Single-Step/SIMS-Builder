var file_system = require('fs');
var archiver = require('archiver');
var path = require('path');
var serverConfig = require('../../config/server.config');
var config = require('../../config/config');

module.exports = function (req, res, next) {
    
var archive = archiver.create('zip', {});
var taskId = req.query.taskId || "GO16.XL.03.3A.02.T1";
var serverRootPath = path.normalize(__dirname + '/../..');
var dirToCompress = config.fileStore.xmlFolder;

archive.on('error', function (err) {
    throw err;
});

var output = file_system.createWriteStream(serverRootPath+'/tmp/myZip.zip'); //path to create .zip file

output.on('close', function () {
	next();
});

archive.pipe(output);
archive.directory(dirToCompress, taskId);
archive.finalize();
};