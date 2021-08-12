const debug = require('debug')('app:basic');

const express = require('express');
const mongoose = require('mongoose');
const login = require('./login/routes/login.js');
const account = require('./account/routes/account.js');
const applyLoan = require('./loan/routes/applyLoan.js');

const app = express();

mongoose.connect('mongodb://localhost/nodejs', { 
    useNewUrlParser: true,
    useUnifiedTopology: true 
})
    .then(() => debug('Connected to MongoDB...'))
    .catch(err => debug('Could not connect to MongoDB...'));

app.use(express.json());
app.use('/', login);
app.use('/account', account);
app.use('/loans', applyLoan);

app.get('/', (req,res) => {
    res.send('Home Page');
});

const port = process.env.PORT || 8080;
app.listen(port, ()=> debug(`Started on port: ${port}`));