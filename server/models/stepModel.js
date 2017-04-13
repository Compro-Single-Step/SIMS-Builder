class Step {
    constructor(taskDataObj,index){
        this.Index = taskDataObj.getStepIndex(index);
        this.Text = taskDataObj.getStepText(index);
        this.TestStatus = taskDataObj.getStepTestStatus(index);
        this.SkillName = taskDataObj.getStepSkillName(index);
        this.MethodCount = taskDataObj.getStepMethodCount(index);
    }
    setStepTemplate(taskDataObj,index){
        var self =this;
      return taskDataObj.getStepTemplateName(index).then((template)=>{
           self.TemplateName = template;
           return Promise.resolve(self);
       });
    }
}
module.exports = Step;
