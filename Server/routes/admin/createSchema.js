const { json } = require('body-parser');
const mongoose = require('mongoose');
const Router = require('express').Router();
const fs = require('fs');
Router.post('/schema/:schema_name', async (req, res) => {
    try {
        const { schemaStructure } = req.body;

        // Create a schema dynamically based on the request body
        const schema = new mongoose.Schema(schemaStructure);

        // Create the model based on the schema
        const Model = mongoose.model('DynamicModel', schema);

        res.send('Dynamic schema created successfully!');

        res.status(200).json(schema);
    } catch (error) {
        console.error(error)
        res.status(500).send("Internal Server Error!");
    }
})

// Define a route to create a dynamic schema based on the request body
Router.post('/create-schema', (req, res) => {
    const { schemaStructure } = req.body;

    // Create a schema dynamically based on the request body
    const schema = new mongoose.Schema(schemaStructure);

    // Create the model based on the schema
    mongoose.model('nothing', schema);

    fs.writeFile('nothing.json', JSON.stringify(schemaStructure, null, 2), (err) => {
        if (err) {
            console.error('Error saving schema to file:', err);
            return res.status(500).send('Error saving schema to file');
        }
        console.log('Schema saved to file');
        res.send('Dynamic schema created successfully!');
    });
});

// Define a route to post data to a dynamic model based on the request body
Router.post('/post-data', (req, res) => {
    const { modelName, data } = req.body;

    // Find the dynamic model by name
    const schema = mongoose.Schema(require(`../../${modelName}.json`));
    const Model = mongoose.model(modelName, schema);

    // Create a new document using the model and request body data
    const document = new Model(data);

    // Save the document to MongoDB
    document.save()
        .then(() => {
            res.send('Data saved successfully!');
        })
        .catch((error) => {
            res.status(500).send('Error saving data: ' + error);
        });
});

Router.post('/create/:schema_name', async (req, res) => {
    try {
        const SchemaModel = mongoose.model(req.params.schema_name);
        const data = new SchemaModel(req.body);
        await data.save();
        res.status(200).json(data);
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: "Internal Server Error!" });
    }
})
Router.get('/collections', async (req, res) => {
    try {
        const DBCollection = await mongoose.connection.db.listCollections().toArray((err, collections) => {
            const arr = [];
            collections.forEach(element => {
                arr.push(element);
            });
            return arr;
        })
        console.log(DBCollection)
        res.status(200).json(DBCollection);
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: "Internal Server Error!" });
    }
})

module.exports = Router;