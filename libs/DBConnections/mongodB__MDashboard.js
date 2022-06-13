const mongoose = require('mongoose');

require('dotenv').config({
    path: __dirname + '/../../.env'
});

mongoose.connect(process.env.MONGO_DB_ATLAS_STRING, { 
    useNewUrlParser: true,
    useUnifiedTopology: true
});


mongoose.connection.once('open', () => {
    console.log('Connected to mongodb at', mongoose.connection.name);
});

mongoose.connection.on('error', err => {
    console.log('Connection error: ', err);
    process.exit(1);
});


module.exports = mongoose.connection;