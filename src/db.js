const mongoose = require('mongoose');
const { MONGO_URI, MONGO_USER, MONGO_PASS } = require('./config');

mongoose.connect(MONGO_URI)
    .then(() => {
        console.log("Connected to MongoDB");
    })
    .catch((err) => {
        console.log(err);
    });