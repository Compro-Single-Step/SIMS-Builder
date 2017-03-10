const express = require('express');
const router = express.Router();
const skillEngineController = require('../controllers/skillEngineController');
const dfsmController = require('../controllers/dfsmController');

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
/*
router.get('/skillxml/:templateId', (req, res) => {
    dfsmController.getSkillXML(req.params.templateId, (error, data) => {
        if(!error) {
            res.json(data);
        }
        else {
            res.json(error);
        }
    });
});

router.get('/iomap/:templateId', (req, res) => {
    dfsmController.getIOMap(req.params.templateId, (error, data) => {
        if(!error) {
            res.json(JSON.parse(data));
        }
        else {
            res.json(error);
        }
    });
});

router.get('/skillmodel/:templateId', (req, res) => {
    dfsmController.getSkillModel(req.params.templateId, (error, data) => {
        if(!error) {
            res.json(JSON.parse(data));
        }
        else {
            res.json(error);
        }
    });
});

router.get('/stepui/:taskId/:stateIndex', (req, res) => {
    dfsmController.getStepUIState(req.params.taskId, req.params.stateIndex, (data, error) => {
        if(!error) {
            res.json(data);
        }
        else {
            res.json(error);
        }
    });
});*/

module.exports = router;