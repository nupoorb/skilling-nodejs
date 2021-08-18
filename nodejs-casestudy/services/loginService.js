const { response } = require('express');
const Joi = require('joi');
const repo = require('./repoLogin.js');
const model  = require('../models/user');
const jwt = require('jsonwebtoken');
const debug = require('debug')('app:basic');



async function login(body){
    const result = validateLoginDetails(body);
    if(result.error){
        return result.error.details[0].message;
    }

    const user = await repo.getUser(body)

    console.log(user);
    if(!user){
        return;
    }
    return user;
     
    
}

async function registerUser(body){
    const result = validateLoginDetails(body);
    if(result.error){
        return result.error.details[0].message;
    }
    
    const userExists = await repo.userExists(body);
    debug(userExists);
    if(userExists){
        console.log(userExists);
        return 'User already exists';
    }

    await repo.saveUser(body);
    return 'User registered';

}

exports.login = login;
exports.validateLoginDetails = validateLoginDetails;
exports.registerUser = registerUser;