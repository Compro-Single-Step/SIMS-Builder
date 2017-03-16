var express = require('express');
var router = express.Router();
var loginRouter = require('./login/login.route');
var taskBuilderData = require('./taskBuilderData');

module.exports = function () {
	router.use('/login', loginRouter());
	router.use('/fetchTaskData', taskBuilderData);
	return router;
};
