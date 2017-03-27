// this map should contain the key-value reference for the templateID-skillObjectFile and this file would generate the instance for the SkillObjectfile

class skillFactory{
    
    constructor(){
        this.SkillObjectMap = {
            "movecellcontent":"/xl/moveCellContent/moveCellContent"
        }
    }

    identifySkill(templateId){
        if(this.SkillObjectMap[templateId]){
            return this.SkillObjectMap[templateId];
        }
        else{
            console.log("No Skill Exists in the map for the templateId : "+ templateId);
        }

    }

    getSkillObjectRef (templateId){
        var skillFile = this.identifySkill(templateId);
        var skillRef = require("../../libs/skills" + skillFile);
        return skillRef;
    }

}

module.exports = new skillFactory();
