var file_system = require('fs');
var path = require('path');
var serverRootPath = path.normalize(__dirname + '/../..');
var request = require('request');
var serverConfig = require('../../config/server.config');
var serverUrl = serverConfig.previewServerURL + "/ServerCode/SIM5Service.ashx";
var xmlUtil = require('../../utils/xmlUtil');

module.exports = function (req, res, next) {
try{
	var taskId = req.query.taskId || "GO16.XL.03.3A.02.T1";
	var req = request.post({
				url: serverUrl,
				qs: {
					Method: "SaveTaskFolder",
					taskId: taskId,
					taskFolderPath: xmlUtil.generateTaskFolderPath(taskId),
					stepNo: req.query.stepNo || "1",
				}
			}, function (err, resp, body) {
				if (err) {
					console.log('Error!');
					err.error = "Tranfer Process failed"
					next(err);
				} 
				else {
					res.locals.urlToLaunch = serverConfig.previewServerURL + "/SIM5Frame.aspx?resLinkID=taskid:" + taskId;
					next();
				}
			}
		);
		var form = req.form();
		form.append('file', file_system.createReadStream(serverRootPath+'/myZip.zip'));
}catch(err){
	err.error = "Tranfer Process failed"
	next(err);
	}
};




