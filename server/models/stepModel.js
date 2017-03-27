class Step {
    constructor(item){
        this.stepIndex = item.ScenarioOrder;
        this.stepText = item.QuesText;
        this.stepDetails = new StepDetails(item.ScenarioPathwayList.length);
        this.stepTestStatus = true;
    }
}
class StepDetails {
    constructor(methodCount){
        this.SkillName ="Demo Skill";
        this.MethodCount=methodCount;
        this.TemplateName="Demo Template";
    }
}
module.exports = Step;