const dbFilestoreManager = require('./dbFilestoreMgr');

class UIHandler {

    getUIConfig(templateId, taskId, stepIndex, contentFilter) {
        return dbFilestoreManager.getUIConfig(templateId);
        // dbFilestoreManager.getUIConfig(templateId, (error, uiConfig) => {
        //     if(!error) {
        //         callback(error, uiConfig);
        //     }
        //     else {
        //         callback(error);
        //     }
        // });
    }
}

module.exports = new UIHandler();


//if(!error) {
                
                // if(contentFilter.skillModelFlag === "true" && contentFilter.stepUIStateFlag === "false") {
                //     dbFilestoreManager.getSkillModel(templateId, (error, skillModel) => {
                //         if(!error) {
                //             let data = {
                //                 'uiconfig': JSON.parse(uiConfig),
                //                 'skillmodel': JSON.parse(skillModel)
                //             }
                //             callback(error, data);
                //         }
                //         else {
                //             callback(error);
                //         }
                //     });
                // }
                // else if(contentFilter.skillModelFlag === "false" && contentFilter.stepUIStateFlag === "true") {
                //     dbFilestoreManager.getStepUIState(taskId, stepIndex, (error, stepUIState) => {
                //         if(!error) {
                //             let data = {
                //                 'uiconfig': JSON.parse(uiConfig),
                //                 'stepuistate': stepUIState
                //             }
                //             callback(error, data);
                //         }
                //         else {
                //             callback(error);
                //         }
                //     });
                // }
                // else if(contentFilter.skillModelFlag === "false" && contentFilter.stepUIStateFlag === "false") {
                //     let data = {
                //         'uiconfig': JSON.parse(uiConfig)
                //     }
                //     callback(error, data);
                // }
                // else { 
                //     dbFilestoreManager.getSkillModel(templateId, (error, skillModel) => {
                //         if(!error) {
                //             dbFilestoreManager.getStepUIState(taskId, stepIndex, (error, stepUIState) => {
                //                 if(!error) {
                //                     let data = {
                //                         'uiconfig': JSON.parse(uiConfig),
                //                         'skillmodel': JSON.parse(skillModel),
                //                         'stepuistate': stepUIState
                //                     }
                //                     callback(error, data);
                //                 }
                //                 else {
                //                     callback(error);
                //                 }
                //             });
                //         }
                //         else {
                //             callback(error);
                //         }
                //     });
                // }
            // }
            // else {
            //     callback(error);
            // }