const PPTBaseSkill = require("../common/ppSkill"),
    DOMParse = require("xmldom").DOMParser;

module.exports = class InsertAudio extends PPTBaseSkill {

    init(attrObj) {
        let insertFileDialogXMLPath = attrObj.stepUIState.views[2].audioToBeAdded.path;

        return Promise.all([
            attrObj.dbFilestoreMgr.readFileFromFileStore(insertFileDialogXMLPath)
                .then(response => {
                    let treeXML = new DOMParse().parseFromString(response.fileData, 'text/xml');
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
            super.init(attrObj.stepUIState.views[1].slideViewData.path, attrObj.dbFilestoreMgr)
        ])
            .then(() => {
                return Promise.resolve(true)
            })
            .catch(error => {
                return Promise.reject(error)
            });
    }

    getSubCompTopPosition() {
        var defaultAudioHeight = 0.67,
            attrValue = (parseFloat(this.slideHeight) / 2 - defaultAudioHeight / 2).toFixed(1);
        return Promise.resolve({ attrValue });
    }

    getSubCompLeftPosition() {
        var defaultAudioWidth = 0.67,
            attrValue = (parseFloat(this.slideWidth) / 2 - defaultAudioWidth / 2).toFixed(1);
        return Promise.resolve({ attrValue });
    }

    getAudioTobeInsertedWithoutExt(skillParams) {
        var resName = skillParams.paramsObj.resAdded;
        var regExpToRemoveFileExt = /(.+?)\.[^.]*$|$/g;
        var match = regExpToRemoveFileExt.exec(resName);
        var resolveParam = { "attrValue": match[1] };
        return Promise.resolve(resolveParam);
    }

    getSubCompHostParam(skillParams) {
        var selectedSlide = skillParams.paramsObj.selectedSlide.data,
            attrValue = '{"Mode":"VideoPlaceHolder","HostParams":{"slide":' + selectedSlide + '}}';
        return Promise.resolve({ attrValue });
    }

    getUpdatedSlideData(skillParams) {
        var selectedSlide = skillParams.paramsObj.selectedSlide.data,
            slidePath = skillParams.taskParams.addResourceToMap({"path": skillParams.paramsObj["imgPath"]}).absFilePath,
            attrValue = `[{"Number":"${selectedSlide}","ThumbHtml":"<img src='${slidePath}'/>"}]`;
        return Promise.resolve({ attrValue });
    }

    generateSaveAsDialogTreeXML(skillParams) {
        var insertFileDialogXML = skillParams.paramsObj.resAdded;
        //TO DO...
        return Promise.resolve({ "attrValue": insertFileDialogXML });
        
    }

    generateAutoCompleteList(skillParams){
        var attrValue = this.fileNameArray.reduce( (acc,nxtValue) => {
            return acc + '~' + nxtValue;
        });
        return Promise.resolve({ attrValue })
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