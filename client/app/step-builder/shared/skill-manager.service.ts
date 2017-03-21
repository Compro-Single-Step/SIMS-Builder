class SkillManager {
  skillTranslator: Object;
  constructor() { 
    this.skillTranslator = this.getSkillTranslator();
  }

  getSkillTranslator(){
        this.skillTranslator = require("../../../../server/libs/skills/xl/moveCellContent/moveCellContent.js");
        return this.skillTranslator;
  }
}

export let skillManager = new SkillManager();