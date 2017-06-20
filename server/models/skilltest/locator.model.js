const mongoose = require("mongoose"),
  config = require('./../../config/skilltest.config'),
  helper = require('./model.helpers'),
  Schema = mongoose.Schema;


var locator_schema_search_map = {
  app: 'app_type'
};

/**
 * Template Schema
 */

const locatorSchema = new Schema({
  "app_type": String,
  "last_modified": Date,
  "xpath": {},
  "tags": []
}, {collection: 'test_element_locators'});


locatorSchema.statics = {
  get: get
};

module.exports = mongoose.model('Locator', locatorSchema);

/**
 * Locator model functions
 */

function get(query) {
  return new Promise((resolve, reject) => {

    let condition = helper.getMongoSearchObject(query, locator_schema_search_map);
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




