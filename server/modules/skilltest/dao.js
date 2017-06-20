const config = require('./../../config/skilltest.config'),
  mongo_datastore = {
    [config.dao.mapper]: require('./../../models/skilltest/mapper.model.js'),
    [config.dao.script]: require('./../../models/skilltest/script.model.js'),
    [config.dao.template]: require('./../../models/skilltest/template.model.js'),
    [config.dao.locator]: require('./../../models/skilltest/locator.model.js'),
    [config.dao.linkage]: require('./../../models/skilltest/linkage.model.js')
  };

class Dao {

  get(collection, query) {
    return mongo_datastore[collection].get(query);
  };

  save(collection, data) {
    return mongo_datastore[collection].save(data);
  };
};
module.exports = new Dao();


