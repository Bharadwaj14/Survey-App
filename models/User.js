const mongoose = require('mongoose');
const users = new mongoose.Schema({
    googleID: {type: String, trim: true, default:''},
    credits: { type: Number, default: 0}
});

mongoose.model('users',users);