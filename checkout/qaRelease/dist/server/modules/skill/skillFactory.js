// this map should contain the key-value reference for the templateID-skillObjectFile and this file would generate the instance for the SkillObjectfile
var SkillObjectMap = {
        "movecellcontent":"/xl/moveCellContent/moveCellContent"
    }

function getSkill(templateId){
    if(SkillObjectMap[templateId]){
        return SkillObjectMap[templateId];
    }
    else{
        console.log("No Skill Exists in the map for the templateId : "+ templateId);
    }

}

class SkillFactory{

    getSkillObject (templateId){
        let skillFile = getSkill(templateId);
        let SkillClass = new require("../../libs/skills" + skillFile)
        let skill = new SkillClass();
        // var skillRef = new skillRefClass();
        return skill;
    }

}

module.exports = new SkillFactory();