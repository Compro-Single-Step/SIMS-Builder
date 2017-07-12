const router = require('express').Router(),
    skillTestController = require('./../../controllers/skilltest.controller'),
    config = require('./../../config/skilltest.config'),
    ErrorUtil = require('../../utils/errorUtil');

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

router.post('/:taskId/test-status', (req, res) => {
    let taskId = req.params.taskId;
    let step = req.query.step;
    let pathwaysData = req.body;

    skillTestController.updateTestStatus(taskId, step, pathwaysData)
        .then((success) => {
            res.send(success);
        })
        .catch((error) => {
            res.status(500).send(ErrorUtil.attachErroInfo(error));
        })
});

router.get('/:taskId/test-status', (req, res) => {
    let taskId = req.params.taskId;
    let step = req.query.step;
    
    skillTestController.getTestDetails(taskId, step)
        .then((success) => {
            res.send(success);
        })
        .catch((error) => {
            res.status(500).send(ErrorUtil.attachErroInfo(error));
        })
});

router.get('/:taskId/test-status/status', (req, res) => {
    let taskId = req.params.taskId;
    let step = req.query.step;
    
    skillTestController.getTestStatus(taskId, step)
        .then((success) => {
            res.send(success);
        })
        .catch((error) => {
            res.status(500).send(ErrorUtil.attachErroInfo(error));
        })
});

module.exports = router;
