const mapperService = require('./../modules/skilltest/mapper.service'),
  templateService = require('./../modules/skilltest/template.service'),
  scriptService = require('./../modules/skilltest/script.service'),
  config = require('./../config/skilltest.config');

class SkillTest {

  /**
   * Controllers for template
   */
  getTemplateList(appType) {
    return templateService.getTemplateList(appType);
  }

  getTemplateById(templateId, appType) {

    return templateService.getTemplateById(templateId, appType);
  }

  /**
   * Controllers for mapper
   */

  getMapperByTemplateId(templateId, appType) {

    return mapperService.getMapperByTemplateId(templateId, appType);
  }

  /**
   * Controllers for script
   */

  getScriptList(appType) {

    return scriptService.getScriptList(appType);
  }

  getScriptBySleId(sleId, appType, format) {

    return scriptService.getScriptBySleId(sleId, appType, format);
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
      scriptService.generateScript( script_meta )
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


