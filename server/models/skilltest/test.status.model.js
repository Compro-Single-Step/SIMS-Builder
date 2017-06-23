const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const testStatusSchema = new Schema({
    task_id: "string",
    task_data: Schema.Types.Mixed
}, { collection: 'test_status_report' });

testStatusSchema.statics = {
    getStepTestStatus: function (taskId, stepIndex) {
        return new Promise((resolve, reject) => {

            let condition = { "task_id": taskId };
            let jsonKey = `task_data.s${stepIndex}`;
            let projection = { "_id": false };
            projection[jsonKey] = true;

            this.find(condition, projection, (error, dbResponse) => {
                if (error) {
                    reject(error);
                } else {
                    let stepId = `s${stepIndex}`;
                    let stepLogs;

                    try {
                        stepLogs = dbResponse[0].task_data[stepId];
                        resolve(stepLogs);
                    } catch (error) {
                        error.message = "Document to corresponding task " + taskId + " doesn't exist in collection";
                        reject(error);
                    }
                }
            });
        });
    },
    getTaskTeststatus: function (taskId) {
        return new Promise((resolve, reject) => {

            let condition = { "task_id": taskId };
            let jsonKey = 'task_data';
            let projection = { "_id": false };
            projection[jsonKey] = true;

            this.find(condition, projection, (error, dbResponse) => {
                if (error) {
                    reject(error);
                } else {
                    let taskStepsLogs;

                    try {
                        taskStepsLogs = dbResponse[0].task_data;
                        resolve(taskStepsLogs);
                    } catch (error) {
                        error.message = "Document to corresponding task " + taskId + " doesn't exist in collection";
                        reject(error);
                    }
                }
            });
        });
    },
    updateStepTestStatus: function (taskId, stepIndex, stepLogs, callback) {
        return new Promise((resolve, reject) => {
            if (stepUIData == undefined || stepUIData == null || stepUIData == "") {
                reject(new Error("null value not allowed for Step UI State"));
            } else {
                let condition = { "task_id": taskId };
                let jsonKey = "task_data.step_" + stepIndex;
                let updateData = { $set: {} };
                updateData.$set[jsonKey] = stepUIData;
                let options = { upsert: true };

                this.collection.update(condition, updateData, options, (error, success) => {
                    if (error) {
                        reject(error);
                    } else {
                        resolve(success);
                    }
                });
            }
        });
    },
    updateTaskTestStatus: function (taskId, taskSteplLogs, callback) {
        return new Promise((resolve, reject) => {
            if (stepUIData == undefined || stepUIData == null || stepUIData == "") {
                reject(new Error("null value not allowed for Step UI State"));
            } else {
                let condition = { "task_id": taskId };
                let jsonKey = "task_data.step_" + stepIndex;
                let updateData = { $set: {} };
                updateData.$set[jsonKey] = stepUIData;
                let options = { upsert: true };

                this.collection.update(condition, updateData, options, (error, success) => {
                    if (error) {
                        reject(error);
                    } else {
                        resolve(success);
                    }
                });
            }
        });
    }
};

let testStatusModel = mongoose.model('test_status_report', testStatusSchema);

module.exports = {
    testStatusModel
};
