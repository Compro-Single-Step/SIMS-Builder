const express = require('express');
const router = express.Router();
const skillController = require('../controllers/skill.controller');
//const dbFilestoreMgr = require('../modules/skill/dbFilestoreMgr');


router.get('/stepuiconfig/uiconfig/:templateId', (req, res) => {
    let templateId = req.params.templateId;
    
    skillController.getUIConfig(templateId, (error, data) => {
        if(!error) {
            res.send(data);
        }
        else {
            res.send(error);
        }
    });
});

router.get('/stepuiconfig/model/:templateId', (req, res) => {
    let templateId = req.params.templateId;
    
    skillController.getSkillModel(templateId, (error, data) => {
        if(!error) {
            res.send(data);
        }
        else {
            res.send(error);
        }
    });
});

router.get('/stepuiconfig/stepuistate/:taskId/:stepIndex', (req, res) => {
    
    let taskId = req.params.taskId;
    let stepIndex = req.params.stepIndex;
    
    skillController.getStepUIState(taskId, stepIndex, (error, data) => {
        if(!error) {
            res.send(data);
        }
        else {
            res.send(error);
        }
    });
});

router.get('/stepuiconfig/:templateId/:taskId/:stepIndex', (req, res) => {
    let templateId = req.params.templateId;
    let taskId = req.params.taskId;
    let stepIndex = req.params.stepIndex;
    
    skillController.getStepUIConfig(templateId, taskId, stepIndex, (error, data) => {
        if(!error) {
            res.send(data);
        }
        else {
            res.send(error);
        }
    });
});

router.post('/stepuistate/:taskId/:stepIndex', (req, res) => {
    let stepUIState = req.body.stepUIState;
    skillController.saveStepUIState(req.params.taskId, req.params.stepIndex, stepUIState, (error, data) => {
        if(!error) {
            res.send({
                status: "success"
            });
        }
        else {
            res.send(error);
        }
    });
});

router.get('/xmlgeneration/:templateId/:taskid/:stepidx', (req, res) => {
    let templateId = req.params.templateId;
    let taskId = req.params.taskid;
    let stepIdx = req.params.stepidx;
    
    skillController.generateXML(templateId, taskId, stepIdx, (error) => {
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