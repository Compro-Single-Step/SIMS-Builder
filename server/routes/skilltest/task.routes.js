const router = require('express').Router(),
  skillTestController = require('./../../controllers/skilltest.controller'),
  config = require('./../../config/skilltest.config');

/**
 * Get script pathways by id
 * Query params: app
 * Return Type: Text
 */

router.get('/:task_id/pathways', (req, res) => {
  let appType = req.query.app,
      step_no = req.query.step,
      task_id = req.params.task_id;

  /**
   * 1. get step no + test templates for the task
   *
   * 2. if query ? step=.. => return methods of the step as pathways
   *
   * 3. else return { message: pathways for task not supported yet, provide step in query param}
   *    todo: create pathways for the task using pathway generation fn() and return
   */

  skillTestController.getPathwaysByTaskId(task_id, step_no, appType)
    .then((pathways) => {
      res.send(pathways);
    }, (error) => {
      res.send(error);
    })
    .catch(er => {
      res.send(er);
    });
});

module.exports = router;
