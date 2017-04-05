class Step {
    constructor(taskDataObj,index){
        this.Index = taskDataObj.getStepIndex(index);
        this.Text = taskDataObj.getStepText(index);
        this.TestStatus = taskDataObj.getStepTestStatus(index);
        this.SkillName = taskDataObj.getStepSkillName(index);
        this.MethodCount = taskDataObj.getStepMethodCount(index);
        this.TemplateName = taskDataObj.getStepTemplateName(index);
    }
}
module.exports = Step;
