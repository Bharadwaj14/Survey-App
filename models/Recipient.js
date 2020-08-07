const mongoose = require('mongoose');
const recipient = new mongoose.Schema({
    email: {type: String, trim: true, default:''},
    responded: {type: Boolean, default: false}
});

module.exports = recipient;