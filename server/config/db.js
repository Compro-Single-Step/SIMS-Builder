const mongoose = require("mongoose");
const config = require('./config');

try {
   mongoose.connect(config.db.url, config.db.dbOptions);    
}
catch(error) {
    console.log(error);
}

const db = mongoose.connection;

db.on('connected', function () {
    console.log('Mongoose default connection established.');
});

// When the connection is disconnected
db.on('disconnected', function () {
    console.log('Mongoose default connection ended.');
});

exports.db = db;
