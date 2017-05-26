const router = require('express').Router(),
  skillTestController = require('./../../controllers/skilltest.controller.js');

/**
 * Get list of templates
 * Query params: app
 * Return Type: Array
 */

router.get('/', (req, res) => {
  let appType = req.query.app;

  skillTestController.getTemplateList(appType)
    .then((templates) => {
      res.send(templates);
    }, (error) => {
      res.send(error);
    });

  /**
   * Sample:
   * [{
      "uuid": "sample-uuid-123",
      "name": "Move Cell Content",
      "meta": {
        "version": 1,
        "description": "Test template for skill related to move cell content",
        "skill": "move cell content",
        "app": "excel"
        }
    }]
   */

});

/**
 * Get template by id
 * Query params: app
 * Return Type: Array
 */

router.get('/:templateId', (req, res) => {
  let appType   = req.query.app,
    templateId  = req.params.templateId;

  skillTestController.getTemplateById(templateId, appType)
    .then((templates) => {
      res.send(templates);
    }, (error) => {
      res.send(error);
    });
});

module.exports = router;
