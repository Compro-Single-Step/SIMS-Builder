const express = require('express');
const router = express.Router();
const fs = require('fs');
const taskTemplateMapModel = require('../models/taskTemplateMap.model');

var request = require('request');
const config = require('../config/config');
var Task = require('../models/taskModel');
var Step = require('../models/stepModel');


var taskFactory = require('../modules/taskData/TaskFactory')

router.get("/", function (req, res) {
	var taskId = req.query.TaskId;
	var data;
	request(config.taskDataServer.Url + taskId, function (error, response, body) {
		try {
			body = JSON.parse(body);
		}
		catch (e) {
			console.log(e);
		}

		if (body.ErrorMessage == null) {
			mapTaskData(body, config.taskDataServer.name).then((taskData) => {
				body = taskData;
				res.send(body);
			});
		}
		else
			res.send(JSON.stringify({ "Error": body.ErrorMessage }));
	});
});
function mapTaskData(res, modelType) {
	var taskModel = taskFactory.getTaskDataModel(modelType, res);
	let taskData = new Task(taskModel);
	return validateTaskData(taskData);
}
function validateTaskData(taskData) {
	let promiseArr = [];
	let stepData = taskData.getStepData();
	let templateName;
	let TemplateOptions = [];
	return getTemplatOptions().then((templateData) => {
		TemplateOptions = JSON.parse(templateData).templateOptions;
		for (let stepIndex = 0; stepIndex < stepData.length; stepIndex++) { //function getSkillName to bre renamed to getTemplateName if Baloo gives skill name and set only template name in it..
			promiseArr.push(getTemplateName(taskData.getId(), stepData[stepIndex].getIndex()).then((templateId) => {
				if (templateId != "NotSelected" && templateId != null) {
					let index;
					for (index = 0; index < TemplateOptions.length && TemplateOptions[index].id != templateId; index++);
					templateName = TemplateOptions[index].name;
				}
				else {
					templateName = "Not Selected"
				}
				stepData[stepIndex].setSkillName(templateName);
				stepData[stepIndex].setTemplateName(templateName);
				stepData[stepIndex].setTemplateId(templateId);
				Promise.resolve();
			}));
		}
		return Promise.all(promiseArr).then(() => {
			return Promise.resolve(taskData)
		});
	});

}
function getTemplateName(taskId, stepIndex) {
	let condition = { "task_id": taskId };
	let jsonKey = "steps.step_" + stepIndex;
	let projection = { "_id": false };
	projection[jsonKey] = true;
	let err;
	let template;
	let stepId = "step_" + stepIndex;
	return new Promise((resolve, reject) => {
		taskTemplateMapModel.getTaskMap(condition, projection, (error, data) => {
			if (error) throw error;
			try {
				template = data[0].steps[stepId].template;
			}
			catch (error) {
				err = error;
			}
			finally {
				if (err)
					resolve("NotSelected"); //cannot reject as promise.all in taskModel will fail in that case
				else
					resolve(template);
			}
		});
	});

}
router.get("/templateOptions", function (req, res) {
	getTemplatOptions().then((templateData) => {
		res.send(templateData);
	});
});
function getTemplatOptions() {
	let templateOptions;
	return new Promise((resolve, reject) => {
		fs.readFile(__dirname + "/../public/TemplateOptions.json", 'utf8', (err, data) => {
			if (err) throw err;
			templateData = data;
			resolve(templateData);
		});
	});
}
router.post("/stepTemplate", function (req, res) {
	task = req.body.TaskId;
	step = req.body.Step;
	templateId = req.body.TemplateId;
	stepData = {
		template: templateId
	}
	let condition = { "task_id": task };
	let jsonKey = "steps.step_" + step.Index;
	let updateData = { $set: {} };
	updateData.$set[jsonKey] = stepData;
	let options = { upsert: true };
	taskTemplateMapModel.updateTaskMap(condition, updateData, options, (error, success) => {
		if (error)
			res.send(JSON.stringify({ "message": "DATABASE_ERROR" }));
		else
			updateStepData(step, templateId).then((step) => {
				res.send(JSON.stringify({"message": "TEMPLATE_UPDATED",
										"stepData": step}));
			});

	});
});
function updateStepData(step, templateId) {
	let templateName;
	let TemplateOptions;
	return getTemplatOptions().then((templateData) => {
		TemplateOptions = JSON.parse(templateData).templateOptions;
		let index;
		for (index = 0; index < TemplateOptions.length && TemplateOptions[index].id != templateId; index++);
		templateName = TemplateOptions[index].name;
		step.SkillName = templateName;
		step.TemplateName = templateName;
		step.TemplateId = templateId;
		return Promise.resolve(step);
	});
}
module.exports = router;