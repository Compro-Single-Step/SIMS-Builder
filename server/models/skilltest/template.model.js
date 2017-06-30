const mongoose = require("mongoose"),
  config = require('./../../config/skilltest.config'),
  helper = require('./model.helpers'),
  Schema = mongoose.Schema;


var template_schema_search_map = {
  uuid: 'uuid',
  app: 'app_type'
};

/**
 * Template Schema
 */

const templateSchema = new Schema({
  "uuid": String,
  "name": String,
  "meta": {},
  "publish": {},
  "items": []
}, {collection: 'test_templates'});


templateSchema.statics = {
  get: get
};

module.exports = mongoose.model('Template', templateSchema);

/**
 * Template model functions
 */

function get(query) {
  return new Promise((resolve, reject) => {

    let condition = helper.getMongoSearchObject(query, template_schema_search_map);
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




