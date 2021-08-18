const debug = require('debug')('app:basic');
const startup = require('debug')('app:startup');
const config = require('config');

const express = require('express');
const mongoose = require('mongoose');
// const routes = require('./routes/route.js');
 const route = require('./routes/route.js');
// const account = require('./account/routes/account.js');
// const applyLoan = require('./loan/routes/applyLoan.js');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger');

const app = express();



if(!config.get('jwtPrivateKey')){
    console.error('FATAL ERROR: jwtPrivateKey not defined');
    process.exit(1);
}

mongoose.connect('mongodb://localhost/nodejs', { 
    useNewUrlParser: true,
    useUnifiedTopology: true 
})
    .then(() => startup('Connected to MongoDB...'))
    .catch(err => startup('Could not connect to MongoDB...'));

app.use(express.json());
app.use('/', route);
// app.use('/', login);
// app.use('/account', account);
// app.use('/loans', applyLoan);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));


app.get('/', (req,res) => {
    res.send('Home Page');
});

const port = process.env.PORT || 8080;
app.listen(port, ()=> startup(`Started on port: ${port}`));