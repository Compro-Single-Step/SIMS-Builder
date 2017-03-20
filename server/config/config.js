const path = require('path');
const serverRootPath = path.normalize(__dirname + '/..');
const fileStorePath = path.normalize(__dirname + '/../fileStore/');
const xmlFolderRelativePath = 'XMLs/';
const env = process.env.NODE_ENV || 'development';


const config = {
    local: {
        app: {
            name: 'Single-Step'
        },
        port: process.env.port || 3000,
        db: {
            url: 'mongodb://localhost:27017/sims-task-bullder',
            dbOptions: {
                db: {
                    native_parser: true
                },
                server: {
                    poolsize: 10
                }
            }
        },
        root: serverRootPath,
        fileStore: {
            baseURL: fileStorePath,
            xmlFolderRelativePath: xmlFolderRelativePath
        }
    },
    development: {
        app: {
            name: 'Single-Step'
        },
        port: process.env.port || 3000,
        db: {
            url: 'ds113650.mlab.com:13650/sims-task-bullder',
            dbOptions: {
                db: {
                    native_parser: true
                },
                server: {
                    poolsize: 20
                },
                user: 'task_builder',
                pass: 'task_builder'
            }
        },
        root: serverRootPath,
        fileStore: {
            baseURL: fileStorePath,
            xmlFolderRelativePath: xmlFolderRelativePath
        }
    },
    production: {
        app: {
            name: 'Single-Step'
        },
        port: process.env.port || 3000,
        db: {
            url: 'ds113650.mlab.com:13650/sims-task-bullder',
            dbOptions: {
                db: {
                    native_parser: true
                },
                server: {
                    poolsize: 20
                },
                user: 'task_builder',
                pass: 'task_builder'
            }
        },
        root: serverRootPath,
        fileStore: {
            baseURL: fileStorePath,
            xmlFolderRelativePath: xmlFolderRelativePath
        }
    }
};

module.exports = config[env];