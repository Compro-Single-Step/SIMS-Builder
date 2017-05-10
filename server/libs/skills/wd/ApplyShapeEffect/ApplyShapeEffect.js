const WordSkill = require("../common/wdSkill");
const RibbonData = require("../common/wordRibbonEventMap");

module.exports = class ApplyShapeEffect extends WordSkill {

    updateShapeEffectCategoryDropdown(dependentObjectInModel) {
        while (dependentObjectInModel.length > 0) {
            dependentObjectInModel.pop(); //https://jsperf.com/array-clear-methods/3
        }

        var ShapeEffectCategory = Object.keys(RibbonData["Drawing Tools Format"]["Shape Styles"]["Shape Effects"]);
        for(var i = 0; i < ShapeEffectCategory.length; i++)
        {
             dependentObjectInModel.push({ "label": ShapeEffectCategory[i], "data": ShapeEffectCategory[i] });
        }
    }

    updateShapeEffectNamesInDropdown(shapeEffectCategory, dependentObjectInModel) {
        while (dependentObjectInModel.length > 0) {
            dependentObjectInModel.pop(); //https://jsperf.com/array-clear-methods/3
        }
        
        var ShapeEffectNames = Object.keys(RibbonData["Drawing Tools Format"]["Shape Styles"]["Shape Effects"][shapeEffectCategory.label]);
        for(var i = 0; i < ShapeEffectNames.length; i++)
        {
             dependentObjectInModel.push({ "label": ShapeEffectNames[i], "data": ShapeEffectNames[i] });
        }
    }

    htmlFileUpload(inputFile, dependantDropzoneModel){
        if(inputFile == null){
            dependantDropzoneModel.disabled = true;
        }
        else{
            let htmlFile = document.createElement("html");
            htmlFile.innerHTML = inputFile;
            let imgTags = htmlFile.getElementsByTagName('img');
            let shapeTags = htmlFile.getElementsByTagName('shape');
            if(imgTags.length + shapeTags.length > 0){
                dependantDropzoneModel.disabled = false;
            }
        }
    }

    getShapeEffectPresetIndex(skillParams){
        try {
            let paramValueObj = skillParams.paramsObj;
            let shapeEffectCategory = paramValueObj["shapeEffectCategory"];
            let shapeEffectName = paramValueObj["shapeEffectName"];
            let shapeEffectPreset = RibbonData["Drawing Tools Format"]["Shape Styles"]["Shape Effects"][shapeEffectCategory.label][shapeEffectName.label]["Format Shape Pane Preset Index"];
            return Promise.resolve({ attrValue: shapeEffectPreset});
        } catch (error) {
            return Promise.reject(error);
        }
    }

    getShapeEffectPresetAttr(skillParams){
        try {
            let paramValueObj = skillParams.paramsObj;
            let shapeEffectCategory = paramValueObj["shapeEffectCategory"];
            let shapeEffectName = paramValueObj["shapeEffectName"];
            let attrName = RibbonData["Drawing Tools Format"]["Shape Styles"]["Shape Effects"][shapeEffectCategory.label][shapeEffectName.label]["Format Shape Pane Attribute"];
            return Promise.resolve({ attrValue: attrName});
        } catch (error) {
            return Promise.reject(error);
        }
    }

    getShapeEffectRibbonEventId(skillParams){
        try {
            let paramValueObj = skillParams.paramsObj;
            let shapeEffectCategory = paramValueObj["shapeEffectCategory"];
            let shapeEffectName = paramValueObj["shapeEffectName"];
            let shapeEffectRibbonEventId = RibbonData["Drawing Tools Format"]["Shape Styles"]["Shape Effects"][shapeEffectCategory.label][shapeEffectName.label]["Ribbon Event ID"];
            return Promise.resolve({ attrValue: shapeEffectRibbonEventId});
        } catch (error) {
            return Promise.reject(error);
        }
    }

    getShapeEffectPaneEventId(skillParams){
        try {
            let paramValueObj = skillParams.paramsObj;
            let shapeEffectCategory = paramValueObj["shapeEffectCategory"];
            let shapeEffectName = paramValueObj["shapeEffectName"];
            let shapeEffectRibbonEventId = RibbonData["Drawing Tools Format"]["Shape Styles"]["Shape Effects"][shapeEffectCategory.label][shapeEffectName.label]["Format Shape Pane Event ID"];
            return Promise.resolve({ attrValue: shapeEffectRibbonEventId});
        } catch (error) {
            return Promise.reject(error);
        }
    }
};