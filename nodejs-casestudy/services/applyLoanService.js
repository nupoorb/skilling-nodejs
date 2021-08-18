const debug = require('debug')('app:basic');

const Joi = require('joi');
const model = require('../models/loan.js');
const repo = require('./repo.js');

function validateLoan(loan){
    return Joi.validate(model.validate(loan), model.Loan);
}


async function applyLoan(loan){
    const result = validateLoan(loan);
    if(result.error) return result.error.details[0].message;

    repo.saveLoan(loan);
    return 'Loan saved';
}
async function getLoan(user){
    const loan = await repo.getLoan(user);
    if(!loan){
        return 'Loan not found';
    }
    return loan;
}
exports.applyLoan = applyLoan;
exports.getLoan = getLoan;
