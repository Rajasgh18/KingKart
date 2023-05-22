const Router = require('express').Router();
const mongoose = require('mongoose');

//create Schema
Router.post('/schema/create', (req, res)=>{
    try {
        const Schema = new mongoose.Schema(req.body.structure, {timestamps: true});
        const model = mongoose.model(req.body.modelName, Schema);
        res.status(200).send(Schema);
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error!");
    }
});

//Store Data in the schema
Router.post('/schema/store', async (req, res)=>{
    try {
        const model = mongoose.model('pros');
        const data = new model(req.body.data);
        data.save();
        res.status(200).json(data);
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error!");
    }
})

//Get Collections
Router.get('/collections', async (req, res) => {
    try {
        const DBCollection = await mongoose.connection.db.listCollections().toArray((err, collections) => {
            const arr = [];
            collections.forEach(element => {
                arr.push(element);
            });
            return arr;
        })
        res.status(200).json(DBCollection);
    } catch (err) {
        console.error(err)
        res.status(500).json("Internal Server Error!" );
    }
})

module.exports = Router;