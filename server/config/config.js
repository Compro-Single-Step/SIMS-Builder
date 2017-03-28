const path = require('path');
const serverRootPath = path.normalize(__dirname + '/../');
const fileStore = serverRootPath + 'fileStore/';
const xmlFolder = fileStore + 'XMLs/';
const skillFolder = fileStore + 'skills/';
const resourceFolder = fileStore + 'Resources/';
const env = process.env.NODE_ENV || 'local';

const fileTypes = {
    "SKILL_CONFIG": "skillConfig",
    "RESOURCE": "uploadedResource",
    "XML": "xml"
}

const configType = {
    "UI_CONFIG": "uiconfig",
    "IO_MAP": "iomap",
    "XML": "xml",
    "MODEL": "model"
}

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
        },
        fileTypes: fileTypes,
        configType: configType
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
        },
        fileTypes: fileTypes,
        configType: configType
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
        },
        fileTypes: fileTypes,
        configType: configType
    }
};

module.exports = config[env];