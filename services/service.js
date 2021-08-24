const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const debug = require('debug')('app:basic');

const userModel  = require('../models/user');
const loanModel = require('../models/loan');
const customerModel = require('../models/customer');

const BaseError = require('../middleware/error');

async function userExists(user){
    const foundUser = await userModel.User.findOne({username: user.username});
    console.log('foundUser: ' + foundUser);
    if(!foundUser){
        return false;
    }
    return foundUser;
}

async function getUser(user){
    const foundUser = await userExists(user);
    console.log('foundUser: ' + foundUser);
    if(!foundUser){
        return false;
    }
    const validPassword = await bcrypt.compare(user.password, foundUser.password);
    if(!foundUser || !validPassword){
        return false;
    }
    return foundUser;
}

async function saveUser(user){
    const newUser = new userModel.User({
        username: user.username,
        password: user.password
    })

    const salt = await bcrypt.genSalt(10);
    newUser.password = await bcrypt.hash(user.password, salt);

    const result = await newUser.save();
    return result;
}

async function saveLoan(loan) {
    const appliedLoan = new loanModel.Loan({
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
    const loan = await loanModel.Loan.find({ user: user });
    if(!loan){
        return false;
    }
    return loan;
}

async function saveCustomer(customer){
    const newCustomer = new customerModel.Customer({
        user: customer.user,
        name: customer.name,
        address: customer.address,
        state: customer.state,
        country: customer.country,
        email: customer.email,
        pan: customer.pan,
        contact: customer.contact,
        dob: customer.dob,
        account_type: customer.account_type
    });

    const result = await newCustomer.save();
    debug(result);
    return result;
}

async function updateCustomer(customer){
    const oldCustomer = await customerModel.Customer.findOne({user: customer.user});

    oldCustomer.set({
        name: customer.name,
        address: customer.address,
        state: customer.state,
        country: customer.country,
        email: customer.email,
        pan: customer.pan,
        contact: customer.contact,
        dob: customer.dob,
        account_type: customer.account_type
    });

    const result = await oldCustomer.save();
    debug(result);

}

async function getCustomer(user){
    const customer = await customerModel.Customer.findOne({user: user});
    debug(customer);
    if(!customer) return;
    return customer;
}


async function loginUser(body){
    const validated = userModel.validate(body);
    if(validated.error) throw new BaseError(400, validated.error.details[0].message);
    
    const user = await getUser(body);

    if(!user) throw new BaseError(401, 'User not found');
    return user;
}

async function registerUser(body){
    const validated = userModel.validate(body);
    if(validated.error) throw new BaseError(400, validated.error.details[0].message);

    const user = await getUser(body);
    if(user) throw new BaseError(400, 'User already exists');
    
    const saved = await saveUser(body);
    return saved;
}

async function viewLoans(body){
    const loans = getLoan(body);
    return loans;
}

async function applyLoan(body, user){
    const validated = loanModel.validate(body);
    if(validated.error) throw new BaseError(400, validated.error.details[0].message);

    debug(user);

    let loan = body;
    loan.user = user;

    const saved = await saveLoan(loan);
    return saved;
}

async function updateCustomerDetails(body, user){
    const validated = customerModel.validate(body);
    if(validated.error) throw new BaseError(400, validated.error.details[0].message);

    let customer = await getCustomer(user);
    if(!customer){
        customer = body;
        customer.user = user;
        await saveCustomer(customer);
    }else{
        await updateCustomer(customer);
    }
}

async function viewCustomerDetails(user){
    const details = getCustomer(user);
    return details;
}

exports.userExists = userExists;
exports.getUser = getUser;
exports.saveUser = saveUser;
exports.getLoan = getLoan;

exports.loginUser = loginUser;
exports.registerUser = registerUser;
exports.viewLoans = viewLoans;
exports.applyLoan = applyLoan;
exports.updateCustomerDetails = updateCustomerDetails;
exports.viewCustomerDetails = viewCustomerDetails;