const templateService = require('./../modules/skilltest/template.service'),
  mapperService = require('./../modules/skilltest/mapper.service'),
  scriptService = require('./../modules/skilltest/script.service'),
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

  /**
   * Script Controllers
   */

  getScriptList(appType) {

    return new Promise((resolve, reject) => {

      let query = {};
      if (config.apps.isValid(appType)) {
        query.appType = appType.toLowerCase()
      }
      ;

      scriptService.getScripts(query)
        .then((scripts) => {
          let scriptMetaList = scripts.map(function (obj) {
            return obj; // todo: return only meta object
          });
          resolve(scriptMetaList);
        }, (error) => {
          reject(error);
        });

    });
  }

  getScriptBySleId(sleId, appType) {

    return new Promise((resolve, reject) => {
      let query = {};
      if (config.apps.isValid(appType)) {
        query.app = appType.toLowerCase()
      }
      ;
      query.sle_id = sleId;

      scriptService.getScripts(query)
        .then((scripts) => {
          resolve(scripts);
        }, (error) => {
          reject(error);
        });

    });
  }

  generateAndSaveScript(){}

}

module.exports = new AutomationController();


