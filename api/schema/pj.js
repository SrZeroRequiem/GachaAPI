const e = require('express');
const {Schema, model} = require('mongoose');

const pjSchema = new Schema({
    nameWaifu: {
        type: String,
        required: true
    },
    linkWaifu: {
        type: String,
        required: true
    },
    anime: {
        type: String,
        required: true
    },
    stars: {
        type: Number,
        required: true
    }
});

module.exports = model('Pj', pjSchema);
// Path: schema/user.js