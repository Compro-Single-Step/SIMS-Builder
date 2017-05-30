const path = require('path');
const serverRootPath = path.normalize(__dirname + '/../');
const env = process.env.NODE_ENV || 'development';

const envFileStoreMap = {
    local: "s3",
    production: "s3",
    development: "s3"
}

const filestorePathMap = {
    "s3": "",
    "local": serverRootPath,
}

const fileStore = filestorePathMap[envFileStoreMap[env]] + 'fileStore/';
const xmlFolder = fileStore + 'XMLs/';
const skillFolder = fileStore + 'skills/';
const resourceFolder = fileStore + 'Resources/';


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
        taskDataServer: {
            Url: 'http://billi.comprotechnologies.com/SIMsInternal/internal/ScenarioPathways.ashx?scenario=',
            name: "billi"
        },
        contentStore: {
            type: envFileStoreMap[env],
            s3: {
                "key": "",
                "secret": ""
            }
        },
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
        taskDataServer: {
            Url: 'http://billi.comprotechnologies.com/SIMsInternal/internal/ScenarioPathways.ashx?scenario=',
            name: "billi"
        }, 
        contentStore: {
            type: envFileStoreMap[env],
            s3: {
                "key": "",
                "secret": ""
            }
        },
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
            url: 'ds123361.mlab.com:23361/sims-builder',
            dbOptions: {
                db: {
                    native_parser: true
                },
                server: {
                    poolsize: 20
                },
                user: 'sims-builder',
                pass: 'sims-builder'
            }
        },
        root: serverRootPath,
        taskDataServer: {
              Url: 'http://billi.comprotechnologies.com/SIMsInternal/internal/ScenarioPathways.ashx?scenario=',
              name: "billi"
        }, 
        contentStore: {
            type: envFileStoreMap[env],
            s3: {
                "key": "",
                "secret": ""
            }
        },
        fileStore: {
            skillFolder: skillFolder,
            xmlFolder: xmlFolder,
            resourceFolder: resourceFolder
        }
    }
};

module.exports = config[env];
