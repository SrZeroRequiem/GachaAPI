const e = require('express');
const {Schema, model} = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const userSchema = new Schema({
    userId: {
        type: String,
        required: true,
        unique: true,
        default: () => uuidv4()
    },
    discordId: {
        type: String,
        required: false
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    username: {
        type: String,
        required: true
    },
    avatar: {
        type: String,
        required: false
    },
    password: {
        type: String,
        required: true
    },
    pityCounter: {
        type: Number,
        required: false,
        default: 0
    },
    roll: {
        type: Number,
        required: false,
        default: 0
    },
    characters: {
        type: Array,
        required: false,
        default: []
    },
    created: {
        type: Date,
        default: Date.now
    },
    lastLogin: {
        type: Date,
        default: Date.now
    }
});

module.exports = model('User', userSchema);