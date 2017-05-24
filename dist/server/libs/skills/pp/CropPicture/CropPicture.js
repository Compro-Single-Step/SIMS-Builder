var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var PPTBaseSkill = require("../common/ppSkill"),
    DOMParse = require("xmldom").DOMParser;

module.exports = function (_PPTBaseSkill) {
    _inherits(CropPicture, _PPTBaseSkill);

    function CropPicture() {
        _classCallCheck(this, CropPicture);

        return _possibleConstructorReturn(this, (CropPicture.__proto__ || Object.getPrototypeOf(CropPicture)).apply(this, arguments));
    }

    _createClass(CropPicture, [{
        key: "init",
        value: function init(attrObj) {
            return _get(CropPicture.prototype.__proto__ || Object.getPrototypeOf(CropPicture.prototype), "init", this).call(this, attrObj.stepUIState.views[1].slideViewData.path, attrObj.dbFilestoreMgr);
        }
    }, {
        key: "getSubCompHostParam",
        value: function getSubCompHostParam(skillParams) {
            var selectedSlide = skillParams.paramsObj.selectedSlide.data,
                attrValue = '{"Mode":"ImagePlaceHolder", "HostParams":{"slide":"' + selectedSlide + '"}}';
            return Promise.resolve({ attrValue: attrValue });
        }
    }, {
        key: "getUpdatedThumbnailData",
        value: function getUpdatedThumbnailData(skillParams) {
            var selectedSlide = skillParams.paramsObj.selectedSlide.data,
                slidePath = skillParams.taskParams.addResourceToMap({ "path": skillParams.paramsObj["imgPath"] }).absFilePath,
                attrValue = "[{\"Number\":\"" + selectedSlide + "\",\"ThumbHtml\":\"<img src='" + slidePath + "'/>\"}]";
            return Promise.resolve({ attrValue: attrValue });
        }
    }, {
        key: "getUpdatedSlideData",
        value: function getUpdatedSlideData(skillParams) {
            var selectedSlide = skillParams.paramsObj.selectedSlide.data,
                slidePath = skillParams.taskParams.addResourceToMap({ "path": skillParams.paramsObj["imgPath"] }).absFilePath,
                attrValue = "[{\"Number\":\"" + selectedSlide + "\",\"Html\":\"<img src='" + slidePath + "'/>\"}]";
            return Promise.resolve({ attrValue: attrValue });
        }
    }, {
        key: "feSwitchComponent",
        value: function feSwitchComponent(radioValue, dependantModel) {
            dependantModel.disabled = !radioValue;
        }
    }, {
        key: "switchMode",
        value: function switchMode(skillParams) {
            var paramValueObj = skillParams.paramsObj;
            if (paramValueObj[Object.keys(paramValueObj)[0]]) var attrValue = "with-caption";else var attrValue = "without-caption";
            return Promise.resolve({ attrValue: attrValue });
        }
    }]);

    return CropPicture;
}(PPTBaseSkill);