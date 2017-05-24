const templateModel = require('../../models/automation/template.model');

/**
 * Responsibility: management & routing of storage function calls
 * Currently, automation module only require Mongo database storage
 */

class StorageManager {

  getTemplates( query ) {
    return templateModel.getTemplates( query );
  };

};

module.exports = new StorageManager();


