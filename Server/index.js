const express = require('express');
const App = express();
const port = 5000;
const dotenv = require('dotenv');
const connectToDB = require('./db');
const product = require('./routes/product');
const category = require('./routes/category');
const image = require('./routes/image');
const user = require('./routes/user');
const order = require('./routes/order');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');

dotenv.config();
connectToDB();
App.use(cors(
    {
        origin: 'https://king-kart.vercel.app/',
    }
));

// Parse application/json
App.use(bodyParser.json());
// Parse application/json
App.use(bodyParser.urlencoded({ extended: false }));
App.use(express.json());

App.use('/', (req, res)=> {
    res.send("Hello");
})

App.use('/api/product', product);
App.use('/api/category', category);
App.use('/api/image', image);
App.use('/api/user', user);
App.use('/api/order', order);
// express.static(path.join(__dirname, "./public/assets")),

App.listen(port, () => {
    console.log(`KingKart Listening at http://localhost:${port}`)
})
