const router = require('express').Router(),
  skillTestController = require('./../../controllers/skilltest.controller.js');

/**
 * Get list of templates
 * Query params: app
 * Return Type: Array
 */

router.get('/', (req, res) => {
  let appType = req.query.app;

  skillTestController.getScriptList(appType)
    .then((scripts) => {
      res.send(scripts);
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

router.get('/:sleId', (req, res) => {
  let appType   = req.query.app,
    sleId  = req.params.sleId;

  skillTestController.getScriptBySleId(sleId, appType)
    .then((scripts) => {
      res.send(scripts);
    }, (error) => {
      res.send(error);
    });
});

router.post('/', (req, res) => {

  skillTestController.generateAndSaveScript(req, res)
    .then((status) => {
      res.send(status);
    }, (error) => {
      res.send(error);
    });
});

module.exports = router;
