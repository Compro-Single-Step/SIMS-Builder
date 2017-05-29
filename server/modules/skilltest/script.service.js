const scriptModel = require('./../../models/skilltest/script.model');

class ScriptService {

  getScripts( query ) {
    return scriptModel.get( query );
  };

  saveScript( scriptData ) {
    return scriptModel.save( scriptData );
  };

};

module.exports = new ScriptService();


