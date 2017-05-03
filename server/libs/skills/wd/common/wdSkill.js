const replace = require('replace-in-file');
const BaseSkill = require("../../common/baseSkill");
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
            let resourcePath = paramValueObj["docData"];
            let options = {
                files: resourcePath,
                from: [/<rootpath>/g],
                to: ["xmls/abc/sjflsf/kkklk/abc.png"],
                encoding: 'utf8'
            };

            return replace(options)
                .then(changedFiles => {
                    let resolveParams = { "attrValue": resourcePath };
                    return Promise.resolve(resolveParams);
                })
                .catch(error => {
                    return Promise.reject(error);
                });
        } catch (error) {
            return Promise.reject(error);
        }
    }
};