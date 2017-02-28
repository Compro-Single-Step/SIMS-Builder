const mongoose = require("mongoose");

//mongoose.connect('mongodb://test:test@localhost:27017/testDB');
const uri = "mongodb://localhost:27017/testDB";
const dbOptions = {
    db: {
        native_parser: true
    },
    server: {
        poolsize: 5
    }
    // ,
    // user: 'test',
    // pass: 'test'
}

mongoose.connect(uri, dbOptions).then(
    (success) => {
        console.log("Connection established.");
    },
    (error) => {
        console.log(error);
    });

const db = mongoose.connection;

db.on('connected', function () {
    console.log('Mongoose default connection open');
});

// When the connection is disconnected
db.on('disconnected', function () {
    console.log('Mongoose default connection disconnected');
});

exports.db = db;
