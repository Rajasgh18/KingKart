const Router = require('express').Router();
const User = require('../models/User');
const Product = require('../models/Product');
const bcrypt = require('bcrypt');
const { body, validationResult } = require('express-validator');
const JWT = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();
const secretKey = process.env.REACT_APP_JWT_SECRET;

Router
    // Create User
    .post('/', [
        body('name', 'Please enter a name more than 3 words').isLength({ min: 3 }),
        body('username', "Please enter a valid username").isEmail(),
        body('password', "Please enter a password more than 5 letters").isLength({ min: 5 }),
    ], async (req, res) => {
        try {
            let errors = validationResult(req);
            if (!errors.isEmpty()) return res.status(400).json({ erros: errors.array() })

            let user = await User.findOne({ username: req.body.username });
            if (user) return res.status(400).json({ message: "A User exists with this username!" });
            const salt = await bcrypt.genSalt(10);
            const secPassword = await bcrypt.hash(req.body.password, salt);

            const newUser = new User({
                name: req.body.name,
                username: req.body.username,
                password: secPassword
            });

            const data = { user: { id: newUser.id } };
            const authToken = JWT.sign(data, secretKey);

            user = await newUser.save();
            res.status(200).json({ user, authToken });

        } catch (error) {
            console.error(error);
            res.status(500).send("Internal Server Error!");
        }
    })

    //Login User
    .post('/login', async (req, res) => {
        try {
            let user = await User.findOne({ username: req.body.username }).populate('cartItems');
            if (!user) return res.status(404).send("There exists no user with that username")

            const checkPassword = await bcrypt.compare(req.body.password, user.password);

            if (!checkPassword) return res.status(400).send("Please enter correct password!");

            const data = { user: { id: user.id } };
            const authToken = JWT.sign(data, secretKey);

            res.status(200).json({ user, authToken });
        } catch (error) {
            console.error(error);
            res.status(500).send("Internal Server Error!");
        }
    })

    //Add items to cart
    .put('/cart-add/:id', async (req, res) => {
        try {
            let user = await User.findById(req.params.id);
            if (!user) {
                return res.status(404).send("User not found!");
            }

            let product = await Product.findById(req.body.productId);
            if (!product) {
                return res.status(404).send("Product does not exist");
            }

            user.cartItems.push(req.body.productId);
            await user.save();

            res.status(200).send("Successfully added to the cart!");

        } catch (error) {
            console.error(error);
            res.status(500).send("Internal Server Error!");
        }
    })

    //Remove item from cart
    .put('/cart-remove/:id', async (req, res) => {
        try {
            let user = await User.findById(req.params.id);
            if (!user) {
                return res.status(404).send("User not found!");
            }

            let product = await Product.findById(req.body.productId);
            if (!product) {
                return res.status(404).send("Product does not exist");
            }
            // Check if the product exists in the cartItems array
            const itemIndex = user.cartItems.findIndex(item => item.toString() === req.body.productId);

            if (itemIndex === -1) {
                return res.status(400).send('Product not found in cart');
            }

            user.cartItems = user.cartItems.filter(item => item.toString() !== req.body.productId);
            await user.save();

            res.status(200).send("Successfully removed from the cart!");

        } catch (error) {
            console.error(error);
            res.status(500).send("Internal Server Error!");
        }
    })

    //Get Cart Products
    .get('/cart-items/:id', async (req, res) => {
        try {
            const cart = await User.findById(req.params.id).populate('cartItems');
            res.status(200).json(cart);
        } catch (error) {

        }
    })

module.exports = Router;