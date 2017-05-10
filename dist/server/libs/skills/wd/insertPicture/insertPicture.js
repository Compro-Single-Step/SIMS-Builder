var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var WordSkill = require("../common/wdSkill");

module.exports = function (_WordSkill) {
    _inherits(InsertPicture, _WordSkill);

    function InsertPicture() {
        _classCallCheck(this, InsertPicture);

        return _possibleConstructorReturn(this, (InsertPicture.__proto__ || Object.getPrototypeOf(InsertPicture)).apply(this, arguments));
    }

    _createClass(InsertPicture, [{
        key: "getFileNameFinal",

        /**
         * 
         * @param {*} skillParams 
         */
        value: function getFileNameFinal(skillParams) {
            try {
                var paramValueObj = skillParams.paramsObj;
                var imgName = paramValueObj["imageFileName"];
                return Promise.resolve({ attrValue: [imgName, imgName.slice(0, imgName.lastIndexOf('.'))] });
            } catch (error) {
                return Promise.reject(error);
            }
        }
    }, {
        key: "feHtmlFileUpload",
        value: function feHtmlFileUpload(inputFile, dependantDropzoneModel) {
            if (inputFile == null) {
                dependantDropzoneModel.disabled = true;
            } else {
                var htmlFile = document.createElement("html");
                htmlFile.innerHTML = inputFile;
                var imgTags = htmlFile.getElementsByTagName('img');
                if (imgTags.length > 0) {
                    dependantDropzoneModel.disabled = false;
                }
            }
        }
    }]);

    return InsertPicture;
}(WordSkill);