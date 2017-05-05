const Promise = require('bluebird');
const fs = Promise.promisifyAll(require('fs'));
const BaseSkill = require("../../common/baseSkill");
const config = require('../../../../config/config');
const dbfileStoreManager = require('../../../../modules/skill/dbFilestoreMgr');

//Wrod based Common Functionality goes here 

const xmlUtil = require("../../../../utils/xmlUtil");

module.exports = class WordSkill extends BaseSkill {
    createCursorPosition(skillParams) {
        try {
            let paramValueObj = skillParams.paramsObj;
            let valueObj = { "id": paramValueObj.elementId, "cursorPosition": paramValueObj.cursorPosition };
            let resolveParams = { "attrValue": valueObj };
            return Promise.resolve(resolveParams);
        } catch (error) {
            return Promise.reject(error);
        }
    }

    resourcePathWithImages(skillParams) {
        try {
            let { resourcePath, docImages } = skillParams.paramsObj;
            let absolutePath = config.fileStore.resourceFolder + resourcePath;
            let fromArray = [];
            let toArray = [];

            return fs.readFileAsync(absolutePath, 'utf8')
                .then((htmlResource) => {
                    var regex = /{#([^}]*)#}/g;
                    let matches,
                        imgNameArray = [];
                    while (matches = regex.exec(htmlResource)) {
                        imgNameArray.push(matches[1]);
                    }
                    
                    imgNameArray.forEach(function (imageName) {
                        docImages.forEach(function (imgObject) {
                            if (imageName === imgObject.displayName) {
                                fromArray.push(`{#${imageName}#}`);
                                let imagePathArray = imgObject.path.split('/');
                                imageName = imagePathArray[imagePathArray.length - 1];
                                toArray.push(`{#approot#}/Assets/${imageName}`);
                            }
                        });
                    });

                    for (let index = 0; index < fromArray.length; index++) {
                        htmlResource = htmlResource.replace(fromArray[index], toArray[index]);
                    }
                    let resourcePathArray = resourcePath.split('/');
                    let fileName = resourcePathArray[resourcePathArray.length - 1];
                    return dbfileStoreManager.saveTaskDynamicResource(skillParams.taskParams, htmlResource, fileName);
                }).then((filePath) => {
                    return Promise.resolve({ "attrValue": filePath });
                }).catch((error) => {
                    return Promise.reject(error);
                });
        } catch (error) {
            return Promise.reject(error);
        }
    }
};