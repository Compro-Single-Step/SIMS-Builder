const path = require('path');
const serverRootPath = path.normalize(__dirname + '/..');
const fileStorePath = serverRootPath + '/fileStore/';
const skillStorePath = fileStorePath + '/skills/';
const xmlFolderPath = fileStorePath + 'XMLs/';
const env = process.env.NODE_ENV || 'local';


const config = {
    local: {
        app: {
            name: 'Single-Step'
        },
        port: process.env.port || 3000,
        db: {
            url: 'ds137360.mlab.com:37360/ss_testdb',
            dbOptions: {
                db: {
                    native_parser: true
                },
                server: {
                    poolsize: 10
                },
                user: 'task_builder',
                pass: 'task_builder'
            }
        },
        root: serverRootPath,
        fileStore: {
            baseURL: skillStorePath,
            xmlFolderPath: xmlFolderPath
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
            xmlFolderPath: xmlFolderPath
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
            xmlFolderPath: xmlFolderPath
        }
    }
};

module.exports = config[env];