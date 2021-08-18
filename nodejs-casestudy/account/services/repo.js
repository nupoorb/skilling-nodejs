const debug = require('debug')('app:basic');
const mongoose = require('mongoose');

const {Customer, validate }  = require('../models/customer');


async function saveCustomer(customer){
    const newCustomer = new Customer({
        user: customer.user,
        name: customer.name,
        address: customer.address,
        state: customer.state,
        country: customer.country,
        email: customer.email,
        pan: customer.pan,
        contact: customer.contact,
        dob: customer.dob,
        account_type: customer.account_type
    });

    const result = await newCustomer.save();
    debug(result);
    return result;
}

async function updateCustomer(customer){
    const oldCustomer = await Customer.findOne({user: customer.user});

    oldCustomer.set({
        name: customer.name,
        address: customer.address,
        state: customer.state,
        country: customer.country,
        email: customer.email,
        pan: customer.pan,
        contact: customer.contact,
        dob: customer.dob,
        account_type: customer.account_type
    });

    const result = await oldCustomer.save();
    debug(result);

}

async function getCustomer(user){
    const customer = await Customer.findOne({user: user});
    debug(customer);
    if(!customer) return;
    return customer;
}
async function getUser(user){
    const foundUser = await User.findOne({username: user.username});
    return foundUser;
}

exports.updateCustomer = updateCustomer;
exports.getCustomer = getCustomer;
exports.saveCustomer = saveCustomer;
exports.getUser = getUser;