const dao = require('./dao'),
    config          = require('./../../config/skilltest.config'),
    mapperService   = require('./mapper.service'),
    templateService = require('./template.service');

class ScriptHandler {

  saveScript( scriptData ) {
    return dao.save(config.dao.script ,scriptData );
  };

  generateScript(script_meta) {
    var _data = {};

    return new Promise((resolve, reject) => {

      templateService.getTemplateById(script_meta.template_id)
        .then((data) => {
          _data.template = data[0];
          return mapperService.getMapperByTemplateId(script_meta.template_id)
        })
        .then((data) => {
          _data.mapper = data[0];
          return this.getScriptBySleId((script_meta.task_id + '.' + script_meta.scenario))
        })
        .then((script) => {

          if (script && script[0]) {
            _data.script = script[0];
          } else {
            // todo: prepare this from external config, pass sle id from here, sle id non editable
            _data.script = {
              sle_id: (script_meta.task_id + '.' + script_meta.scenario),
              version: '1.0',
              task_json: [
                {
                  "items": [],
                  "appName": "",
                  "id": script_meta.task_id,
                  "scenario": script_meta.scenario
                },
                [
                  ["\"1\", \"1\""], "\"Primary\""
                ]
              ]
            };
          };

          return this.prepareScriptItem(script_meta, _data.template, _data.mapper)
        })
        .then((script_item) => {

          // todo: init script meta here
          _data.script.task_json.appName = script_meta.appName;

          _data.script.task_json[0].items[parseInt(script_meta.step_number) - 1] = script_item;
          _data.script.task_json[1] = generatePathways(script_meta.pathways);

          function generatePathways(input) {
            var pathways = [];
            for (var i = 0; i < input.length; i++) {
              pathways.push([('"1","' + input[i] + '"').toString()]);
              pathways.push('"Primary"');
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

  getScriptList(appType) {

    return new Promise((resolve, reject) => {

      let query = {};
      if (config.apps.isValid(appType)) {
        query.appType = appType.toLowerCase()
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
      let query = {};
      if (config.apps.isValid(appType)) {
        query.app = appType.toLowerCase()
      }
      ;
      query.sle_id = sleId;

      dao.get(config.dao.script, query)
        .then((scripts) => {
          resolve(scripts);
        }, (error) => {
          reject(error);
        });

    });
  }

  prepareScriptItem(script_meta, template, mapper) {

    return new Promise((resolve, reject) => {
      script_meta.appName = template.meta.app;
      var template_item = template.items[0];

      template_item.template = {
        "id": script_meta.template_id,
        "revision": template.meta.version
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

module.exports = new ScriptHandler();


