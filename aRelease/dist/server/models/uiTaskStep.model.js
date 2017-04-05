const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const uiTaskStepSchema = new Schema({
    task_id: "string",
    task_data: Schema.Types.Mixed
}, {collection: 'ui_task_step'});

uiTaskStepSchema.statics = {
    getStepUI: function(taskId, stepIndex, callback) {

        let condition = {"task_id": taskId};
        let jsonKey = "task_data.step_" + stepIndex;
        let projection = {"_id": false};
        projection[jsonKey] = true;

        this.find(condition, projection, (error, data) => {
            let stepId = "step_" + stepIndex;
            let stepUIState = data[0].task_data[stepId];
            callback(error, stepUIState);
        });
    },
    updateStepUIData: function(taskId, stepIndex, stepUIData, callback) {

        let condition = {"task_id": taskId};
        let jsonKey = "task_data.step_" + stepIndex;
        let updateData = { $set: {}};
        updateData.$set[jsonKey] = stepUIData;
        let options = { upsert: true };

        this.collection.update(updateCriteria, updateData, options, (error, success) => {
            callback(error, success);
        });
    }
};

let uiTaskStepModel = mongoose.model('ui_task_step', uiTaskStepSchema);

module.exports = {
    uiTaskStepModel
};