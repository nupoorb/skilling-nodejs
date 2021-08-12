const Joi = require('joi');
const mongoose = require('mongoose');

const Loan = mongoose.model('Loan', new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    loan_type: {
        type : String,
        required: true,
        minlength: 4,
        maxlength: 20
    },
    loan_amount: {
        type: Number,
        required: true,
        min: 100
    },
    date: {
        type: Date,
        required: true,
    },
    interest: {
        type: Number,
        required: true,
        min: 0
    },
    duration:  {
        type: Number,
        required: true,
        min: 1
    }
}));

function validateLoan(loan){
    const schema = {
        loan_type: Joi.string().min(4).max(20).required(),
        loan_amount: Joi.number().min(100).required(),
        date: Joi.required(),
        interest: Joi.number().min(0).required(),
        duration: Joi.number().min(1).required(),
    }
    return schema;
}

exports.Loan = Loan;
exports.validate = validateLoan;