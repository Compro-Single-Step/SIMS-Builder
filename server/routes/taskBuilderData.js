const express = require('express');
const router = express.Router();
const fs = require('fs');
var request = require('request');

var TaskDataJson=null;

router.get("/",function(req,res){
	var taskId = req.query.TaskId;
	var data;
	request('http://billi.comprotechnologies.com/SIMsInternal/internal/ScenarioPathways.ashx?scenario='+taskId, function (error, response, body) {
		checkResponse = JSON.parse(body);
		if(checkResponse.ErrorMessage == null)
			res.send(body);
		else
			res.send(JSON.stringify({"Error":checkResponse.ErrorMessage}));
	});

})
module.exports = router;