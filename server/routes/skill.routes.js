const express = require('express');
const router = express.Router();
const skillController = require('../controllers/skill.controller');
const dbFilestoreMgr = require('../modules/skill/dbFilestoreMgr');

router.get('/uiconfig/:templateId', (req, res) => {
    let templateId = req.params.templateId;
    let data = {};
    skillController.getUIConfig(req.params.templateId, data, (error, data) => {
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
    dbFilestoreMgr.getSkillXML(req.params.templateId, (error, data) => {
        if(!error) {
            res.json(data);
        }
        else {
            res.json(error);
        }
    });
});

router.get('/iomap/:templateId', (req, res) => {
    dbFilestoreMgr.getIOMap(req.params.templateId, (error, data) => {
        if(!error) {
            res.json(JSON.parse(data));
        }
        else {
            res.json(error);
        }
    });
});

router.get('/skillmodel/:templateId', (req, res) => {
    dbFilestoreMgr.getSkillModel(req.params.templateId, (error, data) => {
        if(!error) {
            res.json(JSON.parse(data));
        }
        else {
            res.json(error);
        }
    });
});

router.get('/stepui/:taskId/:stepIndex', (req, res) => {
    dbFilestoreMgr.getStepUIState(req.params.taskId, req.params.stepIndex, (data, error) => {
        if(!error) {
            res.json(data);
        }
        else {
            res.json(error);
        }
    });
});

router.get('/taskstep/:taskId/:stepIndex', (req, res) => {
    let data = {"model":{"views":{"1":{"documentTitle":"","documentData":{"name":"","path":""},"sheets":{"1":{"name":"","path":"","gridImage":{"name":"img.png"},"rowImage":{"name":""},"columnImage":{"name":""},"cellImage":{"name":""}}},"taskbarPreviewImage":{"name":"","path":""}},"2":{"sheetInAction":"","sourceRange":"","destinationRange":""},"3":{"workbookData":{"name":"","path":""},"sheets":{"1":{"name":"","path":"","gridImage":{"name":""},"rowImage":{"name":""},"columnImage":{"name":""},"cellImage":{"name":""}}}}}}}
    dbFilestoreMgr.saveStepUIState(req.params.taskId, req.params.stepIndex, data, (error, data) => {
        if(!error) {
            res.json(data);
        }
        else {
            res.json(error);
        }
    });
});
*/
module.exports = router;