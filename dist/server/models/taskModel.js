var Step = require('../models/stepModel');
class Task {
  constructor(taskDataObj) {
    this.id = taskDataObj.getTaskId();
    this.app = taskDataObj.getTaskApp();
    this.testStatus = taskDataObj.getTaskTestStatus();
    this.commitStatus = taskDataObj.getTaskCommitStatus();
    this.stepData = this.getScenario(taskDataObj.getStepData(), taskDataObj);
  }
  getId() {
    return this.id;
  }
  getStepData() {
    return this.stepData;
  }
  mapStepData(item, index) {
    var step = new Step(this, index);
    return step;
  }
  getScenario(sdata, taskDataObj) {
    return sdata.map(this.mapStepData, taskDataObj);
  }
}
module.exports = Task;