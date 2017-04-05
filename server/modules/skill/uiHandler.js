const dbFilestoreManager = require('./dbFilestoreMgr');

class UIHandler {

    getStepUIConfig(templateId, taskId, stepIndex) {
        return new Promise((resolve, reject)=> {
            Promise.all([
                dbFilestoreManager.getUIConfig(templateId),
                dbFilestoreManager.getSkillModel(templateId)
            ])
            .then(([uiConfig, model])=> {
                let data = {
                    "uiconfig": JSON.parse(uiConfig),
                    "skillmodel": JSON.parse(model)
                }

                dbFilestoreManager.getStepUIState(taskId, stepIndex)
                .then((uiState)=> {
                    data.stepuistate = uiState || null;
                    resolve(data);
                }, (error)=> {
                    data.stepuistate = null;
                    resolve(data);
                });
            })
            .catch((error)=> {
                reject(error);
            });
        });
    }
}

module.exports = new UIHandler();
