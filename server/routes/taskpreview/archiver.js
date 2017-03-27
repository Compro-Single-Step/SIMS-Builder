var file_system = require('fs');
var archiver = require('archiver');
var dirToCompress = 'D:\\SIMBuilder\\server\\fileStore\\XMLs\\exp\\xl\\01\\01.t1';

module.exports = function (req, res, next) {
    
var archive = archiver.create('zip', {});
archive.on('error', function (err) {
    throw err;
});

    var output = file_system.createWriteStream('/testDir/myZip.zip'); //path to create .zip file
    output.on('close', function () {
        console.log(archive.pointer() + ' total bytes');
        console.log('archiver has been finalized and the output file descriptor has closed.');
    });

    archive.pipe(output);

    archive.directory(dirToCompress);

    archive.finalize();

};