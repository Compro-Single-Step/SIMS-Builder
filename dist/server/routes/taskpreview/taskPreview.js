var express = require('express');
var router = express.Router();
var sleArchiver = require('./archiver');
var transfer = require('./transfer');


module.exports = function () {

    router.get('/',
        sleArchiver,
        transfer,
        function (req, res) {
			res.json({'Url':res.locals.urlToLaunch});
		}
    );
  
    return router;
};