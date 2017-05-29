const templateHandler = require('./../modules/skilltest/templateHandler'),
  mapperHandler = require('./../modules/skilltest/mapperHandler'),
  scriptHandler = require('./../modules/skilltest/scriptHandler'),
  scriptService = require('./../modules/skilltest/script.service'),
  config = require('./../config/skilltest.config');

class SkillTest {

  /**
   * Controllers for template
   */
  getTemplateList(appType) {
    return templateHandler.getTemplateList(appType);
  }

  getTemplateById(templateId, appType) {

    return templateHandler.getTemplateById(templateId, appType);
  }

  /**
   * Controllers for mapper
   */

  getMapperByTemplateId(templateId, appType) {

    return mapperHandler.getMapperByTemplateId(templateId, appType);
  }

  /**
   * Script Controllers
   */

  getScriptList(appType) {

    scriptHandler.getScriptList(appType);
  }

  getScriptBySleId(sleId, appType, format) {

    scriptHandler.getScriptBySleId(sleId, appType, format);
  }

  generateAndSaveScript( req, res ){

    return new Promise((resolve, reject) => {
      let script_meta = {
        template_id: req.body.template_id,
        step_number: req.body.step_number,
        task_id: req.body.task_id,
        scenario: req.body.scenario,
        params: req.body.params,
        pathways: req.body.methods,
        appName: ""
      };

      // generate script
      scriptHandler.generateScript( script_meta )
        .then((script) => {
          return scriptService.saveScript(script)
        })
        .then((status) => {
          resolve(status)
        })
        .catch(e => reject(e));

    })

  }

}

module.exports = new SkillTest();


