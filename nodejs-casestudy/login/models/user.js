const Joi = require('joi');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');


const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        minlength: 4,
        maxlength: 20,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: 4,
        maxlength: 255
    }
})

userSchema.methods.generateAuthToken = function() {
    const token = jwt.sign({ _id: this._id}, 'secretKey');
    return token;
}

const User = mongoose.model('User', userSchema);



function validateUser(user){
    const schema = {
        username: Joi.string().min(5).max(20).required(),
        password: Joi.string().min(5).max(255).required()
    }
}

exports.User = User;
exports.validate = validateUser;