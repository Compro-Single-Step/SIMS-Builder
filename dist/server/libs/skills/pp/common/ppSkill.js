var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var BaseSkill = require("../../common/baseSkill"),
    xmlUtil = require("../../../../utils/xmlUtil"),
    DOMParse = require("xmldom").DOMParser;

module.exports = function (_BaseSkill) {
    _inherits(PPTBaseSkill, _BaseSkill);

    function PPTBaseSkill() {
        _classCallCheck(this, PPTBaseSkill);

        return _possibleConstructorReturn(this, (PPTBaseSkill.__proto__ || Object.getPrototypeOf(PPTBaseSkill)).apply(this, arguments));
    }

    _createClass(PPTBaseSkill, [{
        key: "init",
        value: function init(slideViewDataPath, dbFilestoreMgr) {
            var _this2 = this;

            return dbFilestoreMgr.readFileFromFileStore(slideViewDataPath).then(function (response) {
                var slideViewData = new DOMParse().parseFromString(response.fileData, 'text/xml');
                var slideNodes = slideViewData.getElementsByTagName("Slide");
                _this2.slideNumberArray = [];

                for (var i = 0; i < slideNodes.$$length; i++) {
                    _this2.slideNumberArray.push(slideNodes[i].getAttribute("number"));
                }

                _this2.numberOfSlides = slideNodes.$$length;
                _this2.slideHeight = slideViewData.getElementsByTagName("height")[0].textContent;
                _this2.slideWidth = slideViewData.getElementsByTagName("width")[0].textContent;
                return Promise.resolve(true);
            }).catch(function (error) {
                return Promise.reject(error);
            });
        }
    }, {
        key: "configureSlidesDropdown",
        value: function configureSlidesDropdown(inputFile, dependantDropzoneModel) {
            dependantDropzoneModel.options.value = [];
            if (inputFile == null) {
                dependantDropzoneModel.disabled = true;
            } else {
                var parser = new DOMParser();
                var slideXML = parser.parseFromString(inputFile, "application/xml");
                var SlidesNodes = slideXML.getElementsByTagName("Slide");
                var _iteratorNormalCompletion = true;
                var _didIteratorError = false;
                var _iteratorError = undefined;

                try {
                    for (var _iterator = SlidesNodes[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                        var slideNode = _step.value;

                        var slideNumber = slideNode.getAttribute("number");
                        dependantDropzoneModel.options.value.push({ "label": slideNumber, "data": slideNumber });
                    }
                } catch (err) {
                    _didIteratorError = true;
                    _iteratorError = err;
                } finally {
                    try {
                        if (!_iteratorNormalCompletion && _iterator.return) {
                            _iterator.return();
                        }
                    } finally {
                        if (_didIteratorError) {
                            throw _iteratorError;
                        }
                    }
                }
            }
        }
    }]);

    return PPTBaseSkill;
}(BaseSkill);