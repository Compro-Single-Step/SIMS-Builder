const dao = require('./dao'),
  config  = require('./../../config/skilltest.config');

class TemplateService {

  getTemplateList(appType) {

    return new Promise((resolve, reject) => {

      let query = [];
      if (config.apps.isValid(appType)) {
        query.push({appType : appType.toLowerCase()})
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
      let query = [];
      if (config.apps.isValid(appType)) {
        query.push({app : appType.toLowerCase()})
      };
      query.push({uuid : templateId});

      dao.get(config.dao.template, query)
        .then((templates) => {
          resolve(templates);
        },(error) => {
          reject(error);
        });

    });
  }

  getTemplateLinkage(templateId) {

    return new Promise((resolve, reject) => {
      let query = [];
      // for querying with or, and both - add or paramaters inside an array in the query each object as a new element
      if (templateId) {
        query.push({
          "test_template_id": templateId,
          "dev_template_id": templateId
        });
      }

      dao.get(config.dao.linkage, query)
        .then((linkages) => {
          resolve(linkages);
        },(error) => {
          reject(error);
        });

    });
  }
}

module.exports = new TemplateService();


