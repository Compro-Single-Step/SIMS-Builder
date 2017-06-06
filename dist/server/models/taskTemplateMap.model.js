const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const taskTemplateMapSchema = new Schema({
    task_id: "string",
    steps: Schema.Types.Mixed
}, { collection: 'task_template_map' });

taskTemplateMapSchema.statics = {
    getTaskMap: function (condition, map, callback) {
        this.find(condition, map, callback);
    },
    updateTaskMap: function (updateCriteria, updateData, options, callback) {
        this.update(updateCriteria, updateData, options, callback);
    }
};

module.exports = mongoose.model('task_template_map', taskTemplateMapSchema);