

const mongoose = require('mongoose');
mongoose.pluralize(null);

const productSchema = new mongoose.Schema({
    PName: String,
    PCat: String,
    Price: Number,
    PRate: Number
});

module.exports = mongoose.model('Product',productSchema);