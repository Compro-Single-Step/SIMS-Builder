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
          if(linkages.length) {
            resolve(linkages[0]);
          } else {
            reject({});
          }
        },(error) => {
          reject(error);
        });

    });
  }

  getPathwaysByTemplateId(templateId, step_no, appType) {

    return new Promise((resolve, reject) => {
      this.getTemplateById(templateId, appType)
        .then((templates) => {

          if(!templates.length) {
            reject(config.messages.notFound);
          } else {
            var _methods = {
              "pathways": []
            };

            if (templates[0].items[0].methods.length){
              for(var i in templates[0].items[0].methods) {

                let _m = {
                  name: templates[0].items[0].methods[i].type,
                  [ step_no ] : {
                    "method": (parseInt(i) + 1),
                    "type": templates[0].items[0].methods[i].type
                  }
                }
                _methods.pathways.push(_m);
              }
            }

            resolve(_methods);
          }
        }, (error) => {
          reject(error);
        });

    })
  }

}

module.exports = new TemplateService();


