const mongoose = require("mongoose"),
      Schema   = mongoose.Schema;

/**
 * Template Schema
 */
const templateSchema = new Schema({
  "uuid": String,
  "name": String,
  "meta": {},
  "publish": {},
  "items": []
}, {collection: 'automation_templates'});


templateSchema.statics = {
  get: get
};

module.exports = mongoose.model('Template', templateSchema);

/**
 * Template model functions
 */

function get(query) {
  return new Promise((resolve, reject) => {

    let condition = query;
    let projection = {"_id": false};

    this.find(condition, projection, (error, data) => {
      if (error) {
        reject(error);
      } else {
        resolve(data);
      }
    });
  });
}
