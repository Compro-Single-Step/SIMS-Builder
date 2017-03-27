const UIHandler = require('../modules/skill/uiHandler');
const DBFilestoreMgr = require('../modules/skill/dbFilestoreMgr');
const XmlGenerationHandler = require('../modules/skill/xmlGenerationHandler');

module.exports = class SkillController {
    
    constructor() {
        this.uiHandlerObj = new UIHandler();
        this.dbFilestoreMgrObj = new DBFilestoreMgr();
    }
    
    getUIConfig(templateId, data, callback) {
        return this.uiHandlerObj.getUIConfig(templateId, data, callback);
    }

    saveStepUIState(taskId, stepIndex, stepUIData, callback) {
        this.dbFilestoreMgrObj.saveStepUIState(taskId, stepIndex, stepUIData, callback);
    }

    generateXML(templateId, taskId, stepIdx, callback) {
        xmlGenerationHandlerObj.generateStepXML(templateId, taskId, stepIdx, callback);
    }
};


