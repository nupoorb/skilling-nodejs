const mongoose = require('mongoose');

const {User, validate}  = require('../models/user');



async function getUser(user){
    const foundUser = await User.findOne({username: user.username, password: user.password});
    console.log(foundUser);
    if(!foundUser){
        return false;
    }
    return foundUser;
}

async function saveUser(user){
    const newUser = new User({
        username: user.username,
        password: user.password
    })

    const result = await newUser.save();
    return result;
}

exports.getUser = getUser;
exports.saveUser = saveUser;