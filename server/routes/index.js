var express = require('express');
var router = express.Router();
var loginRouter = require('./login/login.route');

module.exports = function () {
	router.use('/login', loginRouter());
	return router;
};
