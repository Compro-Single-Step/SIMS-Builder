const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const testStatusSchema = new Schema({
    task_id: { type: "string", required: true },
    status: { type: "string", required: true },
    steps: { type: Schema.Types.Mixed, required: true },
    pathways: { type: Schema.Types.Mixed, required: true }
}, { collection: 'test_status_report' });

testStatusSchema.statics = {
    getStepTestStatus: function (taskId, step) {
        return new Promise((resolve, reject) => {
            let condition = { "task_id": taskId };
            let jsonKey = `steps.s${step}`;
            let projection = { "_id": false };
            projection[jsonKey] = true;

            this.find(condition, projection, (error, dbResponse) => {
                if (error) {
                    reject(error);
                } else {
                    let stepId = `s${step}`;
                    let stepReport;
                    try {
                        stepReport = dbResponse[0].steps[`s${step}`];
                        if (stepReport) {
                            resolve(stepReport);
                        } else {
                            let error = new Error("Step to corresponding task " + taskId + " doesn't exist in collection");
                            reject(error);
                        }
                    } catch (error) {
                        error.message = "Document to corresponding task " + taskId + " doesn't exist in collection";
                        reject(error);
                    }
                }
            });
        });
    },
    getTaskTestStatus: function (taskId) {
        return new Promise((resolve, reject) => {
            let condition = { 'task_id': taskId };
            let projection = { '_id': false, 'pathways': true, 'status': true };

            this.find(condition, projection, (error, dbResponse) => {
                if (error) {
                    reject(error);
                } else if (dbResponse.length) {
                    let taskReport = {};
                    try {
                        taskReport.pathways = dbResponse[0].pathways;
                        taskReport.status = dbResponse[0].status;
                        resolve(taskReport);
                    } catch (error) {
                        error.message = "Document to corresponding task " + taskId + " doesn't exist in collection";
                        reject(error);
                    }
                } else {
                    let error = new Error("Document to corresponding task " + taskId + " doesn't exist in collection");
                    reject(error);
                }
            });
        });
    },
    updateStepTestStatus: function (taskId, step, pathwaysData) {
        return this.getPathwayData(taskId, step)
            .then((dbData) => {
                // Update this taskData object with stepLogs object and then save it in db.
                let dbPathways;
                delete pathwaysData.taskid;
                let testReportToBeSaved = pathwaysData;

                if (dbData) {
                    dbPathways = dbData;
                    Object.keys(dbPathways).forEach((key) => {
                        if (!testReportToBeSaved['pathways'][key]) {
                            testReportToBeSaved['pathways'][key] = dbPathways[key];
                        }
                    });
                }

                // After updating taskData object.
                let condition = { "task_id": taskId };
                let jsonKey = `steps.s${step}`;
                let updateData = { $set: {} };
                updateData.$set[jsonKey] = testReportToBeSaved;
                let options = { upsert: true };

                return this.updateCollection(condition, updateData, options);
            })
            .catch((error) => {
                return Promise.reject(error);
            });
    },
    updateTaskTestStatus: function (taskId, pathwaysData) {
        return this.getPathwayData(taskId)
            .then((dbData) => {
                let dbPathways;
                delete pathwaysData.taskid;
                let testReportToBeSaved = pathwaysData;

                if (dbData) {
                    dbPathways = dbData;
                    Object.keys(dbPathways).forEach((key) => {
                        if (!testReportToBeSaved['pathways'][key]) {
                            testReportToBeSaved['pathways'][key] = dbPathways[key];
                        }
                    });
                }

                let condition = { "task_id": taskId };
                let updateData = { $set: { 'status': testReportToBeSaved['status'], 'pathways': testReportToBeSaved['pathways'] } };
                let options = { upsert: true };

                return this.updateCollection(condition, updateData, options);
            })
            .catch((error) => {
                return Promise.reject(error);
            });
    },
    getPathwayData: function (taskId, stepIndex) {
        let self = this;
        return new Promise((resolve, reject) => {
            try {
                let condition = { "task_id": taskId };
                let projection = { "_id": false };
                let isStep = false;

                if (stepIndex === undefined || stepIndex === "") {
                    projection['pathways'] = true;
                } else {
                    isStep = true;
                    let jsonKey = `steps.s${stepIndex}`;
                    projection[jsonKey] = true;
                }

                self.find(condition, projection, (error, dbResponse) => {
                    if (error) {
                        reject(error);
                    } else if (dbResponse.length === 0) {
                        resolve(false);
                    } else {
                        try {
                            let taskData = (isStep ? dbResponse[0].steps[`s${stepIndex}`].pathways : dbResponse[0].pathways);
                            resolve(taskData);
                        } catch (error) {
                            resolve(false);
                        }
                    }
                });
            } catch (error) {
                reject(error);
            }
        });
    },
    updateCollection: function (condition, updateData, options) {
        let self = this;
        return new Promise((resolve, reject) => {
            self.collection.update(condition, updateData, options, (error, success) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(success);
                }
            });
        });
    }
};

let testStatusModel = mongoose.model('test_status_report', testStatusSchema);

module.exports = {
    testStatusModel
};
