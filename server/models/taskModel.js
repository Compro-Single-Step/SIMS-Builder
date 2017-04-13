var Step = require('../models/stepModel');
class Task {
    constructor(taskDataObj) {
      this.id = taskDataObj.getTaskId();
      this.app = taskDataObj.getTaskApp();
      this.testStatus = taskDataObj.getTaskTestStatus();
      this.commitStatus = taskDataObj.getTaskCommitStatus();
    }
  
  getstepData(taskDataObj){
    var self = this;
   return self.getScenario(taskDataObj.getStepData(),taskDataObj).then((sdata)=>{
      self.stepData =sdata;
      return Promise.resolve(self);
    });
  }
  mapStepData(taskDataObj,index){
    var step = new Step(taskDataObj,index);
    return step.setStepTemplate(taskDataObj,index);
   }
 getScenario(sdata,taskDataObj){
   let promiseArr = [];
   for(let stepIndex=0;stepIndex<sdata.length;stepIndex++){
      promiseArr.push(this.mapStepData(taskDataObj,stepIndex));
   }
   return Promise.all(promiseArr).then((value)=>{
      return Promise.resolve(value);
   })
  }
 }
module.exports = Task;
