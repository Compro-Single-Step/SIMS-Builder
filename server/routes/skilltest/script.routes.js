const router = require('express').Router(),
  skillTestController = require('./../../controllers/skilltest.controller'),
  converterService = require('./../../modules/skilltest/converter.service'),
  config = require('./../../config/skilltest.config');

/**
 * Get list of scripts
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
    })
    .catch(er => {
      res.send(er);
    });
});

/**
 * Get script by id
 * Query params: app, format
 * Return Type: Object
 */

router.get('/:sleId', (req, res) => {
  let appType   = req.query.app,
      format = req.query.format,
      sleId  = req.params.sleId;


  skillTestController.getScriptBySleId(sleId, appType)
    .then((scripts) => {

      if(!scripts.length) {
        res.status(404).send(config.messages.notFound);
      } else {

        if (format === 'xml') {
          let xmlContent = converterService.jsonToDistXml(scripts[0]);
          res.set('Content-Type', 'text/xml');
          res.send(xmlContent);
        } else {
          res.send(scripts[0]);
        }
      }

    }, (error) => {
      res.send(error);
    })
    .catch(er => {
      res.send(er);
    });
});

/**
 * Get script pathways by id
 * Query params: app
 * Return Type: Text
 */

router.get('/:sleId/pathways', (req, res) => {
  let appType   = req.query.app,
    sleId  = req.params.sleId;


  skillTestController.getScriptBySleId(sleId, appType)
    .then((scripts) => {

      if(!scripts.length) {
        res.status(404).send(config.messages.notFound);
      } else {
        let javaContent = converterService.jsonToDistJava(scripts[0]);

        res.set('Content-type', 'text/plain');
        res.charset = 'UTF-8';

        res.send(javaContent);
      }

    }, (error) => {
      res.send(error);
    })
    .catch(er => {
      res.send(er);
    });
});

router.post('/', (req, res) => {

  skillTestController.generateAndSaveScript(req, res)
    .then((status) => {
      res.send(status);
    }, (error) => {
      res.send(error);
    })
    .catch(er => {
      res.send(er);
    });
});

module.exports = router;
