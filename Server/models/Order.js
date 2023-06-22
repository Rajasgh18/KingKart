const mongoose = require('mongoose');
const { Schema } = mongoose;

const orderSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    city: {
        type: String,
        required: true,
    },
    postalCode: {
        type: Number,
        required: true,
    },
    streetAddress: {
        type: String,
        required: true
    },
    country: {
        type: String,
        required: true
    },
    paid: {
        type: Boolean,
        required: true
    },
    orderedProducts: Object,
}, { timestamps: true });

module.exports = mongoose.model('Orders', orderSchema);