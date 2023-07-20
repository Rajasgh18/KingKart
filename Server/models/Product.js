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
    offerPrice: {
        type: Number,
        required: true
    },
    mrp: {
        type: Number,
        required: true
    },
    deliveryCharge: {
        type: Number,
        required: true,
    },
    rating: {
        type: Number,
        required: true
    },
    highlights: {
        type: Array,
        required: true,
    },
    category: {
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