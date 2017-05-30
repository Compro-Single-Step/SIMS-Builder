const config = require('./../../config/skilltest.config'),
         dao = require('./dao');

class MapperService {

  getMapperByTemplateId(templateId, appType) {

    return new Promise((resolve, reject) => {
      let query = {};
      if (config.apps.isValid(appType)) {
        query.app = appType.toLowerCase()
      };
      query.template_id = templateId;

      dao.get( config.dao.mapper, query )
        .then((mappers) => {
          resolve(mappers);
        }, (error) => {
          reject(error);
        });
    });
  }
}

module.exports = new MapperService();


