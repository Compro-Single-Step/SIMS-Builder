const mongoose = require("mongoose"),
  config = require('./../../config/skilltest.config'),
  helper = require('./model.helpers'),
  Schema = mongoose.Schema;


var script_schema_search_map = {
  uuid: 'uuid',
  sle_id: 'sle_id'
};

/**
 * Scripts Schema
 */

const scriptSchema = new Schema({
  "sle_id": String,
  "version": String,
  "meta": {},
  "task_json": []
}, {collection: 'test_scripts'});


scriptSchema.statics = {
  get: get,
  save: save
};

module.exports = mongoose.model('Script', scriptSchema);

/**
 * Script model functions
 */

function get(query) {
  return new Promise((resolve, reject) => {

    let condition = helper.getMongoSearchObject(query, script_schema_search_map);
    let projection = {};

        this.find(condition, projection, (error, data) => {
          if (error) {
            reject(error);
          } else {
            resolve(data);
          }
        });
  });
};


function save(scriptData) {
  return new Promise((resolve, reject) => {

    const script = new this(scriptData);

    script.save(( error ) => {
      if (error) {
        console.log(error);
        reject(error);
      }
      resolve(config.messages.saveSuccessful);
    })
  });
};




