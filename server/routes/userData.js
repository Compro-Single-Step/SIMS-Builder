const express = require('express');
const router = express.Router();
const fs = require('fs');
const UserModel = require('../models/user/user.model');

var UserDataJson=null;

router.get("/:username?",function(req,res){

	var username = req.query.username;
	let condition={};
	let map;
	if(username)
	condition={"username": username};
	map = {"_id": false,'password': false}
	UserModel.getUser(condition,map,(error,data) => {
		res.send(data);
	})

	// fs.readFile(__dirname+"/../public/userData.json",function(err,UserDataJson){
	// 	res.send(UserDataJson);
	// })
})
router.post("/",function(req,res){
	var user = req.body;
	//user = JSON.stringify(user);
	userData = {
		firstname: user.firstname,
        lastname: user.lastname,
        username: user.username,
        password: user.password,
		email: user.email,
        role: user.role,
		enable: user.enable
	}
	var newUser = new UserModel(userData);
	newUser.save(function(error,data){
		var successFlag = false;
		var messageToSend = '';
		if (error) 
		{
			if(error.errors.email || error.errors.username)
			{
					successFlag = false;
					messageToSend = 'USERNAME/EMAIL_PRESENT';
			}
			else		
			{
					successFlag = false;
					messageToSend = 'DATABASE_ERROR';
			}
		}
	 	else{
				successFlag = true;
				messageToSend = 'USER_ADDED';
		}
		res.json({
				success: successFlag,
				message: messageToSend,
			});
	})
})
router.put("/",function(req,res){
	var user = req.body;
	var userUpdateData = {  $set:{
		firstname: user.firstname,
        lastname: user.lastname,
		email: user.email,
        role: user.role,
		enable: user.enable }
	}
	var criterion = {username: user.username};

	UserModel.updateUser(criterion,userUpdateData,(error,data) => {
		if (error) 
		{
			if(error.code = 11000)  // Mongoose error code for duplicate unique key (email) in collection. 
			{
					successFlag = false;
					messageToSend = 'EMAIL_PRESENT';
			}
			else		
			{
					successFlag = false;
					messageToSend = 'DATABASE_ERROR';
			}
		}
	 	else{
				successFlag = true;
				messageToSend = 'USERDATA_UPDATED';
		}
		res.json({
				success: successFlag,
				message: messageToSend,
			});
	})
		
})
module.exports = router;