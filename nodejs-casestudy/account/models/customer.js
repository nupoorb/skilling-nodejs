const Joi = require('joi');
const mongoose = require('mongoose');

const Customer = mongoose.model('Customer', new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    name: {
        type: String,
        required: true,
        minlength: 4,
        maxlength: 50
    },
    address:{
        type: String,
        required: true,
        minlength: 4,
        maxlength: 50
    },
    state : {
        type: String,
        required: true,
        minlength: 4,
        maxlength: 20
    },
    country: {
        type: String,
        required: true,
        minlength: 4,
        maxlength: 20
    },
    email:{
        type: String,
        required: true,
        minlength: 4,
        maxlength: 20
    },
    pan:{
        type: String,
        required: true,
        minlength: 6,
        maxlength: 6
    },
    contact: {
        type: String,
        required: true,
        minlength: 10,
        maxlength: 10 
    },
    dob: {
        type: Date,
        required: true,
    },
    account_type: {
        type : String,
        required: true,
        minlength: 4,
        maxlength: 20
    }
}));

function validateCustomer(customer){
    const schema ={
        name: Joi.string().min(4).max(20).required(),
        address: Joi.string().min(4).max(50).required(),
        state: Joi.string().min(4).max(20).required(),
        country: Joi.string().min(4).max(20).required(),
        email: Joi.string().min(4).max(20).required(),
        pan: Joi.string().min(6).max(6).required(),
        dob: Joi.required(),
        account_type: Joi.string().min(4).max(20).required()
    }
    return schema;
}

exports.Customer = Customer;
exports.validate = validateCustomer;