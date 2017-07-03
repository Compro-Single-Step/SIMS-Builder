const mongoose = require("mongoose"),
  config = require('./../../config/skilltest.config'),
  helper = require('./model.helpers'),
  Schema = mongoose.Schema;


var linkage_schema_search_map = {
  dev_template_id: 'dev_template_id'
};

/**
 * Template Schema
 */

const linkageSchema = new Schema({
  "test_template_id": String,
  "dev_template_id": String
}, {collection: 'template_linkage'});


linkageSchema.statics = {
  get: get
};

module.exports = mongoose.model('Linkage', linkageSchema);

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




