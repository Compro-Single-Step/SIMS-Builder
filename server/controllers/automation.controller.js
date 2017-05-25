const templateService = require('./../modules/automation/template.service'),
      config          = require('./../config/automation.config');

class AutomationController {

  getTemplateList(appType) {

    return new Promise((resolve, reject) => {

      let query = (config.apps.isValid(appType) ? ({'app': appType}) : {});

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
}

module.exports = new AutomationController();


