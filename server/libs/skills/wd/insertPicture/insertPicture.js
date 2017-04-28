const WordSkill = require("../common/wdSkill");

module.exports = class InsertPicture extends WordSkill {
    getFileNameFinal(skillParams) {
        try {
            let paramValueObj = skillParams.paramsObj;
            let resolveParams = { "attrValue": paramValueObj["imageFileName"] };
            return Promise.resolve(resolveParams);
        } catch (error) {
            return Promise.reject(error);
        }
    }

    createPathWithImages(params) {
        try {
            let paramValueObj = skillParams.paramsObj;

            /**Before returnig below promise we need to update resourse file by replaceing place holders by respective images.
             * 
             */
            let resolveParams = { "attrValue": paramValueObj["docData"] };
            return Promise.resolve(resolveParams);
        } catch (error) {
            return Promise.reject(error);
        }
    }
};