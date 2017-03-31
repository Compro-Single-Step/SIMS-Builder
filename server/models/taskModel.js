var Step = require('../models/stepModel');
class Task {
    constructor(taskRef) {
      this.id = taskRef.getTaskId();
      this.app = taskRef.getTaskApp();
      this.testStatus = taskRef.getTaskTestStatus();
      this.commitStatus = taskRef.getTaskCommitStatus();
      this.stepData = this.getScenario(taskRef.getStepData(),taskRef);
    }

  mapStepData(item,index){
    var step = new Step(this,index);
    return step;
   }
 getScenario(sdata,taskRef){
    return sdata.map(this.mapStepData,taskRef);  
  }
 }
module.exports = Task;
