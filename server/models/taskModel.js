var Step = require('../models/stepModel');

class Task {
    constructor(res) {
    this.id = res.TaskFriendlyID,
    this.app = this.getAppName(res.TaskFriendlyID),
    this.testStatus = true,
    this.commitStatus = true,
    this.stepData = this.getScenario(res.ScenarioItemList);
    this.previewUrl = "preview/"+res.TaskFriendlyID,
    this.testUrl = "test/"+res.TaskFriendlyID
    }
    
  getAppName(taskid){
    var app = taskid.split(".")[1] // first part of the task id 
    app = app.split("").reverse().join("")  //reverse the string
    app = app.replace(parseInt(app).toString(),"");  //remove integer part from the same
    app = app.split("").reverse().join("")
    return {
		"XL": "Excel",
		"WD": "Word",
		"AC": "Access",
		"PPT": "PPT"
    }[app] || "Access" ;     
  }
  getStepData(item,index){
    var step = new Step(item);
    return step;
   }
 getScenario(sdata){
    return sdata.map(this.getStepData);  
  }
 }
module.exports = Task;