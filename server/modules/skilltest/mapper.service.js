const mapperModel = require('./../../models/skilltest/mapper.model');

class MapperService {

  getMappers( query ) {
    return mapperModel.get( query );
  };

};

module.exports = new MapperService();


