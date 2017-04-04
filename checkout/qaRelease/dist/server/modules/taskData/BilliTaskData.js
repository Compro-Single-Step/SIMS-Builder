var TaskdataInterface = require('./taskdataInterface'); //all the functions of this class are to be overloaded by the class extending it.

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
      return "DemoSkill";
    }
    getStepMethodCount(index){
      return this.taskData.ScenarioItemList[index].ScenarioPathwayList.length;
    }
    getStepTemplateName(index){
      return "Demo Template";
    }
}
module.exports = BilliTaskData;