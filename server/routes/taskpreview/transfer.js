var file_system = require('fs');
var path = require('path');
var serverRootPath = path.normalize(__dirname + '/../..');
var request = require('request');
var serverConfig = require('../../config/server.config');
var serverUrl = serverConfig.previewServerURL + "/ServerCode/SIM5Service.ashx";

module.exports = function (req, res, next) {
var taskId = req.params.taskId || "GO16.XL.03.3A.02.T1";
var req = request.post({
			url: serverUrl,
			qs: {
				Method: "SaveTaskFolder",
				taskId: taskId,
				stepNo: req.params.stepNo || "",
			}
		}, function (err, resp, body) {
	  		if (err) {
				console.log('Error!');
	  		} 
	  		else {
	    		res.locals.urlToLaunch = serverConfig.previewServerURL + "/SIM5Frame.aspx?resLinkID=taskid:" + taskId;
	    		next();
	  		}
		}
	);
	var form = req.form();
	form.append('file', file_system.createReadStream(serverRootPath+'/tmp/myZip.zip'));
};




