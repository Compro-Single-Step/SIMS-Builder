const mongoose = require("mongoose"),
  config = require('./../../config/skilltest.config'),
  helper = require('./model.helpers'),
  Schema = mongoose.Schema;


var linkage_schema_search_map = {
  task_id: 'task_id'
};

/**
 * Template Schema
 */

const taskTemplateMapSchema = new Schema({
  "task_id": String,
  "steps": {}
}, {collection: 'task_template_map'});


taskTemplateMapSchema.statics = {
  get: get
};

module.exports = mongoose.model('TaskTemplateLinkage', taskTemplateMapSchema);

/**
 * Linkage model functions
 */

function get(query) {
  return new Promise((resolve, reject) => {

    let condition = helper.getMongoSearchObject(query, linkage_schema_search_map);
    let projection = {"_id": false};

        this.find(condition, projection, (error, data) => {
          if (error) {
            reject(error);
          } else {
            resolve(data);
          }
        });
  });
};




