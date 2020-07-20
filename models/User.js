const mongoose = require('mongoose');
const users = new mongoose.Schema({
    googleID: {type: String, trim: true, default:''}
});

mongoose.model('users',users);