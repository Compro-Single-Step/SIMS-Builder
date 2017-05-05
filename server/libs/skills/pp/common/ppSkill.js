const BaseSkill = require("../../common/baseSkill"),
    xmlUtil = require("../../../../utils/xmlUtil"),
    DOMParser = require("xmldom").DOMParser;

module.exports = class PPTBaseSkill extends BaseSkill {
    init(attrObj) {
        let slideViewDataPath = attrObj.stepUIState.views[1].slideViewData.path;

        return attrObj.dbFilestoreMgr.readFileFromFileStore(slideViewDataPath)
            .then(response => {
                let slideViewData = new DOMParser().parseFromString(response.fileData, 'text/xml');
                let slideNodes = slideViewData.getElementsByTagName("Slide");
                this.slideNumberArray = [];

                for (let i = 0; i < slideNodes.$$length; i++) {
                    this.slideNumberArray.push(slideNodes[i].getAttribute("number"));
                }

                this.numberOfSlides = slideNodes.$$length;
                this.slideHeight = slideViewData.getElementsByTagName("height")[0].textContent;
                this.slideWidth = slideViewData.getElementsByTagName("width")[0].textContent;
                return Promise.resolve(true);

            })
            .catch(error => {
                return Promise.reject(error)
            });
    }
}
