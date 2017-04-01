var file_system = require('fs');
var archiver = require('archiver');
var path = require('path');
var serverRootPath = path.normalize(__dirname + '/../..');

var sourcePath = '\\fileStore\\XMLs\\exp\\xl\\01\\01.t1';


var dirToCompress = serverRootPath + sourcePath;

module.exports = function (req, res, next) {
    
var archive = archiver.create('zip', {});

archive.on('error', function (err) {
    throw err;
});

var output = file_system.createWriteStream(serverRootPath+'/tmp/myZip.zip'); //path to create .zip file

output.on('close', function () {
	next();
});

archive.pipe(output);
archive.directory(dirToCompress, sourcePath);
archive.finalize();
};