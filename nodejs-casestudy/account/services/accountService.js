const debug = require('debug')('app:basic');

const Joi = require('joi');
const model = require('../models/customer.js');
const repo = require('./repo.js');

function validateCustomer(customer){
    return Joi.validate(model.validate(customer), model.Customer);
}

async function updateCustomer(customer){
    const result = validateCustomer(customer);
    if(result.error) return result.error.details[0].message;

    const customerFound = await repo.getCustomer(customer.user);
    if(!customerFound){
        await repo.saveCustomer(customer);
    }

    await repo.updateCustomer(customer);
    return 'User details updated';
}

async function registerCustomer(customer){
    const result = validateCustomer(customer);
    if(result.error) return result.error.details[0].message;

    if(repo.getCustomer(customer.username)){
        return 'User already exists';
    }
    await repo.saveCustomer(customer);
    return 'New user successfully registered';
}

async function viewCustomerDetails(user){
    
    const userDetails = await repo.getCustomer(user);

    return userDetails;
}

exports.registerCustomer = registerCustomer;
exports.updateCustomer = updateCustomer;
exports.viewCustomerDetails = viewCustomerDetails;