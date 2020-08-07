const mongoose = require('mongoose');
const recipient = require('./Recipient');

const surveys = new mongoose.Schema({
    title: {type: String, trim: true, default:''},
    body: {type: String, trim: true, default:''},
    subject : {type: String, trim: true, default:''},
    recipients: [recipient],
    yes: { type: Number, default: 0},
    no: { type: Number, default: 0},
    _user: { type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    dateSent: Date,
    lastResponded: Date
});

mongoose.model('surveys',surveys);