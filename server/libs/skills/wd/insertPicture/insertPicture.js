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
            return Promise.resolve({ attrValue: [imgName, imgName.slice(0, imgName.lastIndexOf('.'))] });
        } catch (error) {
            return Promise.reject(error);
        }
    }

    feHtmlFileUpload(inputFile, dependantDropzoneModel) {
        if (inputFile == null) {
            dependantDropzoneModel.disabled = true;
        }
        else {
            let htmlFile = document.createElement("html");
            htmlFile.innerHTML = inputFile;
            let imgTags = htmlFile.getElementsByTagName('img');
            if (imgTags.length > 0) {
                dependantDropzoneModel.disabled = false;
            }
        }
    }
};