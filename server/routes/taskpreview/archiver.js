var file_system = require('fs');
var request = require('request');
var archiver = require('archiver');
var path = require('path');
var serverRootPath = path.normalize(__dirname + '/../..');

var sourcePath = '\\fileStore\\XMLs\\exp\\xl\\01\\01.t1';

var serverUrl = "http://localhost:4001/ServerCode/SIM5Service.ashx";
var dirToCompress = serverRootPath + sourcePath;

module.exports = function (req, res, next) {
    
var archive = archiver.create('zip', {});

archive.on('error', function (err) {
    throw err;
});

var output = file_system.createWriteStream(serverRootPath+'/tmp/myZip.zip'); //path to create .zip file
console.log(dirToCompress);
output.on('close', function () {
    var req = request.post({
			url: serverUrl,
			qs: {
				Method: "SaveTaskFolder",
				taskId: 'blog example',
				taskFolderPath: +new Date(),
				appID: 'blog example',
				description: "desc",
				xmlPath: "task.xml",
				scenarioType: "T1",
				etextURL: "",
				videoURL: "",
				practiceJSONURL: ""
			}
		}, function (err, resp, body) {
	  		if (err) {
				console.log('Error!');
	  		} 
	  		else {
	    		console.log('URL: ' + body);
	  		}
		}
	);
	var form = req.form();
	form.append('file', file_system.createReadStream(serverRootPath+'/tmp/myZip.zip'));
});

archive.pipe(output);
  archive.directory(dirToCompress, sourcePath);
archive.finalize();
};