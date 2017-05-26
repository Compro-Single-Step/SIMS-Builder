const router = require('express').Router(),
  skillTestController = require('./../../controllers/skilltest.controller.js');

/**
 * Get mapper by template id
 * Return Type: Array
 */

router.get('/:templateId', (req, res) => {
  let appType   = req.query.app,
    templateId  = req.params.templateId;

  skillTestController.getMapperByTemplateId(templateId, appType)
    .then((templates) => {
      res.send(templates);
    }, (error) => {
      res.send(error);
    });
});

module.exports = router;
