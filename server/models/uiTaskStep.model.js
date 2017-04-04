const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const uiTaskStepSchema = new Schema({
    task_id: "string",
    task_data: Schema.Types.Mixed
}, {collection: 'ui_task_step'});

uiTaskStepSchema.statics = {
    getStepUI: function(taskId, stepIndex) {
        return new Promise((resolve, reject)=> {
            let condition = {"task_id": taskId};
            let projection = {"_id": false, "task_data": true};

            this.find(condition, projection, (error, data) => {
                if(!error) {
                    if(data.length > 0) {
                        let stepId = "step_" + stepIndex;
                        let stepUIState = data[0].task_data[stepId];
                        resolve(stepUIState);
                    }
                    else {
                        reject({error: "Document to corresponding task " + taskId + " doesn't exist in collection"});
                    }
                }
                else {
                    reject(error);
                }
            });
        });
    },
    updateStepUIData: function(taskId, stepIndex, stepUIData, callback) {
        return new Promise((resolve, reject)=> {
            
            let condition = {"task_id": taskId};
            let jsonKey = "task_data.step_" + stepIndex;
            let updateData = { $set: {}};
            updateData.$set[jsonKey] = stepUIData;
            let options = { upsert: true };

            this.collection.update(condition, updateData, options, (error, success) => {
                if(error) {
                    reject(error);
                }
                else {
                    resolve(success);
                }
            });
        });
    }
};

let uiTaskStepModel = mongoose.model('ui_task_step', uiTaskStepSchema);

module.exports = {
    uiTaskStepModel
};
