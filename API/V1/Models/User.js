
const mongoose = require('mongoose');
mongoose.pluralize(null);

const userSchema = new mongoose.Schema({
    FullName: String,
    Email: String,
    Pass: String,
});

module.exports = mongoose.model('User',userSchema);