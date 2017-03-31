const express = require('express');
const router = express.Router();
const skillController = require('../controllers/skill.controller');
const config = require('../config/config');

router.get('/stepuiconfig/uiconfig/:templateId', (req, res) => {
    let templateId = req.params.templateId;
    
    skillController.getUIConfig(templateId)
    .then((data) => {
        res.send(data);
    }, (error)=> {
        res.send(error);
    });
});

router.get('/stepuiconfig/model/:templateId', (req, res) => {
    let templateId = req.params.templateId;
    
    skillController.getSkillModel(templateId)
    .then((data) => {
        res.send(data);
    }, (error)=> {
        res.send(error);
    });
});

router.get('/stepuiconfig/stepuistate/:taskId/:stepIndex', (req, res) => {
    
    let taskId = req.params.taskId;
    let stepIndex = req.params.stepIndex;
    
    skillController.getStepUIState(taskId, stepIndex)
    .then((data) => {
        res.send(data);
    }, (error)=> {
        res.send(error);
    });
});

router.get('/stepuiconfig/:templateId/:taskId/:stepIndex', (req, res) => {
    let templateId = req.params.templateId;
    let taskId = req.params.taskId;
    let stepIndex = req.params.stepIndex;
    
    skillController.getStepUIConfig(templateId, taskId, stepIndex)
    .then((data) => {
        res.send(data);
    }, (error)=> {
        res.send(error);
    });
});

router.post('/stepuistate/:taskId/:stepIndex', (req, res) => {
    let stepUIState = req.body.stepUIState;
    skillController.saveStepUIState(req.params.taskId, req.params.stepIndex, stepUIState)
    .then((data) => {
        res.send(data);
    }, (error)=> {
        res.send(error);
    });
});

router.get('/xmlgeneration/:templateId/:taskid/:stepidx', (req, res) => {
    let templateId = req.params.templateId;
    let taskId = req.params.taskid;
    let stepIdx = req.params.stepidx;
    
    skillController.generateXML(templateId, taskId, stepIdx, (error) => {
        if (!error) {
            res.send("success");
        } else {
            res.send(error);
        }
    });
});

router.post("/uploadresource", (req, res) => {

    let upload = skillController.saveResourceFile();
    upload(req, res, (error, data) => {
        if(error) {
            res.send("Error uploading file.");
        }
        else {
            let taskId = req.body.taskId;
            let stepIndex = req.body.stepIndex;
            let fileName = req.files.dzfile[0].originalname;
            let folderPath = config.fileStore.resourceFolder + taskId + "/" + stepIndex + "/";
            let filePath = folderPath + fileName;
            
            res.send({
                filePath: filePath.replace(/\\/g,"/")
            });
        }
    });
});

module.exports = router;