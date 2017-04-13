const express = require('express');
const router = express.Router();
const fs = require('fs');
const  taskTemplateMapModel = require('../models/taskTemplateMap.model');

var request = require('request');
const config = require('../config/config');
var Task = require('../models/taskModel');
var Step = require('../models/stepModel');


var taskFactory = require('../modules/taskData/TaskFactory')

router.get("/",function(req,res){
	var taskId = req.query.TaskId;
	var data;
	request(config.taskDataServer.Url+taskId, function (error, response, body) {
		try{
			body = JSON.parse(body);
		}
		catch(e){
			console.log(e);
		}	

		if(body.ErrorMessage == null){
			body = mapTaskData(body, config.taskDataServer.name);
			res.send(body);
		}
		else
			res.send(JSON.stringify({"Error":body.ErrorMessage}));
	});
});
 function mapTaskData(res, modelType){
    var taskModel = taskFactory.getTaskDataModel(modelType, res);
	let taskData = new Task (taskModel);	
	return taskData;
  }
router.get("/templateOptions",function(req,res){
	fs.readFile(__dirname+"/../public/TepmlateOptions.json", (err, data) => {
		if (err) throw err;
		res.send(data);
		console.log(data);
		});
});
router.get("/stepTemplate",function(req,res){
	task = req.query.TaskId;
	step = req.query.StepIndex;
	let condition = {"task_id": task};
	let jsonKey = "steps.step_" + step;
	let projection = {"_id": false};
	projection[jsonKey] = true;
	let err;
	let template;
	let stepId = "step_" + step;

	taskTemplateMapModel.getTaskMap(condition, projection, (error, data) => {
		try {
			template = data[0].steps[stepId].template;
		}
		catch (error) {
			err = error;
		}
		finally {
			if(err)
				res.send("Not Selected");
			else
				res.send(template);
		}
 	});
});
router.post("/stepTemplate",function(req,res){
	task = req.body.TaskId;
	step = req.body.StepIndex;
	template = req.body.TemplateId;
	stepData = {
		template:template
	}
	let condition = {"task_id": task};
	let jsonKey = "steps.step_" + step;
	let updateData = { $set: {}};
	updateData.$set[jsonKey] = stepData;
	let options = { upsert: true };
	taskTemplateMapModel.updateTaskMap(condition, updateData, options, (error, success) =>{
		if(error)
			res.send(JSON.stringify({"message": "DATABASE_ERROR"}));
		else
			res.send(JSON.stringify({"message": "TEMPLATE_UPDATED"}));
		});		
});
module.exports = router;