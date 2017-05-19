const PPTBaseSkill = require("../common/ppSkill"),
    DOMParse = require("xmldom").DOMParser;

module.exports = class CropPicture extends PPTBaseSkill {

    getSubCompHostParam(skillParams) {
        var selectedSlide = skillParams.paramsObj.selectedSlide.data,
            attrValue = '{"Mode":"ImagePlaceHolder", "HostParams":{"slide":' + selectedSlide + '}}';
        return Promise.resolve({ attrValue });
    }

    getUpdatedSlideData(skillParams) {
        var selectedSlide = skillParams.paramsObj.selectedSlide.data,
            slidePath = skillParams.taskParams.addResourceToMap({"path": skillParams.paramsObj["imgPath"]}).absFilePath,
            attrValue = `[{"Number":"${selectedSlide}","ThumbHtml":"<img src='${slidePath}'/>"}]`;
        return Promise.resolve({ attrValue });
    }
}