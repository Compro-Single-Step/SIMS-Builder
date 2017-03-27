var express = require('express');
var router = express.Router();
var sleArchiver = require('./archiver');
//var transfer = require('./transfer');


module.exports = function () {

    router.get('/',
        sleArchiver,
       
        function (req, res) {
			if (req.sleID && req.data) return res.status(200).json(req.data);
			else return res.status(500).send();
		}
    );
  
    return router;
};