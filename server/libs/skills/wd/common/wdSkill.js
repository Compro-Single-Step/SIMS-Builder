const BaseSkill = require("../../common/baseSkill");

//Wrod based Common Functionality goes here 

const xmlUtil = require("../../../../utils/xmlUtil");
const dbfileStoreManager = require('../../../../modules/skill/dbFilestoreMgr');

module.exports = class WordSkill extends BaseSkill {
    createCursorPosition(skillParams) {
        try {
            let paramValueObj = skillParams.paramsObj;
            let valueObj = { "id": paramValueObj.elementId, "cursorPosition": paramValueObj.cursorPosition };
            let resolveParams = { "attrValue": JSON.stringify(valueObj) };
            return Promise.resolve(resolveParams);
        } catch (error) {
            return Promise.reject(error);
        }
    }

    createTreeXMLPath(skillParams) {
        return dbfileStoreManager.copyTaskAssetFile(skillParams.paramsObj.treeXML, skillParams.taskParams)
            .then((resolveParam) => {
                return Promise.resolve({ "attrValue": resolveParam.filePath });
            }).catch((error) => {
                return Promise.reject(error);
            });
    }

    createThumbnailImagePath(skillParams) {
        return dbfileStoreManager.copyTaskAssetFile(skillParams.paramsObj.thumbnailImage, skillParams.taskParams)
            .then((resolveParam) => {
                return Promise.resolve({ "attrValue": resolveParam.filePath });
            }).catch((error) => {
                return Promise.reject(error);
            });
    }
};