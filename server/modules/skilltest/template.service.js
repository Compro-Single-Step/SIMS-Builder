const dao = require('./dao'),
  config  = require('./../../config/skilltest.config');

class TemplateService {

  getTemplateList(appType) {

    return new Promise((resolve, reject) => {

      let query = {};
      if (config.apps.isValid(appType)) {
        query.appType = appType.toLowerCase()
      }
      ;

      dao.get(config.dao.template, query)
        .then((templates) => {
          let templateMetaList = templates.map(function (obj) {
            return {
              uuid: obj.uuid,
              name: obj.name,
              meta: obj.meta
            };
          });
          resolve(templateMetaList);
        }, (error) => {
          reject(error);
        });

    });
  }

  getTemplateById(templateId, appType) {

    return new Promise((resolve, reject) => {
      let query = {};
      if (config.apps.isValid(appType)) {
        query.app = appType.toLowerCase()
      };
      query.uuid = templateId;

      dao.get(config.dao.template, query)
        .then((templates) => {
          resolve(templates);
        },(error) => {
          reject(error);
        });

    });
  }
}

module.exports = new TemplateService();


