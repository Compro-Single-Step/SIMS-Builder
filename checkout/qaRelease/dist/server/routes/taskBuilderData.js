const express = require('express');
const router = express.Router();
const fs = require('fs');

var TaskDataJson=null;

router.get("/",function(req,res){
	var taskId = req.query.TaskId;
	fs.readFile(__dirname+"/../public//TaskDataJson/Data.json",function(err,TaskDataJson){
		res.send(TaskDataJson);
	})
})
module.exports = router;