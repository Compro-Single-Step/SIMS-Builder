const WordSkill = require("../common/wdSkill");

module.exports = class InsertPicture extends WordSkill {
    /**
     * 
     * @param {*} skillParams 
     */
    getFileNameFinal(skillParams) {
        try {
            let paramValueObj = skillParams.paramsObj;
            let imgName = paramValueObj["imageFileName"];
            return Promise.resolve([imgName, imgName + ".jpg"]);
        } catch (error) {
            return Promise.reject(error);
        }
    }
};