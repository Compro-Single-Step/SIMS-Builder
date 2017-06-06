const BaseSkill = require("../../common/baseSkill"),
    xmlUtil = require("../../../../utils/xmlUtil"),
    DOMParse = require("xmldom").DOMParser;

module.exports = class PPTBaseSkill extends BaseSkill {

    constructor() {
        super();
        /* Creating a list of he mandatory initial attributes which are application specific, these are mandatorily needed 
        to succeed in the AttrValueMap generation */
        this.mandatoryAttributeList = ["XML_PATH"];
    }

    init(slideViewDataPath, dbFilestoreMgr) {

        return dbFilestoreMgr.readFileFromFileStore(slideViewDataPath)
            .then(response => {
                let slideViewData = new DOMParse().parseFromString(response.fileData, 'text/xml');
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

    configureSlidesDropdown(inputFile, dependantDropzoneModel) {
        dependantDropzoneModel.options.value = [];
        if (inputFile == null) {
            dependantDropzoneModel.disabled = true;
        }
        else {
            var parser = new DOMParser();
            var slideXML = parser.parseFromString(inputFile, "application/xml");
            var SlidesNodes = slideXML.getElementsByTagName("Slide");
            for(let slideNode of SlidesNodes){
                var slideNumber = slideNode.getAttribute("number");
                dependantDropzoneModel.options.value.push({"label": slideNumber, "data": slideNumber});
            }
        }
    }
}
