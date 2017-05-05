const PPTBaseSkill = require("../common/ppSkill"),
    DOMParser = require("xmldom").DOMParser;

module.exports = class InsertAudio extends PPTBaseSkill {

    init(attrObj) {
        let insertFileDialogXMLPath = attrObj.stepUIState.views[2].audioToBeAdded.path;

        return Promise.all([
            attrObj.dbFilestoreMgr.readFileFromFileStore(insertFileDialogXMLPath)
                .then(response => {
                    let treeXML = new DOMParser().parseFromString(response.fileData, 'text/xml');
                    let textNodes = treeXML.getElementsByTagName("text");
                    this.fileNameArray = [];

                    for (let i = 0; i < textNodes.$$length; i++) {
                        if (textNodes[i].textContent.trim().toLowerCase() === "documents") {
                            let rightpaneitemsNode = textNodes[i].parentNode.getElementsByTagName("rightpaneitems")[0];
                            if (rightpaneitemsNode) {
                                let textNode = rightpaneitemsNode.getElementsByTagName("text");
                                for (let j = 0; j < textNode.$$length; j++) {
                                    this.fileNameArray.push(textNode[j].textContent);
                                }
                            }
                        }
                    }

                    this.fileNameArray = this.fileNameArray.filter((value, index, arr) => arr.indexOf(value) === index);

                    return Promise.resolve(true);

                }),
            super.init(attrObj)
        ])
            .then(() => {
                return Promise.resolve(true)
            })
            .catch(error => {
                return Promise.reject(error)
            });
    }

    createResXMLPath(skillParams) {
        var attrValue = skillParams.paramsObj.xmlPath;
        return Promise.resolve({ attrValue });
    }

    getSubCompTopPosition() {
        var defaultAudioHeight = 0.67;
        var top = parseInt(this.slideHeight) / 2 - parseInt(defaultAudioHeight) / 2;
        var resolveParam = { "attrValue": top };
        return Promise.resolve(resolveParam);
    }

    getSubCompLeftPosition() {
        var defaultAudioWidth = 0.67;
        var left = parseInt(this.slideWidth) / 2 - parseInt(defaultAudioWidth) / 2;
        var resolveParam = { "attrValue": left };
        return Promise.resolve(resolveParam);
    }

    getAudioTobeInsertedWithoutExt(skillParams) {
        var resName = skillParams.paramsObj.resAdded;
        var regExpToRemoveFileExt = /(.+?)\.[^.]*$|$/g;
        var match = regExpToRemoveFileExt.exec(resName);
        var resolveParam = { "attrValue": match[1] };
        return Promise.resolve(resolveParam);
    }

    getSubCompHostParam(skillParams) {
        var selectedSlide = skillParams.paramsObj.selectedSlide;
        var hostParam = '{"Mode":"VideoPlaceHolder","HostParams":{"slide":' + selectedSlide + '}}';
        var resolveParam = { "attrValue": hostParam };
        return Promise.resolve(resolveParam);
    }

    getUpdatedSlideData(skillParams) {
        var selectedSlide = skillParams.paramsObj.selectedSlide;
        var imgPath = skillParams.paramsObj.imgPath;
        var hostParam = '[{"Number":' + selectedSlide + ',"ThumbHtml":"<img src=' + imgPath + '/>"}]';
        var resolveParam = { "attrValue": hostParam };
        return Promise.resolve(resolveParam);
    }
}