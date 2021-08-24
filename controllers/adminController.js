const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

const jwt = require('jsonwebtoken');
const service = require('../services/adminService.js');
const auth = require('../middleware/auth.js');
const { User }  = require('../models/user');

async function getUsers(req, res){
    await service.getUsers()
        .then((users) =>{
            res.status(200).send(users)
        });
}

async function getLoans(req, res){
    await service.getLoans()
        .then((loans) =>{
            res.status(200).send(loans)
        });
}

async function getCustomers(req, res){
    await service.getCustomers()
        .then((customers) =>{
            res.status(200).send(customers)
        });
}

async function deleteUsers(req, res){
    await service.deleteUsers()
        .then(() =>{
            res.status(200).send('All users deleted')
        });
}

async function deleteLoans(req, res){
    await service.deleteLoans()
        .then(() =>{
            res.status(200).send('All loans deleted')
        });
}

async function deleteCustomers(req, res){
    await service.deleteCustomers()
        .then(() =>{
            res.status(200).send('All customer details deleted')
        });
}

exports.getUsers = getUsers;
exports.getLoans = getLoans;
exports.getCustomers = getCustomers;

exports.deleteUsers = deleteUsers;
exports.deleteLoans = deleteLoans;
exports.deleteCustomers = deleteCustomers;