const mongoose = require('mongoose');
const { MONGO_URI } = require('./config');

mongoose.connect(
    MONGO_URI,
    { useNewUrlParser: true, useUnifiedTopology: true }
)
.then(() => {
    console.log('Connection to MongoDB established');
})
.catch((error) => {
    console.error('Error connecting to MongoDB:', error);
});
