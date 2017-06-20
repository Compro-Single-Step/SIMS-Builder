const dao = require('./dao'),
    config          = require('./../../config/skilltest.config'),
    mapperService   = require('./mapper.service'),
    templateService = require('./template.service');

class ScriptService {

  saveScript( scriptData ) {
    return dao.save(config.dao.script ,scriptData );
  };

  getScriptList(appType) {

    return new Promise((resolve, reject) => {

      let query = [];
      if (config.apps.isValid(appType)) {
        query.push({appType : appType.toLowerCase()})
      };

      dao.get(config.dao.script, query)
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
      let query = [];
      if (config.apps.isValid(appType)) {
        query.push({appType : appType.toLowerCase()})
      }
      ;
      query.push({sle_id : sleId})

      dao.get(config.dao.script, query)
        .then((scripts) => {
          resolve(scripts);
        }, (error) => {
          reject(error);
        });

    });
  }

  generateScript(script_meta) {
    var _data = {};

    return new Promise((resolve, reject) => {

      Promise.all([

            templateService.getTemplateById(script_meta.template_id),
            mapperService.getMapperByTemplateId(script_meta.template_id),
            this.getScriptBySleId((script_meta.sle_id))

        ]).then(( [template, mapper, script] ) => {

          _data = {
            template: template[0],
            mapper: mapper[0]
          }
          if (script && script[0]) {
            _data.script = script[0];
          } else {
            _data.script = config.script.getBlankScript(script_meta);
          };

          return this.prepareScriptItem(script_meta, _data.template, _data.mapper)
        })
        .then((script_item) => {

          // update script content
          _data.script.task_json[0].appName = script_meta.appName;
          _data.script.task_json[0].items[parseInt(script_meta.step_number) - 1] = script_item;
          if(script_meta.pathways) {
            _data.script.task_json[1] = generatePathways(script_meta.pathways);
          }

          function generatePathways(input) {  // todo: update/remove fixed for single item
            var pathways = [];
            for (var i = 0; i < input.length; i++) {

              let _m = (parseInt(input[i][script_meta.step_number]['index']) + 1).toString();

              pathways.push([('"'+script_meta.step_number+'","' + _m + '"').toString()]);
              pathways.push('"'+input[i].name+'"');
            }
            return pathways;
          }
          resolve(_data.script);
        })
        .catch(error => {
          reject(error);
        });
    })
  }

  prepareScriptItem(script_meta, template, mapper) {

    return new Promise((resolve, reject) => {
      script_meta.appName = template.meta.app;
      var template_item = template.items[0];

      template_item.template = {
        "uuid": template.uuid,
        "revision": template.meta.revision
      };

      var script_item = this.mergeTemplateParams(template_item, mapper.parameters, script_meta.params);

      resolve(script_item);

    })
      .catch(e => console.log(e));
  };

  mergeTemplateParams(template, mapper, params) {

    var delimeter = '$$';

    var _ret = JSON.stringify(template).replace(/\$\$.*?\$\$/gi,
      function myFunction(x) {
        return getKeyValue(x);
      });

    try {
      _ret = JSON.parse(_ret);
    } catch (e) {
      console.log(e)
    }

    function getKeyValue(key) {
      var ret = null;
      for (var i = 0; i < mapper.length; i++) {
        let el = mapper[i];
        if ((delimeter + el['key'] + delimeter) === key) {
          ret = el['refer']['ext_key'];
          break;
        }
      }
      if (ret !== null) {
        ret = (params[ret] === undefined ? ret : params[ret]);
      }
      return ret;
    };

    return _ret;
  };

};

module.exports = new ScriptService();


