const debug = require('debug')('app:basic');

const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

const service = require('../services/accountService');
const auth = require('../middleware/auth.js');
const repoUser = require('../../login/services/repo.js');



router.post('/update', auth,async(req, res) => {
    const record = req.body;
    const id = req.user;
    record.user = id;
   
    const message = await service.updateCustomer(record);
    
    debug(message);
    res.send(message);
});

router.get('/viewDetails',auth, async(req, res) => {
    const id = req.user;
    const message = await service.viewCustomerDetails(id);
    debug(req.user);
    res.send(message);
});


module.exports= router;