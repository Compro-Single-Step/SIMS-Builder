class Step {
    constructor(taskDataObj,index){
        this.Index = taskDataObj.getStepIndex(index);
        this.Text = taskDataObj.getStepText(index);
        this.TestStatus = taskDataObj.getStepTestStatus(index);
        this.SkillName = taskDataObj.getStepSkillName(index);
        this.MethodCount = taskDataObj.getStepMethodCount(index);
        this.TemplateName = taskDataObj.getStepTemplateName(index);
    }
    getIndex(){
        return this.Index;
    }
    setSkillName(skillName){
        this.SkillName = skillName;
    }
    setTemplateName(templateName){
        this.TemplateName = templateName;
    }
    // setStepTemplate(taskDataObj,index){
    //     var self =this;
    //   return taskDataObj.getStepTemplateName(index).then((template)=>{
    //        self.TemplateName = template;
    //        return Promise.resolve(self);
    //    });
    // }
    // getSIMSTemplateName(SkillName){

    // }
}
module.exports = Step;
