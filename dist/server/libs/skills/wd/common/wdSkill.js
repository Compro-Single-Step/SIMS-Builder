var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var BaseSkill = require("../../common/baseSkill");

//Wrod based Common Functionality goes here 

var xmlUtil = require("../../../../utils/xmlUtil");
var dbfileStoreManager = require('../../../../modules/skill/dbFilestoreMgr');

module.exports = function (_BaseSkill) {
    _inherits(WordSkill, _BaseSkill);

    function WordSkill() {
        _classCallCheck(this, WordSkill);

        return _possibleConstructorReturn(this, (WordSkill.__proto__ || Object.getPrototypeOf(WordSkill)).apply(this, arguments));
    }

    _createClass(WordSkill, [{
        key: "createCursorPosition",
        value: function createCursorPosition(skillParams) {
            try {
                var paramValueObj = skillParams.paramsObj;
                var valueObj = { "id": paramValueObj.elementId, "cursorPosition": paramValueObj.cursorPosition };
                var resolveParams = { "attrValue": JSON.stringify(valueObj) };
                return Promise.resolve(resolveParams);
            } catch (error) {
                return Promise.reject(error);
            }
        }
    }, {
        key: "createTreeXMLPath",
        value: function createTreeXMLPath(skillParams) {
            return dbfileStoreManager.copyTaskAssetFile(skillParams.paramsObj.treeXML, skillParams.taskParams).then(function (resolveParam) {
                return Promise.resolve({ "attrValue": resolveParam.filePath });
            }).catch(function (error) {
                return Promise.reject(error);
            });
        }
    }, {
        key: "createAddressBarImagePath",
        value: function createAddressBarImagePath(skillParams) {
            return dbfileStoreManager.copyTaskAssetFile(skillParams.paramsObj.addressBarImage, skillParams.taskParams).then(function (resolveParam) {
                return Promise.resolve({ "attrValue": resolveParam.filePath });
            }).catch(function (error) {
                return Promise.reject(error);
            });
        }
    }]);

    return WordSkill;
}(BaseSkill);