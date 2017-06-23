const router = require('express').Router(),
  skillTestController = require('./../../controllers/skilltest.controller.js'),
  config = require('./../../config/skilltest.config');

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
    })
    .catch(er => {
      res.send(er);
    });
});

router.get('/linkages', (req, res) => {
  let templateId   = req.query.id ? req.query.id : undefined

  skillTestController.getTemplateLinkage(templateId)
    .then((linkages) => {

      if(linkages.length === 0 ) {
        res.status(404).send(config.messages.notFound);
      } else{
        res.send(linkages);
      }
    }, (error) => {
      res.send(error);
    })
    .catch(er => {
      res.send(er);
    });
});

/**
 * Get template by id
 * Query params: app
 * Return Type: Object
 */

router.get('/:templateId', (req, res) => {
  let appType   = req.query.app,
    templateId  = req.params.templateId;

  skillTestController.getTemplateById(templateId, appType)
    .then((templates) => {

      if(!templates.length) {
        res.status(404).send(config.messages.notFound);
      } else{
        res.send(templates[0]);
      }
    }, (error) => {
      res.send(error);
    })
    .catch(er => {
      res.send(er);
    });
});

router.get('/:templateId/pathways', (req, res) => {
  let appType   = req.query.app,
    step_no   = req.query.step,
    templateId  = req.params.templateId;

  skillTestController.getPathwaysByTemplateId(templateId, step_no, appType)
    .then((methods) => {

      if(methods.length === 0) {
        res.status(404).send(config.messages.notFound);
      } else{
        res.send(methods);
      }
    }, (error) => {
      res.send(error);
    })
    .catch(er => {
      res.send(er);
    });
});

module.exports = router;
