const express = require('express');
const router = express.Router();
const skillController = require('../controllers/skill.controller');

router.get('/stepuiconfig/uiconfig/:templateId', (req, res) => {
    let templateId = req.params.templateId;
    
    skillController.getUIConfig(templateId)
    .then((uiConfig) => {
        res.send(uiConfig);
    }, (error)=> {
        res.send(error);
    });
});

router.get('/stepuiconfig/model/:templateId', (req, res) => {
    let templateId = req.params.templateId;
    
    skillController.getSkillModel(templateId)
    .then((model) => {
        res.send(model);
    }, (error)=> {
        res.send(error);
    });
});

router.get('/stepuiconfig/stepuistate/:taskId/:stepIndex', (req, res) => {
    
    let taskId = req.params.taskId;
    let stepIndex = req.params.stepIndex;
    
    skillController.getStepUIState(taskId, stepIndex)
    .then((stepUIState) => {
        res.send(stepUIState);
    }, (error)=> {
        res.send(error);
    });
});

router.get('/stepuiconfig/:templateId/:taskId/:stepIndex', (req, res) => {
    let templateId = req.params.templateId;
    let taskId = req.params.taskId;
    let stepIndex = req.params.stepIndex;
    
    skillController.getStepUIConfig(templateId, taskId, stepIndex)
    .then((stepUIConfig) => {
        res.send(stepUIConfig);
    }, (error)=> {
        res.send(error);
    });
});

router.post('/stepuistate/:taskId/:stepIndex', (req, res) => {
    let stepUIState = req.body.stepUIState;

    skillController.saveStepUIState(req.params.taskId, req.params.stepIndex, stepUIState)
    .then((data) => {
        res.send({
                status: "success"
            });
    }, (error)=> {
        res.send(error);
    });
});

router.post('/xmlgeneration', (req, res) => {
    let templateId = req.body.templateId;
    let taskId = req.body.taskId;
    let stepIdx = req.body.stepId;
    let stepText = req.body.stepText;
    
    skillController.generateXML(templateId, taskId, stepIdx, stepText, (error) => {
        if (!error) {
            res.send({
                status: "success"
            });
        } else {
            res.send({
                status: "Error",
                Error: error
            });
        }
    });
});

router.post("/resource", (req, res) => {

    let upload = skillController.saveResourceFile();
    upload(req, res, (error) => {
        if(error) {
            res.send("Error uploading file.");
        }
        else {
            let filePath = req.body.filePath;
            
            res.send({
                filePath: filePath.replace(/\\/g,"/")
            });
        }
    });
});

router.delete("/resource/*", (req, res) => {
     let filePath = req.params[0];

     skillController.removeResourceFile(filePath)
     .then((success)=> {
         res.send({
             "status": "success"
         })
     }, (error)=> {
         res.send({
             "status": "error",
             "error": error
         })
     });
 });

module.exports = router;