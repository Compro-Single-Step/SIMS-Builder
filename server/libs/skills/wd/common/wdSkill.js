const xmldom = require('xmldom');
const DOMParser = xmldom.DOMParser;
const XMLSerializer = xmldom.XMLSerializer;
//const Promise = require('bluebird');
const fs = require('fs');
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
            let paramValueObj = skillParams.paramsObj;
            let resourcePath = paramValueObj["resourcePath"];
            let docImages = paramValueObj["docImages"];
            let absolutePath = config.fileStore.resourceFolder + resourcePath;
            let fromArray = [];
            let toArray = [];

            return findInFiles.find(/^\{#(.*)#}$/g, absolutePath)
                .then((imgNameArray) => {
                    for (let i = 0; i < imgNameArray.length; i++) {
                        let imageName = imgNameArray[i];

                        docImages.forEach(function (imgObject) {
                            if (imageName === imgObject.displayName) {
                                fromArray.push(new RegExp('imageName', 'g'));
                                let imagePathArray = imgObject.path.split('/');
                                imageName = imagePathArray[imagePathArray.length - 1];
                                toArray.push('{#approot#}/Assets/' + imageName);
                            }
                        });
                    }

                    let options = {
                        files: 'absolutePath',
                        from: fromArray,
                        to: toArray,
                        encoding: 'utf8'
                    };

                    return replace(options);
                }).then((changedFiles) => {
                    console.log('Modified files:', changedFiles.join(', '));
                    return Promise.resolve({ "attrValue": resourcePath });
                }).catch((error) => {
                    return Promise.reject(error);
                });;

            // return fs.readFileAsync(absolutePath, "utf8")
            //     .then((htmlResource) => {
            //         let doc = new DOMParser().parseFromString(htmlResource);
            //         let imgTagArray = doc.getElementsByTagName('img');

            //         for (let i = 0; i < imgTagArray.length; i++) {
            //             let imageName = imgTagArray[i].getAttribute('approot');

            //             docImages.forEach(function (imgObject) {
            //                 if (imageName === imgObject.displayName) {
            //                     fromArray.push(new RegExp('imageName', 'g'));
            //                     let imagePathArray = imgObject.path.split('/');
            //                     imageName = imagePathArray[imagePathArray.length - 1];
            //                     toArray.push('{#approot#}/Assets/' + imageName);
            //                 }
            //             });
            //         };

            //         return fs.writeFileAsync(absolutePath, new XMLSerializer().serializeToString(doc));
            //     }).then((data) => {
            //         return Promise.resolve({ "attrValue": resourcePath });
            //     }).catch((error) => {
            //         return Promise.reject(error);
            //     });

        } catch (error) {
            return Promise.reject(error);
        }
    }
};