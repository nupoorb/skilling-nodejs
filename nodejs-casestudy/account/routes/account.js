const debug = require('debug')('app:basic');

const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

const service = require('../services/accountService');
const auth = require('../middleware/auth.js');



router.post('/update', auth, async(req, res) => {
    const record = req.body;
    record.user = req.user._id;
    const message = await service.updateCustomer(record);
    debug(message);
    res.send(message);
});

router.get('/viewDetails', auth, async(req, res) => {
    const message = await service.viewCustomerDetails(req.user);
    debug(req.user);
    res.send(message);
});


module.exports= router;