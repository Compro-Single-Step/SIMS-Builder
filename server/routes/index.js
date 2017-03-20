var express = require('express');
var router = express.Router();
var loginRouter = require('./login/login.route');
var taskBuilderData = require('./taskBuilderData');
var skillRoutes = require('./skill.routes');
var verifyToken = require('./login/verifyToken');

module.exports = function () {
	router.use('/login', loginRouter());

	router.use('*', verifyToken);
	router.use('/skill', skillRoutes);
  router.use('/fetchTaskData', taskBuilderData);	

	return router;
};
