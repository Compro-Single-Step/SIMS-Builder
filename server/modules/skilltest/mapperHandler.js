const mapperService = require('./mapper.service'),
  config = require('./../../config/skilltest.config');

class MapperHandler {

  /**
   * Controllers for mapper
   */

  getMapperByTemplateId(templateId, appType) {

    return new Promise((resolve, reject) => {
      let query = {};
      if (config.apps.isValid(appType)) {
        query.app = appType.toLowerCase()
      }
      ;
      query.template_id = templateId;

      mapperService.getMappers(query)
        .then((mappers) => {
          resolve(mappers);
        }, (error) => {
          reject(error);
        });

    });
  }
}

module.exports = new MapperHandler();


