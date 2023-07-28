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
const query = require('./routes/query');
const address = require('./routes/address');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');

dotenv.config();
connectToDB();
App.use(cors(
    {
        // origin: 'https://king-kart.vercel.app',
    }
));

// Parse application/json
App.use(bodyParser.json());
// Parse application/json
App.use(bodyParser.urlencoded({ extended: false }));
App.use(express.json());

App.use('/api/product', product);
App.use('/api/category', category);
App.use('/api/address', address);
App.use('/api/image', image);
App.use('/api/user', user);
App.use('/api/order', order);
App.use('/api/query', query);
express.static(path.join(__dirname, "/dist/assets")),

// Serve static files
App.use(express.static(path.join(__dirname, '/build')));

// Catch-all route
App.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/build', 'index.html'));
});

App.listen(port, () => {
    console.log(`KingKart Listening at http://localhost:${port}`)
})
