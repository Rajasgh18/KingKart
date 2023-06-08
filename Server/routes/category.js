const Router = require('express').Router();
const Category = require('../models/Category');

//Get all Categories
Router
    .get('/', async (req, res) => {
        try {
            const data = await Category.find().populate('parentCategory');
            res.status(200).json(data);
        } catch (error) {
            res.status(500).send("Internal Server Error!");
            console.error(error);
        }
    })

    //Get a Single Category with its parentCategory
    .get('/:id', async (req, res) => {
        try {
            let data = await Category.findById(req.params.id);
            if (!data)
                return res.status(404).send("No Category found");
            data = await Category.findById(req.params.id).populate('parentCategory');
            res.status(200).json(data);
        } catch (error) {
            res.status(500).send("Internal Server Error!");
            console.error(error);
        }
    })

    //Post Category
    .post('/', async (req, res) => {
        try {
            let data = new Category(req.body);
            await data.save();
            res.status(200).json(data);
        } catch (error) {
            res.status(500).send("Internal Server Error!");
            console.error(error);
        }
    })

    //Update Category
    .put('/:id', async (req, res) => {
        try {
            let data = await Category.findById(req.params.id);
            if (!data)
                return res.status(404).send("No Category found");
            data = await Category.findByIdAndUpdate(req.params.id, { $set: req.body });
            res.status(200).send("Updated Successfully!");
        } catch (error) {
            res.status(500).send("Internal Server Error!");
            console.error(error);
        }
    })

    //Delete Category
    .delete('/:id', async (req, res) => {
        try {
            let data = await Category.findById(req.params.id);
            if (!data)
                return res.status(404).send("Category not found!");
            data = await Category.findByIdAndDelete(req.params.id);
            res.status(200).send("success");
        } catch (error) {
            console.error(error);
            res.status(500).send("Internal Server Error!");
        }
    })

module.exports = Router;