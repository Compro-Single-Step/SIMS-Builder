const multer = require('multer');
const mkdirp = require('mkdirp');
const path = require('path');

const uiHandler = require('../modules/skill/uiHandler');
const dbFilestoreMgr = require('../modules/skill/dbFilestoreMgr');
const xmlGenerationHandler = require('../modules/skill/xmlGenerationHandler');
const skillFactory  = require("../modules/skill/skillFactory");
const fs  = require("fs");

class SkillController {

    getUIConfig(templateId, taskId, stepIndex, callback) {
        return uiHandler.getUIConfig(templateId, taskId, stepIndex, callback);
    }

    saveStepUIState(taskId, stepIndex, stepUIData, callback) {
        dbFilestoreMgr.saveStepUIState(taskId, stepIndex, stepUIData, callback);
    }

    generateXML(templateId, taskId, stepIdx, callback) {
        var skillFactoryRef = new skillFactory();
        var skillRef = skillFactoryRef.getSkillObjectRef(templateId)
        xmlGenerationHandler.generateStepXML(templateId, taskId, stepIdx, skillRef, callback);
    }

    saveResourceFile(templateId, taskId, stepIndex) {
        return dbFilestoreMgr.saveResourceFile(templateId, taskId, stepIndex);
    }

    getSkillFilesPath(templateId, callback){
        let skillFactoryRef = new skillFactory();
        let skillfilesPath = skillFactoryRef.getSkillFilesPathObject(templateId);
        let primaryFileName = this.getFileName(skillfilesPath[0]);
                
        let webpackBundle = `         
            ${templateId}.exports = (function(modules) {
                // The module cache
                var installedModules = {};

                // The require function
                function require(filePath) {
                    if(~filePath.lastIndexOf('.js'))
                        var FileName = filePath.lastIndexOf('\\\\') > filePath.lastIndexOf('/') ? filePath.substring(filePath.lastIndexOf('\\\\')+1, filePath.lastIndexOf('.js')) : filePath.substring(filePath.lastIndexOf('/')+1, filePath.lastIndexOf('.js'));
                    else    
                        var FileName = filePath.lastIndexOf('\\\\') > filePath.lastIndexOf('/') ? filePath.substring(filePath.lastIndexOf('\\\\')+1) : filePath.substring(filePath.lastIndexOf('/')+1);

                    moduleId = ${templateId}.webpackBundleMap[FileName];

                    //Check if module is not in map (it must be present in global)
                    if(moduleId === undefined)
                        return ""

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
                    modules[moduleId].call(module.exports, module, module.exports, require);

                    // Flag the module as loaded
                    module.l = true;

                    // Return the exports of the module
                    return module.exports;
                }

                // Load entry module and return exports
                return require('./${primaryFileName}');
            })`;
        let webpackBundleMap = {};
        let webpackBundleFilesArray = [];
        let readFilesCount = 0;

        skillfilesPath.forEach( (file, index) => {
            let filePath = path.join(__dirname,"../", file);
            let self = this;
            fs.readFile(filePath, 'utf8', function (err, file) {
                readFilesCount++;
                if(!err){
                    file = "(function(module, exports, require) {"+file+"})";
                    webpackBundleFilesArray.push(file);
                    let FileName = self.getFileName(filePath);
                    webpackBundleMap[FileName] = webpackBundleFilesArray.length-1;
                    if(readFilesCount === skillfilesPath.length){
                        webpackBundle = `var ${templateId} = {}; ${templateId}.webpackBundleMap = ${JSON.stringify(webpackBundleMap)}; ${webpackBundle}([${webpackBundleFilesArray.toString()}])`;
                        callback(null, webpackBundle);
                    }                 
                }
            });
        })
       
    }

    getFileName(filePath){
        if(~filePath.lastIndexOf('.js')){
            return filePath.lastIndexOf('\\') > filePath.lastIndexOf('/') ? filePath.substring(filePath.lastIndexOf('\\')+1, filePath.lastIndexOf('.js')) : filePath.substring(filePath.lastIndexOf('/')+1, filePath.lastIndexOf('.js'));
        }
            return filePath.lastIndexOf('\\') > filePath.lastIndexOf('/') ? filePath.substring(filePath.lastIndexOf('\\')+1) : filePath.substring(filePath.lastIndexOf('/')+1);
    }
};

module.exports = new SkillController();


