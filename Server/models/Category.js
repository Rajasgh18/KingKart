const mongoose = require('mongoose');   
const { Schema } = mongoose;

const CategorySchema = new Schema({
    categoryImg: {
        type: String,
        required: true
    },
    categoryName: {
        type: String,
        required: true
    },
    parentCategory: {
        type: mongoose.Types.ObjectId,
        ref: 'Category'
    },
    properties: {
        type: Array
    }
}, { timestamps: true });

module.exports = mongoose.model('Category', CategorySchema);