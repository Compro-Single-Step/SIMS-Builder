const path = require('path');
const rootPath = path.normalize(__dirname + '/../..');
const env = process.env.NODE_ENV || 'local';

const config = {
    local: {
        port: process.env.port || 3000,
        db: {
            url: 'mongodb://localhost:27017/testDB',
            dbOptions: {
                db: {
                    native_parser: true
                },
                server: {
                    poolsize: 5
                }
            }
        },
        root: rootPath
    },
    development: {
        port: process.env.port || 3000,
        db: {
            url: 'mongodb://localhost:27017/testDB',
            dbOptions: {
                db: {
                    native_parser: true
                },
                server: {
                    poolsize: 5
                },
                user: 'test',
                pass: 'test'
            }
        },
        root: rootPath
    }
};

module.exports = config[env];