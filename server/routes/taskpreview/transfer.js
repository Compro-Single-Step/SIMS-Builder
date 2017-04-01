var file_system = require('fs');
var path = require('path');
var serverRootPath = path.normalize(__dirname + '/../..');
var request = require('request');
var serverUrl = "http://tanuj/sims_server/ServerCode/SIM5Service.ashx";

module.exports = function (req, res, next) {
var req = request.post({
			url: serverUrl,
			qs: {
				Method: "SaveTaskFolder",
				taskId: 'GO16.XL.03.3A.02.T1',
				stepNo: "",
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
	    		res.locals.urlToLaunch = body;
	    		next();
	  		}
		}
	);
	var form = req.form();
	form.append('file', file_system.createReadStream(serverRootPath+'/tmp/myZip.zip'));
};




