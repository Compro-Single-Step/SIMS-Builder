class Step {
    constructor(taskDataObj, index) {
        this.Index = taskDataObj.getStepIndex(index);
        this.Text = taskDataObj.getStepText(index);
        this.TestStatus = taskDataObj.getStepTestStatus(index);
        this.SkillName = taskDataObj.getStepSkillName(index);
        this.MethodCount = taskDataObj.getStepMethodCount(index);
        this.TemplateName = taskDataObj.getStepTemplateName(index);
        this.TemplateId = taskDataObj.getStepTemplateId(index);
    }
    getIndex() {
        return this.Index;
    }
    setSkillName(skillName) {
        this.SkillName = skillName;
    }
    setTemplateName(templateName) {
        this.TemplateName = templateName;
    }
    setTemplateId(templateId) {
        this.TemplateId = templateId;
    }
}
module.exports = Step;