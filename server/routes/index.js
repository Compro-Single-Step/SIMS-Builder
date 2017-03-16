var express = require('express');
var router = express.Router();
var loginRouter = require('./login/login.route');
var skillRoutes = require('./skill.routes');

module.exports = function () {
	router.use('/login', loginRouter());
	router.use('/skill', skillRoutes());
	return router;
};
