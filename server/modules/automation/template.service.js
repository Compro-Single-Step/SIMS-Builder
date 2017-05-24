const templateModel = require('../../models/automation/template.model');

class TemplateService {

  getTemplates( query ) {
    return templateModel.getTemplates( query );
  };

};

module.exports = new TemplateService();


