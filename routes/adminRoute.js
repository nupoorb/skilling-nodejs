const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const jwt = require('jsonwebtoken');


const controller = require('../controllers/adminController');

router.get('/users', controller.getUsers);
router.get('/loans', controller.getLoans);
router.get('/customers', controller.getCustomers);

router.delete('/users', controller.deleteUsers);
router.delete('/loans', controller.deleteLoans);
router.delete('/customers', controller.deleteCustomers);


module.exports = router;
