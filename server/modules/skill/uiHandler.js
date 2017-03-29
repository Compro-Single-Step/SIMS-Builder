const dbFilestoreManager = require('./dbFilestoreMgr');

class UIHandler {

    getStepUIConfig(templateId, taskId, stepIndex) {
        return new Promise((resolve, reject)=> {
            Promise.all([
                dbFilestoreManager.getUIConfig(templateId),
                dbFilestoreManager.getSkillModel(templateId),
                dbFilestoreManager.getStepUIState(taskId, stepIndex)
            ])
            .then(([uiConfig, model, uiState])=> {
                let data = {
                    "uiconfig": JSON.parse(uiConfig),
                    "skillmodel": JSON.parse(model),
                    "stepuistate": uiState
                }
                resolve(data);
            })
            .catch((error)=> {
                reject(error);
            });
        });
    }
}

module.exports = new UIHandler();
