const BaseSkill = require("../../common/baseSkill");

//Wrod based Common Functionality goes here 

const xmlUtil = require("../../../../utils/xmlUtil");
const dbfileStoreManager = require('../../../../modules/skill/dbFilestoreMgr');

module.exports = class WordSkill extends BaseSkill {
    
    constructor() {
       super();
       /* Creating a list of he mandatory initial attributes which are application specific, these are mandatorily needed 
        to succeed in the AttrValueMap generation */
       this.mandatoryAttributeList = ["HTML_PATH"];
  }

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

    createAddressBarImagePath(skillParams) {
        return dbfileStoreManager.copyTaskAssetFile(skillParams.paramsObj.addressBarImage, skillParams.taskParams)
            .then((resolveParam) => {
                return Promise.resolve({ "attrValue": resolveParam.filePath });
            }).catch((error) => {
                return Promise.reject(error);
            });
    }
};