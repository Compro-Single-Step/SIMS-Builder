const scriptService = require('./script.service');
  config = require('./../../config/skilltest.config');

const mapperHandler = require('./mapperHandler'),
  templateHandler = require('./templateHandler');

class ScriptHandler {

  generateScript(script_meta) {
    var _data = {}, scriptData = {};

    return new Promise((resolve, reject) => {

      templateHandler.getTemplateById(script_meta.template_id)
        .then((data) => {
          _data.template = data[0];
          return mapperHandler.getMapperByTemplateId(script_meta.template_id)
        })
        .then((data) => {
          _data.mapper = data[0];
          return this.getScriptBySleId((script_meta.task_id + '.' + script_meta.scenario))
        })
        .then((script) => {

          if (script && script[0]) {
            scriptData = script[0];
          } else {
            scriptData = {
              sle_id: (script_meta.task_id + '.' + script_meta.scenario),
              task_json: [
                {
                  "items": [],
                  "appName": script_meta.appName,
                  "id": script_meta.task_id,
                  "scenario": script_meta.scenario
                },
                [
                  ["\"1\", \"1\""], "\"Primary\""
                ]
              ]
            };
          }
          ;

          return prepareScriptItem(script_meta, _data.template, _data.mapper)
        })
        .then((script_item) => {

          //update script data
          scriptData.task_json[0].items[parseInt(script_meta.step_number) - 1] = script_item;

          // update script pathways
          scriptData.task_json[1] = generatePathways(script_meta.pathways);

          function generatePathways(input) {
            var pathways = [];
            for (var i = 0; i < input.length; i++) {
              pathways.push([('"1","' + input[i] + '"').toString()]);
              pathways.push('"Primary"');
            }
            return pathways;
          }

          resolve(scriptData);

        })
        .catch(error => {
          reject(error);
        });

    })

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

  getScriptBySleId(sleId, appType, format) {

    // todo: apply format, defaults to json
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


;
} // class end
;

/**
 * Generate Item Script
 * @param script_meta
 * @param template
 * @param mapper
 * @returns {any|Promise<T>|*|Promise|Promise<U>|Promise<R>}
 */

function prepareScriptItem(script_meta, template, mapper) {

  return new Promise((resolve, reject) => {
    script_meta.appName = template.meta.app;
    var template_item = template.items[0];

    template_item.template = {
      "id": script_meta.template_id,
      "revision": template.meta.version
    };

    var script_item = mergeTemplateParams(template_item, mapper.parameters, script_meta.params);

    resolve(script_item);

  })
    .catch(e => console.log(e));
};

/**
 * Merge template with scenario params using mapper
 * @param template
 * @param mapper
 * @param params
 * @returns {*}
 */
function mergeTemplateParams(template, mapper, params) {

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

  // private helper
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

/**
 * Get saved script from database
 */
/*function getScriptBySleId(sleId, format) {

 return new Promise((resolve, reject) => {

 let query = {"sle_id": sleId};
 scriptModel.get(query)
 .then((script) => {
 if(format === 'xml') {
 var xmlContent = converterService.jsonToDistXml(script);
 //res.set('Content-Type', 'text/xml');
 resolve(xmlContent);
 } else if(format === 'java') {
 var javaContent = converterService.jsonToDistJava(script);

 //res.set('Content-type', 'text/plain');
 //res.charset = 'UTF-8';

 resolve(javaContent);
 } else {
 resolve(script);
 }
 })
 .catch(e => next(e));

 });
 }*/


module.exports = new ScriptHandler();


