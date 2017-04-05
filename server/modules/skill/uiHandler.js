const dbFilestoreManager = require('./dbFilestoreMgr');

class UIHandler {

    getStepUIConfig(templateId, taskId, stepIndex, callback) {
        dbFilestoreManager.getUIConfig(templateId, (error, uiConfigData) => {
            if(!error) {
                dbFilestoreManager.getSkillModel(templateId, (error, skillModelData) => {
                    if(!error) {
                        let data = {
                            "uiconfig": JSON.parse(uiConfigData),
                            "skillmodel": JSON.parse(skillModelData)
                        }
                        dbFilestoreManager.getStepUIState(taskId, stepIndex, (error, stepUIStateData) => {
                            if(!error) {
                                data.stepuistate = stepUIStateData || null;
                                callback(null, data);
                            } else {
                                data.stepuistate = null;
                                callback(null, data);
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
