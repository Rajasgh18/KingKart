const express = require('express');
const App = express();
const port = 5000;
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const connectToDB = require('./db');
const adminProduct = require('./routes/admin/product');
const adminImage = require('./routes/admin/image');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');

dotenv.config();
connectToDB();
App.use(cors());

// Parse application/json
App.use(bodyParser.json());
// Parse application/json
App.use(bodyParser.urlencoded({extended: false}));
App.use(express.json());
App.use('/api/admin/product', adminProduct);
App.use('/api/admin/image', express.static(path.join(__dirname, "public")), adminImage);
// App.use('api/customer/', customerRoute);

App.listen(port, ()=>{
    console.log(`KingKart Listening at http://localhost:${port}`)
})