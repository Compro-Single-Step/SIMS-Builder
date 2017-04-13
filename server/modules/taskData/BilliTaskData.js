var TaskdataInterface = require('./taskdataInterface'); //all the functions of this class are to be overloaded by the class extending it.
const  taskTemplateMapModel = require('../../models/taskTemplateMap.model');

class BilliTaskData extends TaskdataInterface {
   constructor(res) {
    //this.getInterfaceInstance = factory.getInstance(config. billi/ baloo)
    super();
    this.taskData = res;
    }
    
  getAppName(taskid){ //function not for TaskdataInterface
    var app = taskid.split(".")[1] // first part of the task id 
    app = app.split("").reverse().join("")  //reverse the string
    app = app.replace(parseInt(app).toString(),"");  //remove integer part from the same
    app = app.split("").reverse().join("") //reverse the string back to normal
    return {
		"XL": "Excel",
		"WD": "Word",
		"AC": "Access",
		"PPT": "PPT"
    }[app] || "Access" ;     
  }
   getTaskId(){
       return this.taskData.TaskFriendlyID;
    }
    getTaskApp(){
        return this.getAppName(this.taskData.TaskFriendlyID);
    }
    getTaskTestStatus(){
        return true;
    }
    getTaskCommitStatus(){
        return true;
    }
    getStepData(){
        return this.taskData.ScenarioItemList;
    }
    getStepIndex(index){
      return this.taskData.ScenarioItemList[index].ScenarioOrder;
    }
    getStepText(index){
      return this.taskData.ScenarioItemList[index].QuesText;
    }
    getStepTestStatus(index){
      return true;
    }
    getStepSkillName(index){
      return ; //to be changed if skill field added to Billi Api
    }
    getStepMethodCount(index){
      return this.taskData.ScenarioItemList[index].ScenarioPathwayList.length;
    }
    getStepTemplateName(index, callback){
      let stepIndex = this.taskData.ScenarioItemList[index].ScenarioOrder;
      let condition = {"task_id": this.taskData.TaskFriendlyID};
      let jsonKey = "steps.step_" + stepIndex;
      let projection = {"_id": false};
      projection[jsonKey] = true;
      let err;
      let template;
      let stepId = "step_" + stepIndex;
      return new Promise((resolve, reject) => {
        taskTemplateMapModel.getTaskMap(condition, projection, (error, data) => {
        try {
          template = data[0].steps[stepId].template;
        }
        catch (error) {
          err = error;
        }
        finally {
          if(err)
            resolve ("Not Selected"); //cannot reject as promise.all in taskModel will fail in that case
          else
            resolve (template);
        }
      });
      });
      
    }
    
}
module.exports = BilliTaskData;