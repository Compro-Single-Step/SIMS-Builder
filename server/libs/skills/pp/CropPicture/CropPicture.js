const PPTBaseSkill = require("../common/ppSkill"),
    DOMParse = require("xmldom").DOMParser;

module.exports = class CropPicture extends PPTBaseSkill {

    init(attrObj) {
        return super.init(attrObj.stepUIState.views[1].slideViewData.path, attrObj.dbFilestoreMgr)
    }

    getSubCompHostParam(skillParams) {
        var selectedSlide = skillParams.paramsObj.selectedSlide.data,
            attrValue = '{"Mode":"ImagePlaceHolder", "HostParams":{"slide":' + selectedSlide + '}}';
        return Promise.resolve({ attrValue });
    }

    getUpdatedSlideData(skillParams) {
        var selectedSlide = skillParams.paramsObj.selectedSlide.data,
            slidePath = skillParams.taskParams.addResourceToMap({ "path": skillParams.paramsObj["imgPath"] }).absFilePath,
            attrValue = `[{"Number":"${selectedSlide}","ThumbHtml":"<img src='${slidePath}'/>"}]`;
        return Promise.resolve({ attrValue });
    }

    feSwitchComponent(radioValue, dependantModel) {
        dependantModel.disabled = radioValue === "1" ? true : false;
    }
}