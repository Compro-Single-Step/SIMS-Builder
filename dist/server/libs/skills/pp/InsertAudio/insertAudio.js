var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var PPTBaseSkill = require("../common/ppSkill");
var DOMParse = require("xmldom").DOMParser;

module.exports = function (_PPTBaseSkill) {
    _inherits(InsertAudio, _PPTBaseSkill);

    function InsertAudio() {
        _classCallCheck(this, InsertAudio);

        return _possibleConstructorReturn(this, (InsertAudio.__proto__ || Object.getPrototypeOf(InsertAudio)).apply(this, arguments));
    }

    _createClass(InsertAudio, [{
        key: "init",
        value: function init(attrObj) {
            var _this2 = this;

            var insertFileDialogXMLPath = attrObj.stepUIState.views[2].audioToBeAdded.path;

            return Promise.all([attrObj.dbFilestoreMgr.readFileFromFileStore(insertFileDialogXMLPath).then(function (response) {
                var treeXML = new DOMParse().parseFromString(response.fileData, 'text/xml');
                var textNodes = treeXML.getElementsByTagName("text");
                _this2.fileNameArray = [];

                for (var i = 0; i < textNodes.$$length; i++) {
                    if (textNodes[i].textContent.trim().toLowerCase() === "documents") {
                        var rightpaneitemsNode = textNodes[i].parentNode.getElementsByTagName("rightpaneitems")[0];
                        if (rightpaneitemsNode) {
                            var textNode = rightpaneitemsNode.getElementsByTagName("text");
                            for (var j = 0; j < textNode.$$length; j++) {
                                _this2.fileNameArray.push(textNode[j].textContent);
                            }
                        }
                    }
                }

                _this2.fileNameArray = _this2.fileNameArray.filter(function (value, index, arr) {
                    return arr.indexOf(value) === index;
                });

                return Promise.resolve(true);
            }), _get(InsertAudio.prototype.__proto__ || Object.getPrototypeOf(InsertAudio.prototype), "init", this).call(this, attrObj.stepUIState.views[1].slideViewData.path, attrObj.dbFilestoreMgr)]).then(function () {
                return Promise.resolve(true);
            }).catch(function (error) {
                return Promise.reject(error);
            });
        }
    }, {
        key: "getSubCompTopPosition",
        value: function getSubCompTopPosition() {
            var defaultAudioHeight = 0.67,
                attrValue = (parseFloat(this.slideHeight) / 2 - defaultAudioHeight / 2).toFixed(1);
            return Promise.resolve({ attrValue: attrValue });
        }
    }, {
        key: "getSubCompLeftPosition",
        value: function getSubCompLeftPosition() {
            var defaultAudioWidth = 0.67,
                attrValue = (parseFloat(this.slideWidth) / 2 - defaultAudioWidth / 2).toFixed(1);
            return Promise.resolve({ attrValue: attrValue });
        }
    }, {
        key: "getAudioTobeInsertedWithoutExt",
        value: function getAudioTobeInsertedWithoutExt(skillParams) {
            var resName = skillParams.paramsObj.resAdded;
            var regExpToRemoveFileExt = /(.+?)\.[^.]*$|$/g;
            var match = regExpToRemoveFileExt.exec(resName);
            var resolveParam = null;
            if (match && match[1]) {
                resolveParam = { "attrValue": match[1] };
            } else {
                resolveParam = { "attrValue": resName };
            }
            return Promise.resolve(resolveParam);
        }
    }, {
        key: "getSubCompHostParam",
        value: function getSubCompHostParam(skillParams) {
            var selectedSlide = skillParams.paramsObj.selectedSlide.data,
                attrValue = '{"Mode":"VideoPlaceHolder","HostParams":{"slide":' + selectedSlide + '}}';
            return Promise.resolve({ attrValue: attrValue });
        }
    }, {
        key: "getUpdatedSlideData",
        value: function getUpdatedSlideData(skillParams) {
            var selectedSlide = skillParams.paramsObj.selectedSlide.data,
                slidePath = skillParams.taskParams.addResourceToMap({ "path": skillParams.paramsObj["imgPath"] }).absFilePath,
                attrValue = "[{\"Number\":\"" + selectedSlide + "\",\"ThumbHtml\":\"<img src='" + slidePath + "'/>\"}]";
            return Promise.resolve({ attrValue: attrValue });
        }
    }, {
        key: "generateSaveAsDialogTreeXML",
        value: function generateSaveAsDialogTreeXML(skillParams) {
            var insertFileDialogXML = skillParams.paramsObj.resAdded;
            //TO DO...
            return Promise.resolve({ "attrValue": insertFileDialogXML });
        }
    }, {
        key: "generateAutoCompleteList",
        value: function generateAutoCompleteList(skillParams) {
            var attrValue = this.fileNameArray.reduce(function (acc, nxtValue) {
                return acc + '~' + nxtValue;
            });
            return Promise.resolve({ attrValue: attrValue });
        }
    }]);

    return InsertAudio;
}(PPTBaseSkill);