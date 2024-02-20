

const mongoose = require('mongoose');
mongoose.pluralize(null);

const categorySchema = new mongoose.Schema({
    CatName: String,
    CatID: Number,
    CatDisc: String,
});

module.exports = mongoose.model('Category',categorySchema);