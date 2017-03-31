// this map should contain the key-value reference for the templateID-skillObjectFile and this file would generate the instance for the SkillObjectfile
var SkillObjectMap = {
        "movecellcontent":"/xl/moveCellContent/moveCellContent"
    }

function identifySkill(templateId){
    if(SkillObjectMap[templateId]){
        return SkillObjectMap[templateId];
    }
    else{
        console.log("No Skill Exists in the map for the templateId : "+ templateId);
    }

}

module.exports = class skillFactory{

    getSkillObjectRef (templateId){
        var skillFile = identifySkill(templateId);
        var skillRefClass = require("../../libs/skills" + skillFile);
        var skillRef = new skillRefClass();
        return skillRef;
    }

}