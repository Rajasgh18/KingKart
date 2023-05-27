const mongoose = require('mongoose');
const { Schema } = mongoose;

const Product = new Schema({
    img: {
        type: Array,
        required: true,
    },
    name: {
        type: String,
        min: 3,
        required: true
    },
    desc: {
        type: String,
        min: 3,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    rating: {
        type: Number,
    },
    category:{
        type: 'String',
        required: true,
        min: 3
    }
}, { timestamps: true });

module.exports = mongoose.model('products', Product);