const express = require('express');
const router = express.Router();
const skillEngineController = require('../controllers/skillEngineController');
//const dbFileStoreController = require('../controllers/dbFileStoreController');

router.get('/uiconfig/:templateId', (req, res) => {
    let templateId = req.params.templateId;
    let data = {};
    skillEngineController.getUIConfig(req.params.templateId, data, (error, data) => {
        if(!error) {
            res.json(JSON.parse(data));
        }
        else {
            res.json(error);
        }
    });
});

router.get('/stepXML/:taskId/:stepIndex/:templateId', (req, res) => {
    let templateId = req.params.templateId;
    let taskId = req.params.taskId;
    let stepIndex = req.params.stepIndex;

    skillEngineController.generateStepXML(taskId, stepIndex, templateId, (error, data) => {
        if(!error) {
            res.end(data);
        }
        else {
            res.send(error);
        }
    });
});
/*
router.get('/skillxml/:templateId', (req, res) => {
    dbFileStoreController.getSkillXML(req.params.templateId, (error, data) => {
        if(!error) {
            res.json(data);
        }
        else {
            res.json(error);
        }
    });
});

router.get('/iomap/:templateId', (req, res) => {
    dbFileStoreController.getIOMap(req.params.templateId, (error, data) => {
        if(!error) {
            res.json(JSON.parse(data));
        }
        else {
            res.json(error);
        }
    });
});

router.get('/skillmodel/:templateId', (req, res) => {
    dbFileStoreController.getSkillModel(req.params.templateId, (error, data) => {
        if(!error) {
            res.json(JSON.parse(data));
        }
        else {
            res.json(error);
        }
    });
});

router.get('/stepui/:taskId/:stateIndex', (req, res) => {
    dbFileStoreController.getStepUIState(req.params.taskId, req.params.stateIndex, (data, error) => {
        if(!error) {
            res.json(data);
        }
        else {
            res.json(error);
        }
    });
});*/

module.exports = router;