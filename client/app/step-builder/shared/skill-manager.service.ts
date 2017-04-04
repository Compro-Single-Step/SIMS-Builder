declare var skill;
class SkillManager {
  skillTranslator: Object;
  constructor() { 
    this.skillTranslator = {};
  }

  getSkillTranslator(skillfilesbundle, skillName) {
    var skillTranslatorScript = document.createElement("script");
    skillTranslatorScript.innerHTML = skillfilesbundle;
    document.getElementsByTagName("head")[0].appendChild(skillTranslatorScript);
    skillManager.skillTranslator = skill[skillName].exports;

  }
}

export let skillManager = new SkillManager();