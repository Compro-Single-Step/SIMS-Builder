const express = require('express');
const router = express.Router();
const skillController = require('../controllers/skill.controller');
//const dbFilestoreMgr = require('../modules/skill/dbFilestoreMgr');

router.get('/uiconfig/:templateId/:taskId/:stepIndex', (req, res) => {
    let templateId = req.params.templateId;
    let taskId = req.params.taskId;
    let stepIndex = req.params.stepIndex;

    let contentFilter = {
        skillModelFlag: req.query.skillmodel || "true",
        stepUIStateFlag: req.query.stepuistate || "true"
    }
    
    skillController.getUIConfig(templateId, taskId, stepIndex, contentFilter, (error, data) => {
        if(!error) {
            res.send(data);
        }
        else {
            res.json(error);
        }
    });
});

router.post('/stepuistate/:taskId/:stepIndex', (req, res) => {
    let stepUIState = req.body.stepUIState;
    skillController.saveStepUIState(req.params.taskId, req.params.stepIndex, stepUIState, (error, data) => {
        if(!error) {
            res.json(data);
        }
        else {
            res.json(error);
        }
    });
});

router.get('/xmlgeneration/:templateId/:taskid/:stepidx', (req, res) => {
    let templateId = req.params.templateId;
    let taskId = req.params.taskid;
    let stepIdx = req.params.stepidx;
    
    skillController.generateXML(templateId, taskId, stepIdx, (error, data) => {
        if (!error) {
            res.setHeader("Content-Type", "text/xml");
            res.end(data);
        } else {
            res.send(error);
        }
    });
});

router.post("/uploadresource", (req, res) => {
    //getting below data to be decided.
    let templateId = "";
    let taskId = "EXP16.WD.03.01.03.T1";
    let stepIndex = 1;
    let upload = skillController.saveResourceFile(templateId, taskId, stepIndex);
    upload(req, res, (error) => {
        if(error) {
            res.end("Error uploading file.");
        }
        res.end("File is uploaded");
    });
});

module.exports = router;