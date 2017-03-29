var file_system = require('fs');
var path = require('path');
var serverRootPath = path.normalize(__dirname + '/../..');
var request = require('request');
var serverUrl = "http://localhost/sim5ongit/ServerCode/SIM5Service.ashx";

module.exports = function (req, res, next) {
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
};




