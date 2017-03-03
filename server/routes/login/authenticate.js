var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var User = require('../../models/user/user.model');
var validator = require('validator');

passport.use('username', new LocalStrategy(
	function (username, password, done) {
		console.log(username);
		User.findOne({ username: username }, function (err, user) {
			if (err) { return done(err); }
			if (!user) return done('Incorrect username');
			console.log("@@@@"+ username + password );
			user.validPassword(password)
			.then(function (result) {
				if (result) return done(null, user);
				else done('Incorrect password');
			}).catch(function (err) {
				return done(err, null);
			});
		});
	}
));

passport.use('email', new LocalStrategy(
	function (username, password, done) {
		User.findOne({ email: username }, function (err, user) {
			if (err) return done(err);
			if (!user) return done('Incorrect email');
			user.validPassword(password)
			.then(function (result) {
				if (result) return done(null, user);
				else done('Incorrect password');
			}).catch(function (err) {
				return done(err, null);
			});
		});
	}
));

module.exports = function (req, res, next) {
	/*
		A user can authenticate with both email and username.
		The body-field named username can contain both email and a username,
	
	 */
	console.log("************************** " + req.body.username);
	
	if (!req.body.password || !req.body.username) {
		console.log('Hi');
		return res.status(422).send();
	}

	if (validator.isEmail(req.body.username)) {
		passport.authenticate('email', function (err, user) {
			if (err) return res.status(401).send();
			else {
				req.logIn(user, {session: false}, next);
			}
		})(req, res, next);
	}
	else {
		passport.authenticate('username', function (err, user) {
			console.log(err);
			if (err) return res.status(401).send();
			else {
				req.logIn(user, {session: false}, next);
			}
		})(req, res, next);
	}
};