const router = require('express').Router(),
  skillTestController = require('./../../controllers/skilltest.controller'),
  config = require('./../../config/skilltest.config');

/**
 * Get list of scripts
 * Query params: app
 * Return Type: Array
 */

router.post('/', (req, res) => {

  skillTestController.generateScriptAndRun(req, res)
    .then((status) => {
      res.send(status);
    }, (error) => {
      res.send(error);
    });
});

router.get('/configurations', (req, res) => {

  skillTestController.getRunConfigurations(req, res)
    .then((config) => {
      res.send(config);
    }, (error) => {
      res.send(error);
    });

});



module.exports = router;
