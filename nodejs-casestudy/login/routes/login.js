
const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const jwt = require('jsonwebtoken');

const service = require('../services/loginService.js');
const auth = require('../middleware/auth.js');
const model  = require('../models/user');

router.post('/login', async (req, res) => {
    const result = service.validateLoginDetails(req.body);
    if(result.error){
        return result.error.details[0].message;
    }

    const user = await service.login(req.body)
        .catch(err => console.error('Could not get user'));
    if(!user){
        res.status(400).send('Inavild credentials')
    }
    const newUser = new model.User(['_id', 'username', 'password'])
    const token = newUser.generateAuthToken();
    console.log(newUser);
    res.cookie('auth-token', token);
    res.send('Login Successful');
    
});

router.post('/register', async(req, res) => {
    const message = await service.registerUser(req.body);
    res.send(message);
});

router.put("/logout", auth, function (req, res) {
    
    res.cookie('auth-token', '');
    res.send('You have been Logged Out' );
        
});

module.exports= router;