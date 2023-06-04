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
        type: mongoose.Types.ObjectId,
        ref: 'Category',
        required: true,
    },
    properties: {
        type: Object,
        required: true,
    }
}, { timestamps: true });

module.exports = mongoose.model('products', Product);