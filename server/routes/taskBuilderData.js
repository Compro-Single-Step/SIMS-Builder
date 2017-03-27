const express = require('express');
const router = express.Router();
const fs = require('fs');
var request = require('request');
const config = require('../config/config');
var Task = require('../models/taskModel');
var Step = require('../models/stepModel');

router.get("/",function(req,res){
	var taskId = req.query.TaskId;
	var data;
	request(config.taskDataServerUrl+taskId, function (error, response, body) {
		try{
			checkResponse = JSON.parse(body);
		}
		catch(e){
			console.log(e);
		}		
		if(checkResponse.ErrorMessage == null){
			body = mapTaskData(checkResponse);
			res.send(body);
		}
		else
			res.send(JSON.stringify({"Error":checkResponse.ErrorMessage}));
	});
});
 function mapTaskData(res){
    var taskData = new Task(res);
	return taskData;
  }
module.exports = router;