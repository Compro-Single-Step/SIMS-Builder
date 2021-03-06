const express = require('express');
const router = express.Router();
const skillController = require('../controllers/skill.controller');
const ErrorUtil = require('../utils/errorUtil');

router.get('/stepuiconfig/uiconfig/:templateId', (req, res) => {
    let templateId = req.params.templateId;

    skillController.getUIConfig(templateId)
        .then((uiConfig) => {
            res.send(uiConfig);
        })
        .catch((error) => {
            res.status(500).send(ErrorUtil.attachErroInfo(error));
        });
});

router.get('/stepuiconfig/model/:templateId', (req, res) => {
    let templateId = req.params.templateId;

    skillController.getSkillModel(templateId)
        .then((model) => {
            res.send(model);
        })
        .catch((error) => {
            res.status(500).send(ErrorUtil.attachErroInfo(error));
        });
});

router.get('/stepuiconfig/stepuistate/:taskId/:stepIndex', (req, res) => {

    let taskId = req.params.taskId;
    let stepIndex = req.params.stepIndex;

    skillController.getStepUIState(taskId, stepIndex)
        .then((stepUIState) => {
            res.send(stepUIState);
        })
        .catch((error) => {
            res.status(500).send(ErrorUtil.attachErroInfo(error));
        });
});

router.get('/stepuiconfig/:templateId/:taskId/:stepIndex', (req, res) => {
    let templateId = req.params.templateId;
    let taskId = req.params.taskId;
    let stepIndex = req.params.stepIndex;

    skillController.getStepUIConfig(templateId, taskId, stepIndex)
        .then((stepUIConfig) => {
            res.send(stepUIConfig);
        })
        .catch((error) => {
            res.status(error.statusCode || 404).send(ErrorUtil.attachErroInfo(error));
        });
});

router.post('/stepuistate/:taskId/:stepIndex', (req, res) => {
    let stepUIState = req.body.stepUIState;

    skillController.saveStepUIState(req.params.taskId, req.params.stepIndex, stepUIState)
        .then((data) => {
            res.send({
                status: "success"
            });
        })
        .catch((error) => {
            res.status(500).send(ErrorUtil.attachErroInfo(error));
        });
});

router.post('/xmlgeneration', (req, res) => {
    let templateId = req.body.templateId;
    let taskId = req.body.taskId;
    let stepIdx = req.body.stepId;
    let stepText = req.body.stepText;

    skillController.generateXML(templateId, taskId, stepIdx, stepText)
        .then(msg => {
            res.send({
                status: "success"
            });
        })
        .catch((error) => {
            res.status(500).send(ErrorUtil.attachErroInfo(error));
        });
});

router.post("/resource", (req, res) => {

    let upload = skillController.saveResourceFile();
    upload(req, res, (error) => {
        if (error) {
            res.status(500).send(ErrorUtil.attachErroInfo(error));
        }
        else {
            let filePath = req.body.filePath;

            res.send({
                filePath: filePath.replace(/\\/g, "/")
            });
        }
    });
});

router.get("/resource/*", (req, res) => {

    let filePath = req.params[0];

    skillController.getResource(filePath)
        .then((resourceData) => {
            res.setHeader('status', 'success');
            res.end(resourceData);
        })
        .catch((error) => {
            res.status(error.status || 404).set("status", "error").end(ErrorUtil.attachErroInfo(error));
        });
});

router.delete("/resource/*", (req, res) => {
    let filePath = req.params[0];

    skillController.removeResourceFile(filePath)
        .then((success) => {
            res.send({
                "status": "success"
            });
        })
        .catch((error) => {
            res.status(501).send(ErrorUtil.attachErroInfo(error));
        });
});

module.exports = router;
