const mongoose = require('mongoose');
const { Schema } = mongoose;
const addressSchema = new Schema({
    userId: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    phoneNumber: {
        type: Number,
        length: 10,
        required: true,
    },
    streetAddress: {
        type: String,
        required: true,
    },
    district: {
        type: String,
        required: true,
    },
    pincode: {
        type: Number,
        length: 6,
        required: true,
    },
    state: {
        type: String,
        required: true,
    },
}, {timestamps: true});

module.exports = mongoose.model('Address', addressSchema);