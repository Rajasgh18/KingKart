const Router = require('express').Router();
const Query = require('../models/Query');

Router

    //Post Queries 
    .post('/', async (req, res) => {
        try {
            const query = new Query(req.body);
            await query.save();
            res.status(200).send("Query Sent Successfully");
        } catch (error) {
            res.status(500).send(error.message);
        }
    })

    //Get All Queries
    .get('/', async (req, res) => {
        try {
            const queries = await Query.find();
            res.status(200).send(queries);
        } catch (error) {
            res.status(500).send(error.message);
        }
    })

module.exports = Router;