/**
 * Methods used for test script generation and
 * automation of sims
 */

const storeManager = require('./../modules/automation/storage.service');
var config = require('./../config/automation.config');

class AutomationController {

  getTemplateList(appType) {

    return new Promise((resolve, reject) => {
      if (appType) {
        appType = appType.trim().toLowerCase();
      }
      let query = {'app': config.appList.includes(appType) ? appType : null};

      storeManager.getTemplates(query)
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


