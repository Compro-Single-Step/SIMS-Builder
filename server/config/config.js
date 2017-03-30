const path = require('path');
const serverRootPath = path.normalize(__dirname + '/../');
const fileStore = serverRootPath + 'fileStore/';
const xmlFolder = fileStore + 'XMLs/';
const skillFolder = fileStore + 'skills/';
const resourceFolder = fileStore + 'Resources/';
const env = process.env.NODE_ENV || 'development';

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
            skillFolder: skillFolder,
            xmlFolder: xmlFolder,
            resourceFolder: resourceFolder
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
            skillFolder: skillFolder,
            xmlFolder: xmlFolder,
            resourceFolder: resourceFolder
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
            skillFolder: skillFolder,
            xmlFolder: xmlFolder,
            resourceFolder: resourceFolder
        }
    }
};

module.exports = config[env];