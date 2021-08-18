const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const {User, validate}  = require('../models/user');



async function getUser(user){
    const foundUser = await userExists(user);
    console.log('foundUser: ' + foundUser);
    if(!foundUser){
        return false;
    }
    const validPassword = await bcrypt.compare(user.password, foundUser.password);
    if(!foundUser || !validPassword){
        return false;
    }
    return foundUser;
}

async function userExists(user){
    const foundUser = await User.findOne({username: user.username});
    console.log('foundUser: ' + foundUser);
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

    const salt = await bcrypt.genSalt(10);
    newUser.password = await bcrypt.hash(user.password, salt);

    const result = await newUser.save();
    return result;
}

exports.getUser = getUser;
exports.saveUser = saveUser;
exports.userExists= userExists;