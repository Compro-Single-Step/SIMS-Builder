const scriptModel = require('./../../models/skilltest/script.model');

class ScriptService {

  getScripts( query ) {
    return scriptModel.get( query );
  };

};

module.exports = new ScriptService();


