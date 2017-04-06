const jwt = require('jsonwebtoken');
var serverConfig = require('../../config/server.config');
var tokenConfig = require('../../config/token.config');
var tokenConstants = require('./token.constants');

module.exports = function (req, res, next) {
	var token = jwt.sign({
		id: req.user.id,
		userVersion: req.user.__v,
		privileges: req.user.privileges,
		type: tokenConstants.TYPES.ACCESS_TOKEN
	}, serverConfig.SECRET, {expiresIn: tokenConfig.ACCESS_TOKEN_EXPIRATIONTIME});


	var data = {
		token: token
	};

	req.data = data;
	next();
};
