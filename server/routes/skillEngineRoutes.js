const express = require('express');
const router = express.Router();
const skillEngineController = require('../controllers/skillEngineController');

/* GET api listing. */
router.get('/uiconfig/:templateId', (req, res) => {
    let templateId = req.params.templateId;
    let data = {};
    skillEngineController.getUIConfig(req.params.templateId, data, (path) => {
        console.log(path);
        res.download(path);
    });
    
});

module.exports = router;