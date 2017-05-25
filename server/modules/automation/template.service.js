const templateModel = require('../../models/automation/template.model');

class TemplateService {

  getTemplates( query ) {
    return templateModel.get( query );
  };

};

module.exports = new TemplateService();


