const mongoose = require("mongoose"),
  config = require('./../../config/skilltest.config'),
  helper = require('./model.helpers'),
  Schema = mongoose.Schema;


var mapper_schema_search_map = {
  uuid: 'uuid',
  template_id: 'template_id'
};

/**
 * Mapper Schema
 */

const mapperSchema = new Schema({
  "template_id": String,
  "parameters": []
}, {collection: 'test_template_mapper'});


mapperSchema.statics = {
  get: get
};

module.exports = mongoose.model('Mapper', mapperSchema);

/**
 * Mapper model functions
 */

function get(query) {
  return new Promise((resolve, reject) => {

    let condition = helper.getMongoSearchObject(query, mapper_schema_search_map);
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




