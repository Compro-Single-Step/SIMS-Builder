const express = require('express');
const router = express.Router();
const fs = require('fs');
const UserModel = require('../models/user/user.model');

var UserDataJson=null;

router.get("/fetchUser/:username?",function(req,res){

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
router.post("/addUser",function(req,res){
	var user = req.body;
	//user = JSON.stringify(user);
	userData = {
		firstname: user.firstname,
        lastname: user.lastname,
        username: user.username,
        password: user.password,
		email: user.email,
        role: user.role
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
					messageToSend = 'User Name / Email  Already Present';
			}
			else		
			{
					successFlag = false;
					messageToSend = 'Database Error';
			}
		}
	 	else{
				successFlag = true;
				messageToSend = 'User Added';
		}
		res.json({
				success: successFlag,
				message: messageToSend,
			});
	})
})
module.exports = router;