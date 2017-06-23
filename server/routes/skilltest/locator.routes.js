const router = require('express').Router(),
  skillTestController = require('./../../controllers/skilltest.controller.js'),
  config = require('./../../config/skilltest.config');

/**
 * Get app locators
 * Params: app
 * Return Type: Array
 */

router.get('/:app', (req, res) => {
  let appType = req.params.app;

  skillTestController.getApplicationLocator(appType)
    .then((locators) => {
      res.send(locators);
    }, (error) => {
      res.send(error);
    })
    .catch(er => {
      res.send(er);
    });
});

module.exports = router;
