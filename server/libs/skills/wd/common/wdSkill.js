const xmldom = require('xmldom');
const DOMParser = xmldom.DOMParser;
const XMLSerializer = xmldom.XMLSerializer;
const Promise = require('bluebird');
const fs = Promise.promisifyAll(require('fs'));
const BaseSkill = require("../../common/baseSkill");
const config = require('../../../../config/config');
const findInFiles = require('find-in-files');
const replace = require('replace-in-file');
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
                                fromArray.push(new RegExp(`{#${imageName}#}`, 'g'));
                                let imagePathArray = imgObject.path.split('/');
                                imageName = imagePathArray[imagePathArray.length - 1];
                                toArray.push(`{#approot#}/Assets/${imageName}`);
                            }
                        });
                    });

                    let options = {
                        files: absolutePath,
                        from: fromArray,
                        to: toArray,
                        encoding: 'utf8'
                    };

                    return replace(options);
                }).then((changedFiles) => {
                    return Promise.resolve({ "attrValue": resourcePath });
                }).catch((error) => {
                    return Promise.reject(error);
                });
        } catch (error) {
            return Promise.reject(error);
        }
    }
};