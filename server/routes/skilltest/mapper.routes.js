const router = require('express').Router(),
  skillTestController = require('./../../controllers/skilltest.controller.js'),
  config = require('./../../config/skilltest.config');

/**
 * Get mapper by template id
 * Return Type: Array
 */

router.get('/:templateId', (req, res) => {
  let appType   = req.query.app,
    templateId  = req.params.templateId;

  skillTestController.getMapperByTemplateId(templateId, appType)
    .then((mappers) => {
      if(!mappers.length) {
        res.status(404).send(config.messages.notFound);
      } else{
        res.send(mappers[0]);
      }
    }, (error) => {
      res.send(error);
    })
    .catch(er => {
      res.send(er);
    });
});

module.exports = router;
