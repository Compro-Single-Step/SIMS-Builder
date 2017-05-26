const templateService = require('./../modules/skilltest/template.service'),
  mapperService = require('./../modules/skilltest/mapper.service'),
  config = require('./../config/skilltest.config');

class AutomationController {

  /**
   * Controllers for template
   */
  getTemplateList(appType) {

    return new Promise((resolve, reject) => {

      let query = {};
      if (config.apps.isValid(appType)) {
        query.appType = appType.toLowerCase()
      }
      ;

      templateService.getTemplates(query)
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
      }
      ;
      query.uuid = templateId;

      templateService.getTemplates(query)
        .then((templates) => {
          resolve(templates);
        }, (error) => {
          reject(error);
        });

    });
  }

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

module.exports = new AutomationController();


