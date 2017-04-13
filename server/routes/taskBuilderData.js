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
			mapTaskData(body, config.taskDataServer.name).then((taskData)=>{
				body = taskData;
				res.send(body);
			});
		}
		else
			res.send(JSON.stringify({"Error":body.ErrorMessage}));
	});
});
 function mapTaskData(res, modelType){
    var taskModel = taskFactory.getTaskDataModel(modelType, res);
	let taskData = new Task (taskModel);
	return taskData.getstepData(taskModel);
  }
router.get("/templateOptions",function(req,res){
	fs.readFile(__dirname+"/../public/TepmlateOptions.json", (err, data) => {
		if (err) throw err;
		res.send(data);
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