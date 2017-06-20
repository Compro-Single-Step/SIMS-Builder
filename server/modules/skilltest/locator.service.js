const dao = require('./dao'),
  config  = require('./../../config/skilltest.config');

class LocatorService {

  getApplicationLocators (appType) {

    return new Promise((resolve, reject) => {
      let query = [];
      if (config.apps.isValid(appType)) {
        query.push({app : appType.toLowerCase()})
      };

      dao.get(config.dao.locator, query)
        .then((locators) => {
          resolve(locators);
        },(error) => {
          reject(error);
        });

    });
  }
}

module.exports = new LocatorService();


