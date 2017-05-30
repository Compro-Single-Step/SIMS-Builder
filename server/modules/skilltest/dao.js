const config = require('./../../config/skilltest.config'),
  datastore = {
    [config.dao.mapper]: require('./../../models/skilltest/mapper.model.js'),
    [config.dao.script]: require('./../../models/skilltest/script.model.js'),
    [config.dao.template]: require('./../../models/skilltest/template.model.js')
  };

class Dao {

  get(collection, query) {
    return datastore[collection].get(query);
  };

  save(collection, data) {
    return datastore[collection].save(data);
  };
};
module.exports = new Dao();


