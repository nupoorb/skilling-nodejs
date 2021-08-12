const debug = require('debug')('app:basic');

const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

const service = require('../services/applyLoanService.js');
const auth = require('../middleware/auth.js');

router.post('/apply', auth, async(req, res) => {
    const record = req.body;
    record.user = req.user._id;
    const message = service.applyLoan(record);
    debug(message);
    res.send(message);
});

router.get('/viewLoans',auth, async(req, res) => {
    const loan = await service.getLoan(req.user);
    debug(loan);
    res.send(loan);
});

module.exports= router;