const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const taskStepUISchema = new Schema({
    task_id: "string",
    ui_task_data: Schema.Types.Mixed
}, {collection: 'ui_task_step'});

taskStepUISchema.statics = {
    getStepUI: function(condition, map, callback) {
        this.find(condition, map, callback);
    },
    updateStepUIData: function(updateCriteria, updateData, options, callback) {
        this.collection.update(updateCriteria, updateData, options, callback);
    }
};

let taskStepUIModel = mongoose.model('ui_task_step', taskStepUISchema);

module.exports = {
    taskStepUIModel
};