const WordSkill = require("../common/wdSkill");

module.exports = class InsertPicture extends WordSkill {
    /**
     * 
     * @param {*} skillParams 
     */
    getFileNameFinal(skillParams) {
        try {
            let paramValueObj = skillParams.paramsObj;
            let resolveParams = { "attrValue": paramValueObj["imageFileName"] };
            return Promise.resolve(resolveParams);
        } catch (error) {
            return Promise.reject(error);
        }
    }
};