const dbFilestoreManager = require('./dbFilestoreMgr');

class UIHandler {

    getUIConfig(templateId, taskId, stepIndex, contentFilter, callback) {
        let uiConfig, skillModel, stepUIState;

            dbFilestoreManager.getUIConfig(templateId, (error, uiConfigData) => {
                if(!error) {
                    uiConfig = uiConfigData;
                    let data = this.createRequestObject(uiConfig, skillModel, stepUIState, contentFilter);
                    if(data) {
                        callback(error, data);
                    }
                } else {
                    callback(error);
                }
            });

            if(contentFilter.skillModelFlag) {
                dbFilestoreManager.getSkillModel(templateId, (error, skillModelData) => {
                    if(!error) {
                        skillModel = skillModelData;
                        let data = this.createRequestObject(uiConfig, skillModel, stepUIState, contentFilter);
                        if(data) {
                            callback(error, data);
                        }
                    } else {
                        callback(error);
                    }
                });
            }
            
            if(contentFilter.stepUIStateFlag) {
                dbFilestoreManager.getStepUIState(taskId, stepIndex, (error, stepUIStateData) => {
                    if(!error) {
                        stepUIState = stepUIStateData;
                        let data = this.createRequestObject(uiConfig, skillModel, stepUIState, contentFilter);
                        if(data) {
                            callback(error, data);
                        }
                    } else {
                        callback(error);
                    }
                });
            }
    }

    createRequestObject(uiConfig, skillModel, stepUIState, contentFilter) {
        if(uiConfig && (!contentFilter.skillModelFlag || skillModel) && (!contentFilter.stepUIStateFlag || stepUIState)) {
            let data = {
                'uiconfig': JSON.parse(uiConfig)
            }
            if(contentFilter.skillModelFlag) {
                data.skillmodel = JSON.parse(skillModel);
            }
            if(contentFilter.stepUIStateFlag) {
                data.stepuistate = stepUIState;
            }
            return data;
        }
    }
}

module.exports = new UIHandler();

