const path = require('path');

const dbFilestoreManager = require('./dbFilestoreMgr');
const skillFactory = require("./skillFactory");

class UIHandler {

    getStepUIConfig(templateId, taskId, stepIndex) {
        let self = this;
        
        return Promise.all([
            dbFilestoreManager.getUIConfig(templateId),
            dbFilestoreManager.getSkillModel(templateId)
        ])
            .then(([uiConfig, model]) => {
                let data = {
                    "uiconfig": JSON.parse(uiConfig),
                    "skillmodel": JSON.parse(model)
                }

                return self._bundleSkillHelperFiles(templateId)
                    .then(webpackBundle => {
                        data.skillfilesbundle = webpackBundle;

                        return dbFilestoreManager.getStepUIState(taskId, stepIndex)
                            .then(uiState => {
                                data.stepuistate = uiState || null;
                                return Promise.resolve(data);
                            })
                            .catch(error => {
                                data.stepuistate = null;
                                return Promise.resolve(data);
                            });
                    })
                    .catch(errorsArray => {
                        let error = new Error("File(s) not found.\n" + errorsArray.map((error) => {error.filePath}));
                        return Promise.reject(error);
                    });
            })
            .catch(error => {
                return Promise.reject(error);
            });
    }

    _bundleSkillHelperFiles(templateId) {
        let skillfilesPathArray = skillFactory.getSkillFilesPath(templateId),
            promiseArray = [],
            webpackBundleMap = {},
            errorsArray = [];

        for (let i = 0; i < skillfilesPathArray.length; i++) {
            //Pusing each promise in a Array 
            promiseArray.push(dbFilestoreManager.getSkillHelperFile(skillfilesPathArray[i].filePath, path.join(__dirname, "../../")).catch(error => {
                errorsArray.push(error);
            }));

            //Adding the file in a map
            webpackBundleMap[skillfilesPathArray[i].newFileName] = i;
        };

        return Promise.all(promiseArray)
            .then((files) => {

                //Throw error if not able to fetch any file
                if (errorsArray.length !== 0) {
                    throw new Error(errorsArray);
                }

                //If files array is empty (No skill map found in skillRepo)
                else if (files.length === 0)
                    return null;

                let primaryFileName = skillfilesPathArray[0].originalFileName,
                    webpackBundle = `var ${templateId}Class = (function(modules) {
                    // The module cache
                    var installedModules = {};

                    // The require function
                    function require(filePath) {
                        if(~filePath.lastIndexOf('.js'))
                            var FileName = filePath.lastIndexOf('\\\\') > filePath.lastIndexOf('/') ? filePath.substring(filePath.lastIndexOf('\\\\')+1, filePath.lastIndexOf('.js')) : filePath.substring(filePath.lastIndexOf('/')+1, filePath.lastIndexOf('.js'));
                        else    
                            var FileName = filePath.lastIndexOf('\\\\') > filePath.lastIndexOf('/') ? filePath.substring(filePath.lastIndexOf('\\\\')+1) : filePath.substring(filePath.lastIndexOf('/')+1);

                        var parentFileName = arguments.callee.caller.arguments[3];
                        
                        moduleId = parentFileName ? skill.${templateId}.webpackBundleMap[parentFileName + "_" + FileName] : skill.${templateId}.webpackBundleMap[FileName];

                        //Check if module is not in map (it must be present in global)
                        if(moduleId === undefined)
                            return {}

                        // Check if module is in cache
                        if(installedModules[moduleId])
                            return installedModules[moduleId].exports;

                        // Create a new module (and put it into the cache)
                        var module = installedModules[moduleId] = {
                            i: moduleId,
                            l: false,
                            exports: {}
                        };

                        // Execute the module function
                        modules[moduleId].call(module.exports, module, module.exports, require, FileName);

                        // Flag the module as loaded
                        module.l = true;

                        // Return the exports of the module
                        return module.exports;
                    }

                    // Load entry module and return exports
                    return require('./${primaryFileName}');
                })`,
                    webpackBundleFilesArray = [];

                for (let i = 0; i < files.length; i++) {
                    let file = `(function(module, exports, require, fileName) {${files[i]}})`;
                    webpackBundleFilesArray.push(file);
                }

                webpackBundle = `var skill = {}; skill.${templateId} = {}; skill.${templateId}.webpackBundleMap = ${JSON.stringify(webpackBundleMap)}; ${webpackBundle}([${webpackBundleFilesArray.toString()}])
                    skill.${templateId}.exports = new ${templateId}Class()`;

                return webpackBundle;
            })
    }
}

module.exports = new UIHandler();
