var file_system = require('fs');
var request = require('request');
var archiver = require('archiver');
var dirToCompress = 'E:\\SIMS-Builder\\server\\fileStore\\XMLs\\exp\\xl\\01\\01.t1';
var serverUrl = "sjkfb";

module.exports = function (req, res, next) {
    
var archive = archiver.create('zip', {});

archive.on('error', function (err) {
    throw err;
});

var output = file_system.createWriteStream('/testDir/myZip.zip'); //path to create .zip file

output.on('close', function () {
    var req = request.post({
			url: "http://localhost:4001/ServerCode/SIM5Service.ashx",
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
	form.append('file', file_system.createReadStream('/testDir/myZip.zip'));
});

archive.pipe(output);

archive.directory(dirToCompress);

archive.finalize();

};