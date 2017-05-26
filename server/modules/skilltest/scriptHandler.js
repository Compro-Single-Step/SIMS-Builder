/*
const skillTestController = require('./../../controllers/skilltest.controller');

class ScriptHandler {

  generateStepScript( templateId ) {

    // request data
    var script_meta = {
      template_id: req.body.template_id,
      step_number: req.body.step_number,
      task_id: req.body.task_id,
      scenario: req.body.scenario,
      params: req.body.params,
      pathways: req.body.methods,
      appName: ""
    };

      // get files for script creation

      return new Promise((resolve, reject) => {

        // create step script

      });


    */
/**
     *
     *//*


    return Promise.all([
      skillTestController.getTemplateById(templateId),
      skillTestController.getMapperByTemplateId(templateId)
    ])
      .then(([template, mapper]) => {

        return Promise.resolve(data);

      })
      .catch(error => {
        return Promise.reject(error);
      });
  };

};

function getScriptBySleId(req, res) {
  let _q = {"sle_id": req.params['taskId']};

  Script.get(_q)
    .then((script) => {
      if(req.query.format === 'xml') {
        var xmlContent = Service.jsonToDistXml(script);
        res.set('Content-Type', 'text/xml');
        return res.send(xmlContent);
      } else if(req.query.format === 'java') {
        var javaContent = Service.jsonToDistJava(script);

        res.set('Content-type', 'text/plain');
        res.charset = 'UTF-8';

        return res.send(javaContent);
      } else {
        return res.json(script);
      }
    })
    .catch(e => next(e));
}


function generateAndSaveScript(req, res, next ) {
  // todo: change to promises and es6 syntax

  // request data
  var script_meta = {
    template_id: req.body.template_id,
    step_number: req.body.step_number,
    task_id: req.body.task_id,
    scenario: req.body.scenario,
    params: req.body.params,
    pathways: req.body.methods,
    appName: ""
  };

  console.log(script_meta);

  prepareScriptItem( script_meta, ( script_item ) => {
      _getScriptByTaskId((script_meta.task_id + '.' + script_meta.scenario), (script) => {
          var scriptData;
          if(script){
            console.log('************** script exist');
            // update existing script
            scriptData = script;
          } else {
            console.log('************** script do not exist');
            scriptData = {
              sle_id: (script_meta.task_id + '.' + script_meta.scenario),
              task_json: [
                {
                  "items": [],
                  "appName" : script_meta.appName,
                  "id" : script_meta.task_id,
                  "scenario" : script_meta.scenario
                },
                [
                  ["\"1\", \"1\""],"\"Primary\""
                ]
              ]
            };
          }

          //update script item
          scriptData.task_json[0].items[parseInt(script_meta.step_number) -1] = script_item;

          // update script pathways
          scriptData.task_json[1] = generatePathways(script_meta.pathways);

          function generatePathways(input){
            var pathways = [];
            for (var i=0; i<input.length; i++) {
              pathways.push([('"1","'+input[i]+'"').toString()]);
              pathways.push('"Primary"');
            }
            return pathways;
          }

          // save updated script
          const _script = new Script(scriptData);

          _script.save()
            .then(savedScript => res.json(savedScript))
            .catch(e => next(e));

        },
        (error) => {
          console.log(error);
        })
    },
    ( error ) => {
      console.log(error);
    }
  );
}

function mergeTemplateParams( template, mapper, params ) {

  // todo: use - var delimeter = '$$';

  var _ret = JSON.stringify(template).replace(/\$\$.*?\$\$/gi, function myFunction(x){return getKeyValue(x);});

  try {
    _ret = JSON.parse(_ret);
  } catch (e){ console.log(e)}

  // private helper
  function getKeyValue(key){
    var ret = null;
    for (var i=0; i<mapper.length; i++){
      let el = mapper[i];
      if((delimeter + el['key'] + delimeter) === key) {
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

function prepareScriptItem( script_meta, done, error ){

  getMapper(script_meta.template_id,function( mapper ){

      getTemplateById(script_meta.template_id, function( template ) {
          console.log(template);
          script_meta.appName = template.meta.app;
          var template_item = template.items[0];

          template_item.template = {
            "id": script_meta.template_id,
            "revision": template.meta.version
          };

          var script_item = mergeTemplateParams(template_item, mapper.parameters, script_meta.params);

          done( script_item );
        },
        ( e ) => {
          error (e);
        }
      )

    },
    ( e ) => {
      error (e);
    }
  )
}

module.exports = new ScriptHandler();


*/
