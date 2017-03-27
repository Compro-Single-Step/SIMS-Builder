export class Step {
    stepIndex: number;
    stepText: string;
    stepDetails: StepDetails;
    stepTestStatus: boolean

    constructor(){
        this.stepIndex;
        this.stepText;
        this.stepDetails = new StepDetails();
        this.stepTestStatus;
    }
}

export class StepDetails {
    SkillName: string;
    MethodCount: number;
    TemplateName: string
}