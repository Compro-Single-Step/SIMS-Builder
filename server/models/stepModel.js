class Step {
    constructor(taskRef,index){
        this.Index = taskRef.getStepIndex(index);
        this.Text = taskRef.getStepText(index);
        this.TestStatus = taskRef.getStepTestStatus(index);
        this.SkillName = taskRef.getStepSkillName(index);
        this.MethodCount = taskRef.getStepMethodCount(index);
        this.TemplateName = taskRef.getStepTemplateName(index);
    }
}
module.exports = Step;
