declare var jQuery;
class SkillManager {
  skillTranslator: Object;
  constructor() {
    this.skillTranslator = {};
  }

  getMultiScripts(arr) {
    var _arr = arr.map(function(src){
      return jQuery.getScript(src)
    });
    return Promise.all(_arr);
  }

  getSkillTranslator() {
    let allScriptsPromise =  this.getMultiScripts(['moveCellContent.js']);
    return allScriptsPromise;
  }
}

export let skillManager = new SkillManager();