const Router = require('express').Router();
const Product = require('../models/Product');
const { body, validationResult } = require('express-validator');

Router
    //Get Products
    .get('/:id', async (req, res) => {
        try {
            let product = await Product.findById(req.params.id).populate('Category');
            if (!product)
                return res.status(404).send("product not found!");
            product = await Product.findById(req.params.id);
            res.status(200).json(product);
        } catch (error) {
            console.error(error);
            res.status(500).send("Internal Server Error!");
        }
    })

    //Get all products
    .get('/', async (req, res) => {
        try {
            const data = await Product.find().populate('Category');
            res.status(200).json(data);
        } catch (error) {
            console.error(error);
            res.status(500).send("Internal Server Error!");
        }
    })

    //Create Product
    .post('/', [
        body("img", "Please enter atleast 1 image").isLength({ min: 1 }),
        body("name", "Enter a name which is more than  3 words").isLength({ min: 3 }),
        body("desc", "Enter a description which is more than  3 words").isLength({ min: 3 }),
        body("price", "Please provide a numeric value which is between 0-5").isInt(),
        body("rating", "Please provide a numeric value which is between 0-5").isNumeric({ min: 0, max: 5 }),
        body("category", "Enter a name which is more than 3 words").isLength({ min: 3 }),
    ], async (req, res) => {
        try {
            let errors = validationResult(req);
            if (!errors.isEmpty())
                return res.status(400).json({ errors: errors.array() });
            const data = new Product(req.body)
            await data.save();
            res.status(200).json(data);
        } catch (error) {
            console.error(error);
            res.status(500).send("Internal Server Error!");
        }
    })

    //Update Product
    .put('/:id', async (req, res) => {
        try {
            let product = await Product.findById(req.params.id);
            if (!product)
                return res.status(404).send("product not found!");
            product = await Product.findByIdAndUpdate(req.params.id, { $set: req.body });
            res.status(200).json(product);
        } catch (error) {
            console.error(error);
            res.status(500).send("Internal Server Error!");
        }
    })

    //Delete Product
    .delete('/:id', async (req, res) => {
        try {
            let product = await Product.findById(req.params.id);
            if (!product)
                return res.status(404).send("product not found!");
            product = await Product.findByIdAndDelete(req.params.id);
            res.status(200).send("success");
        } catch (error) {
            console.error(error);
            res.status(500).send("Internal Server Error!");
        }
    })


module.exports = Router;