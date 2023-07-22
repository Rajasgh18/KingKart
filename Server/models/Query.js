const mongoose = require('mongoose');
const { Schema } = mongoose;
const QuerySchema = new Schema({
    userId: {
        type: mongoose.Types.ObjectId,
        required: true
    },
    name: {
        type: String,
        required: true,
    },
    query: {
        type: String,
        required: true
    }
}, { timestamps: true });

module.exports = mongoose.model('Queries', QuerySchema);