const express = require('express');
const router = express.Router();
const fs = require('fs');
var request = require('request');
const config = require('../config/config');
var Task = require('../models/taskModel');
var Step = require('../models/stepModel');

var taskFactory = require('../modules/taskData/TaskFactory');

router.get("/", function (req, res) {
	var taskId = req.query.TaskId;
	var data;
	request(config.taskDataServer.Url + taskId, function (error, response, body) {
		try {
			body = JSON.parse(body);
		} catch (e) {
			console.log(e);
		}

		if (body.ErrorMessage == null) {
			body = mapTaskData(body, config.taskDataServer.name);
			res.send(body);
		} else res.send(JSON.stringify({ "Error": body.ErrorMessage }));
	});
});
function mapTaskData(res, modelType) {
	var taskModel = taskFactory.getTaskDataModel(modelType, res);
	let taskData = new Task(taskModel);
	return taskData;
}
module.exports = router;