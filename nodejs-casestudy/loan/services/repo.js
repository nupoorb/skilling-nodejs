const debug = require('debug')('app:basic');
const mongoose = require('mongoose');

const {Loan, validate}  = require('../models/loan');



async function saveLoan(loan) {
    const appliedLoan = new Loan({
        user: loan.user,
        loan_type: loan.loan_type,
        loan_amount: loan.loan_amount,
        date: loan.date,
        interest: loan.interest,
        duration: loan.duration
    });

    const result = await appliedLoan.save();
    debug(result);
}

async function getLoan(user){
    const loan = await Loan.find({ user: user });
    if(!loan){
        return false;
    }
    return loan;
}

exports.saveLoan = saveLoan;
exports.getLoan = getLoan;