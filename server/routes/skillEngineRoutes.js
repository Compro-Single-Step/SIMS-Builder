const express = require('express');
const router = express.Router();
const skillEngineController = require('../controllers/skillEngineController');
const databaseFileStoreManager = require('../controllers/databaseFileStoreManager');

/* GET api listing. */
router.get('/uiconfig/:templateId', (req, res) => {
    let templateId = req.params.templateId;
    let data = {};
    skillEngineController.getUIConfig(req.params.templateId, data, (path) => {
        
        res.download(path);
    });
});

router.get('/skillxml/:templateId', (req, res) => {
    databaseFileStoreManager.getSkillXML(req.params.templateId, (path) => {
        console.log(path);
        res.download(path);
    });
});

router.get('/iomap/:templateId', (req, res) => {
    databaseFileStoreManager.getIOMap(req.params.templateId, (path) => {
        console.log(path);
        res.download(path);
    });
});

router.get('/skillmodel/:templateId', (req, res) => {
    databaseFileStoreManager.getSkillModel(req.params.templateId, (path) => {
        console.log(path);
        res.download(path);
    });
});

module.exports = router;