const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const jwt = require('jsonwebtoken');

const auth = require('../middleware/auth.js');
const controller = require('../controllers/controller.js');

router.post('/login', controller.login);

router.post('/register', controller.registerUser);

router.get('/viewLoans', auth, controller.viewLoans);

router.post('/applyLoan',auth, controller.applyLoan);

router.post('/updateDetails', auth, controller.updateCustomer);

router.get('/viewDetails',auth, controller.viewCustomerDetails);

router.put("/logout", auth, controller.logoutUser);

module.exports= router;