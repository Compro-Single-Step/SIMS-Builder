const templateModel = require('./../../models/skilltest/template.model');

class TemplateService {

  getTemplates( query ) {
    return templateModel.get( query );
  };

};

module.exports = new TemplateService();


