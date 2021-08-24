const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

const jwt = require('jsonwebtoken');
const service = require('../services/service.js');
const auth = require('../middleware/auth.js');
const { User }  = require('../models/user');

async function login(req, res){
    
    const user = await service.loginUser(req.body)
    .then((user) =>{
        const token = user.generateAuthToken();
        res.cookie('auth-token', token);
        res.status(200).send('Login successful');
    })
    .catch((error)=>{
        res.status(error.statusCode || 400).send(error.message);
    });
}

async function registerUser(req, res){
    await service.registerUser(req.body)
    .then(() => {
        res.status(200).send('User registered');
    })
    .catch((error) => {
        res.status(error.statusCode || 400).send(error.message);
    });
}

async function logoutUser(req, res){
    res.cookie('auth-token', '');
    res.status(200).send('You have been logged out' );
}

async function viewLoans(req, res){
    
    const loans = await service.viewLoans(req.user)
    .then((loans) => {
        res.status(200).send(loans);
    })
    .catch((error) => {
        res.status(error.statusCode || 400).send(error.message);
    });

}

async function applyLoan(req, res){

    await service.applyLoan(req.body, req.user)
    .then(() => {
        res.status(200).send('Applied for loan');
    }).catch((error) => {
        res.status(error.statusCode || 400).send(error.message);
    });

}

async function updateCustomer(req, res){
    await service.updateCustomerDetails(req.body, req.user)
    .then(() => {
        res.status(200).send('Customer details updated');
    }).catch((error) => {
        res.status(error.statusCode || 400).send(error.message);
    });
}

async function viewCustomerDetails(req, res){
    await service.viewCustomerDetails(req.user)
    .then((customer) => {
        res.status(200).send(customer);
    }).catch((error) => {
        res.status(error.statusCode || 400).send(error.message);
    });
}

exports.login = login;
exports.registerUser = registerUser;
exports.logoutUser = logoutUser;
exports.viewLoans = viewLoans;
exports.applyLoan = applyLoan;
exports.updateCustomer = updateCustomer;
exports.viewCustomerDetails = viewCustomerDetails;