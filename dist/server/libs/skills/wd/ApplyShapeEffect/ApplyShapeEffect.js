var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var WordSkill = require("../common/wdSkill");
var RibbonData = require("../common/wordRibbonEventMap");

module.exports = function (_WordSkill) {
    _inherits(ApplyShapeEffect, _WordSkill);

    function ApplyShapeEffect() {
        _classCallCheck(this, ApplyShapeEffect);

        return _possibleConstructorReturn(this, (ApplyShapeEffect.__proto__ || Object.getPrototypeOf(ApplyShapeEffect)).apply(this, arguments));
    }

    _createClass(ApplyShapeEffect, [{
        key: "feUpdateShapeEffectCategoryDropdown",
        value: function feUpdateShapeEffectCategoryDropdown(dependentObjectInModel) {
            while (dependentObjectInModel.length > 0) {
                dependentObjectInModel.pop(); //https://jsperf.com/array-clear-methods/3
            }

            var ShapeEffectCategory = Object.keys(RibbonData["Drawing Tools Format"]["Shape Styles"]["Shape Effects"]);
            for (var i = 0; i < ShapeEffectCategory.length; i++) {
                dependentObjectInModel.push({ "label": ShapeEffectCategory[i], "data": ShapeEffectCategory[i] });
            }
        }
    }, {
        key: "feUpdateShapeEffectNamesInDropdown",
        value: function feUpdateShapeEffectNamesInDropdown(shapeEffectCategory, dependentObjectInModel) {
            while (dependentObjectInModel.length > 0) {
                dependentObjectInModel.pop(); //https://jsperf.com/array-clear-methods/3
            }

            var ShapeEffectNames = Object.keys(RibbonData["Drawing Tools Format"]["Shape Styles"]["Shape Effects"][shapeEffectCategory.label]);
            for (var i = 0; i < ShapeEffectNames.length; i++) {
                dependentObjectInModel.push({ "label": ShapeEffectNames[i], "data": ShapeEffectNames[i] });
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
                var shapeTags = htmlFile.getElementsByTagName('shape');
                if (imgTags.length + shapeTags.length > 0) {
                    dependantDropzoneModel.disabled = false;
                }
            }
        }
    }, {
        key: "getShapeEffectPresetIndex",
        value: function getShapeEffectPresetIndex(skillParams) {
            try {
                var paramValueObj = skillParams.paramsObj;
                var shapeEffectCategory = paramValueObj["shapeEffectCategory"];
                var shapeEffectName = paramValueObj["shapeEffectName"];
                var shapeEffectPreset = RibbonData["Drawing Tools Format"]["Shape Styles"]["Shape Effects"][shapeEffectCategory.label][shapeEffectName.label]["Format Shape Pane Preset Index"];
                return Promise.resolve({ attrValue: shapeEffectPreset });
            } catch (error) {
                return Promise.reject(error);
            }
        }
    }, {
        key: "getShapeEffectPresetAttr",
        value: function getShapeEffectPresetAttr(skillParams) {
            try {
                var paramValueObj = skillParams.paramsObj;
                var shapeEffectCategory = paramValueObj["shapeEffectCategory"];
                var shapeEffectName = paramValueObj["shapeEffectName"];
                var attrName = RibbonData["Drawing Tools Format"]["Shape Styles"]["Shape Effects"][shapeEffectCategory.label][shapeEffectName.label]["Format Shape Pane Attribute"];
                return Promise.resolve({ attrValue: attrName });
            } catch (error) {
                return Promise.reject(error);
            }
        }
    }, {
        key: "getShapeEffectRibbonEventId",
        value: function getShapeEffectRibbonEventId(skillParams) {
            try {
                var paramValueObj = skillParams.paramsObj;
                var shapeEffectCategory = paramValueObj["shapeEffectCategory"];
                var shapeEffectName = paramValueObj["shapeEffectName"];
                var shapeEffectRibbonEventId = RibbonData["Drawing Tools Format"]["Shape Styles"]["Shape Effects"][shapeEffectCategory.label][shapeEffectName.label]["Ribbon Event ID"];
                return Promise.resolve({ attrValue: shapeEffectRibbonEventId });
            } catch (error) {
                return Promise.reject(error);
            }
        }
    }, {
        key: "getShapeEffectPaneEventId",
        value: function getShapeEffectPaneEventId(skillParams) {
            try {
                var paramValueObj = skillParams.paramsObj;
                var shapeEffectCategory = paramValueObj["shapeEffectCategory"];
                var shapeEffectName = paramValueObj["shapeEffectName"];
                var shapeEffectRibbonEventId = RibbonData["Drawing Tools Format"]["Shape Styles"]["Shape Effects"][shapeEffectCategory.label][shapeEffectName.label]["Format Shape Pane Event ID"];
                return Promise.resolve({ attrValue: shapeEffectRibbonEventId });
            } catch (error) {
                return Promise.reject(error);
            }
        }
    }]);

    return ApplyShapeEffect;
}(WordSkill);