const dbFilestoreManager = require('./dbFilestoreMgr');

class UIHandler {

    getStepUIConfig(templateId, taskId, stepIndex, callback) {
        dbFilestoreManager.getUIConfig(templateId, (error, uiConfigData) => {
            if(!error) {
                dbFilestoreManager.getSkillModel(templateId, (error, skillModelData) => {
                    if(!error) {
                        dbFilestoreManager.getStepUIState(taskId, stepIndex, (error, stepUIStateData) => {
                            if(!error) {
                                let data = {
                                    "uiconfig": JSON.parse(uiConfigData),
                                    "skillmodel": JSON.parse(skillModelData),
                                    "stepuistate": stepUIStateData
                                }
                                callback(error, data);
                            } else {
                                callback(error);
                            }
                        });
                    } else {
                        callback(error);
                    }
                });
            } else {
                callback(error);
            }
        });
    }
}

module.exports = new UIHandler();
