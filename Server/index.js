const express = require('express');
const App = express();
const port = 5000;
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const connectToDB = require('./db');
const adminRoute = require('./routes/admin/trial');
const bodyParser = require('body-parser');

dotenv.config();
connectToDB();

// Parse application/json
App.use(bodyParser.json());
// Parse application/json
App.use(bodyParser.urlencoded({extended: false}));

App.use('/api/admin/', adminRoute);
// App.use('api/customer/', customerRoute);

App.listen(port, ()=>{
    console.log(`KingKart Listening at http://localhost:${port}`)
})