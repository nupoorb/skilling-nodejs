process.env.NODE_ENV = 'test';
const url = "http://localhost:8080"
const request = require("supertest")(url);
const chai = require("chai");
const expect = chai.expect;
const cookieParser = require('cookie-parser');
const express = require('express');
const sinon = require('sinon');
const Joi = require('joi');
var Cookies;

const userModel = require('../models/user')
const loanModel = require('../models/loan')
const customerModel = require('../models/customer')
const service = require('../services/service')
const adminService = require('../services/adminService')

it('Home Page', async function(){
    await request.get("/").expect(200);
});

const user = {
    username: "tester",
    password: "tester"
    
    }

describe("Tests", function (){

    before(() => {
       userModel.User.deleteMany();
    })

    describe("User", function() {
        it("should register for a user", async () => {
            await request
            .post("/register")
            .send(user)
            .expect(200);
        });
        it("should login a user", async() => {
        const res = await request
            .post("/login")
            .set(   'Cookie', 'token'     )
            .send(user)
            .expect(200)
            .then((res) => {
                Cookies = res.headers['set-cookie'][0].split(',').map(item => item.split(';')[0]);
                Cookies = Cookies.join(';');
               });
            
        });
    })
    

    describe("Loan", function() {
        const loan ={
            loan_type: "carloan",
            loan_amount: 90000,
            date : "09-08-2021",
            interest: 3,
            duration: 12
        }

        beforeEach( async () => {
            app  = express();
            app.use(cookieParser());
    
            const res = await request
            .post("/login")
            .set(   'Cookie', 'token'     )
            .send(user)
            .expect(200)
            .then((res) => {
                Cookies = res.headers['set-cookie'][0].split(',').map(item => item.split(';')[0]);
                Cookies = Cookies.join(';');
               });
    
        })
        it("should deny acess", async()=> {
            const res = await request
            .get("/viewLoans")
            .expect(400);
        })

        
        it("should apply loan", async()=> {
            const res = await request
            .post("/applyLoan")
            .set('Cookie', Cookies)
            .send(loan)
            .expect(200);
        })

        it("should not apply loan", async()=> {
            const res = await request
            .post("/applyLoan")
            .set('Cookie', Cookies)
            .expect(400);
        })

        it("should view loans", async()=> {
            const res = await request
            .get("/viewLoans")
            .set('Cookie', Cookies)
            .expect(200);
            
            expect(res.body[0].loan_type).to.equal(loan.loan_type);
            expect(res.body[0].loan_amount).to.equal(loan.loan_amount);
            expect(res.body[0].duration).to.equal(loan.duration);
            expect(res.body[0].interest).to.equal(loan.interest);
        })

        
    })

    describe("Customer Details", function(){
        
        const customer ={
            "name": "user new",
            "address": "hyderabad",
            "state": "telangana",
            "country": "india",
            "email": "abc@xyz.com",
            "pan": "ABC123",
            "contact": "1234567890",
            "dob": "1/1/1999",
            "account_type": "savings"
        }

        beforeEach( async () => {
            app  = express();
            app.use(cookieParser());
            const res = await request
            .post("/login")
            .set(   'Cookie', 'token'     )
            .send(user)
            .expect(200)
            .then((res) => {
                Cookies = res.headers['set-cookie'][0].split(',').map(item => item.split(';')[0]);
                Cookies = Cookies.join(';');
            });
    
        })


        it("should deny access", async()=>{
            const res = await request
            .get("/viewDetails")
            .expect(400);
        })

        it("should view details", async()=>{
            const res = await request
            .get("/viewDetails")
            .set('Cookie', Cookies)
            .expect(200);
        })
        
        it("should not update user details", async()=> {
            const res = await request
            .post("/updateDetails")
            .set('Cookie', Cookies)
            .expect(400);
        })

        it("should update user details", async()=> {
            const res = await request
            .post("/updateDetails")
            .set('Cookie', Cookies)
            .send(customer)
            .expect(200);
        })
    })

    
});

describe('Admin', function(){
    it('gets all users', async()=>{
        await request
            .get("/admin/users")
            .expect(200);
    
    })
    it('gets all loans', async()=>{
        await request
            .get("/admin/loans")
            .expect(200);
    
    })
    it('gets all customer details', async()=>{
        await request
            .get("/admin/customers")
            .expect(200);
    
    })

    it('deletes all users', async()=>{
        await request
            .delete("/admin/users")
            .expect(200);
    
    })
    it('deletes all loans', async()=>{
        await request
            .delete("/admin/loans")
            .expect(200);
    
    })
    it('deletes all customer details', async()=>{
        await request
            .delete("/admin/customers")
            .expect(200);
    
    })
});

