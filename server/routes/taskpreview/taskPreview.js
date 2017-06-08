var express = require('express');
var router = express.Router();
var sleArchiver = require('./archiver');
var transfer = require('./transfer');
const ErrorUtil = require('../../utils/errorUtil');



module.exports = function () {

    router.get('/',
        sleArchiver,
        transfer,
        function (req, res) {
			res.json({'Url':res.locals.urlToLaunch});
		}
    );
    router.use(function(err, req, res, next) {
        res.status(500).send(ErrorUtil.attachErroInfo(err));
    });

    return router;
};