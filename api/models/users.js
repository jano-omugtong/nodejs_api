const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    first_name: String,
    last_name: String,
    email: { type: String, required: true },
    create_date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', userSchema);