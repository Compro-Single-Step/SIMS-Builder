var express = require('express');
var router = express.Router();
var authenticate = require('./authenticate');
var signToken = require('./signToken');


module.exports = function () {

    router.post('/',
        authenticate,
        signToken,
        function (req, res) {
			if (req.user && req.data) return res.status(200).json(req.data);
			else return res.status(500).send();
		}
    );
    
    return router;
};