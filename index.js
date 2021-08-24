const debug = require('debug')('app:basic');
const startup = require('debug')('app:startup');
const config = require('config');

const express = require('express');
const mongoose = require('mongoose');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger');

const app = express();


const route = require('./routes/route.js');
const adminRoute = require('./routes/adminRoute');

if(!config.get('jwtPrivateKey')){
    console.error('FATAL ERROR: jwtPrivateKey not defined');
    process.exit(1);
}

if(!config.get('dbusername')){
    console.error('FATAL ERROR: dbusername not defined');
    process.exit(1);
}

if(!config.get('dbpassword')){
    console.error('FATAL ERROR: dbpassword not defined');
    process.exit(1);
}

//root:root@
mongoose.connect('mongodb://'+ config.get('dbusername')+':'+ config.get('dbpassword') +'@localhost/nodejs', { 
    useNewUrlParser: true,
    useUnifiedTopology: true 
})
    .then(() => startup('Connected to MongoDB...'))
    .catch(err => startup('Could not connect to MongoDB...'));

app.use(express.json());

app.use('/', route);
app.use('/admin', adminRoute);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));


app.get('/', (req,res) => {
    res.send('Home Page');
});

const port = process.env.PORT || 8080;
app.listen(port, ()=> startup(`Started on port: ${port}`));

exports = app;