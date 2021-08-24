const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const debug = require('debug')('app:basic');

const userModel  = require('../models/user');
const loanModel = require('../models/loan');
const customerModel = require('../models/customer');


async function getUsers(){
    const users = await userModel.User.find();
    return users;
}

async function getLoans(){
    const loans = await loanModel.Loan.find();
    return loans;
}

async function getCustomers(){
    const customers = await customerModel.Customer.find();
    return customers;
}

async function deleteUsers(){
    const customers = await userModel.User.deleteMany();
    return customers;
}

async function deleteLoans(){
    const customers = await loanModel.Loan.deleteMany();
    return customers;
}

async function deleteCustomers(){
    const customers = await customerModel.Customer.deleteMany();
    return customers;
}

exports.getUsers = getUsers;
exports.getLoans = getLoans;
exports.getCustomers = getCustomers;

exports.deleteUsers = deleteUsers;
exports.deleteLoans = deleteLoans;
exports.deleteCustomers = deleteCustomers;