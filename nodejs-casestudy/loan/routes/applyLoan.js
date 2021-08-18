const debug = require('debug')('app:basic');

const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

const service = require('../services/applyLoanService.js');
const auth = require('../middleware/auth.js');
const repoUser = require('../../login/services/repo.js');

router.post('/apply',auth, async(req, res) => {
    const record = req.body;
    const id = req.user;
    record.user = id
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