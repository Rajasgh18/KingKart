const Router = require('express').Router();
const Address = require('../models/Address');

Router
    //Post Address 
    .post('/', async (req, res) => {
        try {
            const address = new Address(req.body);
            await address.save();
            res.status(200).send("Query Sent Successfully");
        } catch (error) {
            res.status(500).send(error.message);
        }
    })

    //Get All Addresses
    .get('/', async (req, res) => {
        try {
            const address = await Address.find();
            res.status(200).send(queries);
        } catch (error) {
            res.status(500).send(error.message);
        }
    })

    //Update Address
    .put('/:id', async (req, res) => {
        try {
            let address = await Address.findById(req.params.id);
            if (!address) return res.status(404).send("No Address with this id");
            address = await Address.findByIdAndUpdate(req.params.id, { $set: req.body })
            await address.save();
            res.status(200).send("Updated Address Successfully");
        } catch (error) {
            res.status(500).send(error.message);
        }
    })

    //Delete Address
    .delete('/:id', async (req, res) => {
        try {
            let address = await Address.findById(req.params.id);
            if (!address) return res.status(404).send("No Address with this id");
            address = await Address.findByIdAndDelete(req.params.id);
            res.status(200).send("Deleted Address Successfully");
        } catch (error) {
            res.status(500).send(error.message);
        }
    })

module.exports = Router;