describe('Admin Controller', function(){
    let req = {
    },
    res = {},
    expectedResult = {}
    beforeEach(function () {
        
        res = {
            arr: sinon.spy(),
            status: sinon.stub().returns({ end: sinon.spy() })
        };
        expectedResult = [{}, {}, {}]
    });


    // it('tests gets all users',async function () {
    //     const callback = sinon.stub(adminService, 'await getUsers').returns(expectedResult);
    //     await adminController.getUsers(req, res);
    //         // .then(res => expect(res.status).toEqual(400));
    //     sinon.assert.calledWith(callback, {});
    // })
});

describe('Admin Service', function(){
    let expectedResult = [{}, {}, {}];
    it('tests gets all users',async function () {
        const callback = sinon.stub(userModel.User, 'find').returns(expectedResult);
        await adminService.getUsers();
        sinon.assert.calledOnce(userModel.User.find);
    })

    it('tests gets all loans',async function () {
        const callback = sinon.stub(loanModel.Loan, 'find').returns(expectedResult);
        await adminService.getLoans();
        sinon.assert.calledWith(callback);
    })

    it('tests gets all customers',async function () {
        const callback = sinon.stub(customerModel.Customer, 'find').returns(expectedResult);
        await adminService.getCustomers();
        sinon.assert.calledWith(callback);
    })
});

describe('Model', function(){
    const loan ={
        loan_type: "carloan",
        loan_amount: 90000,
        date : "09-08-2021",
        interest: 3,
        duration: 12
    }
    const customer ={
        "name": "user new",
        "address": "hyderabad",
        "state": "telangana",
        "country": "india",
        "email": "abc@xyz.com",
        "pan": "ABC123",
        "contact": "1234567890",
        "dob": "1/1/1999",
        "account_type": "savings"
    }
    it('should validate user', function(){
        const callback = sinon.stub(Joi, 'validate').returns(true);
        userModel.validate(user);
        sinon.assert.calledWith(callback, user);
        Joi.validate.restore();
    } )
    it('should validate loan', function(){
        const callback = sinon.stub(Joi, 'validate').returns(true);
        loanModel.validate(loan);
        sinon.assert.calledWith(callback, loan);
        Joi.validate.restore();
    } )
    it('should validate customer', function(){
        const callback = sinon.stub(Joi, 'validate').returns(true);
        customerModel.validate(customer);
        sinon.assert.calledWith(callback, customer);
        Joi.validate.restore();
    } )
});

describe('Service', function(){
    let expectedResult = {};
    let userid = "1234";
    const loan ={
        loan_type: "carloan",
        loan_amount: 90000,
        date : "09-08-2021",
        interest: 3,
        duration: 12
    }
    
    it('tests userExists found',async function () {
        const callback = sinon.stub(userModel.User, 'findOne').returns(user);
        await service.userExists(user);
        sinon.assert.calledWith(callback, {"username": user.username});
        sinon.assert.calledOnce(callback);
        userModel.User.findOne.restore();
    })

    it('tests userExists not found',async function () {
        const callback = sinon.stub(userModel.User, 'findOne').returns(null);
        await service.userExists(user);
        sinon.assert.calledWith(callback, {"username": user.username});
        sinon.assert.calledOnce(callback);
        userModel.User.findOne.restore();
    })

     it('tests login user',async function () {
         const callback = sinon.stub(userModel, 'validate').returns({error: {details : [{message: 'not null'}]}});
         await service.loginUser(user)
            .catch(error => {
                expect(error.message).to.equal('not null');
                expect(error.statusCode).to.equal(400);
            });
        userModel.validate.restore();
        
     })

    it('tests register user',async function () {
        const callback = sinon.stub(userModel, 'validate').returns(expectedResult);
        const callback2 = sinon.stub(service, 'getUser').returns(false);
        const callback3 = sinon.stub(service, 'saveUser').returns(true);
        await service.registerUser(user);
        sinon.assert.calledWith(callback, user);
        sinon.assert.calledOnce(callback);
        userModel.validate.restore();
        service.getUser.restore();
        
    })

    
});
