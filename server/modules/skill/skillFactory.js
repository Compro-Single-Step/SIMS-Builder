const compFactory = require('../sim5Comps/compFactory');


// this map should contain the key-value reference for the templateID-skillObjectFile and this file would generate the instance for the SkillObjectfile
var SkillObjectMap = {
        "movecellcontent": {
            skillFilepath: "/xl/moveCellContent/moveCellContent",
            comps: ["SIMS.Components.Excel.Ribbon", "SIMS.Components.Excel.JSONGrid"]
        }
    }

module.exports = class skillFactory{

    getSkillObjectRef (templateId){
        var skillFile = identifySkill(templateId);
        return require("../../libs/skills" + skillFile);
    }

    identifySkill(templateId){
        if(SkillObjectMap[templateId]){
            return SkillObjectMap[templateId]["skillFilepath"];
        }
        else{
            console.log("No Skill Exists in the map for the templateId : "+ templateId);
        }

    }

    getCompsPath(templateID){
        let compNames = SkillObjectMap[templateID]["comps"];
        let compObject = {};

        for(let comp of compNames){
            compObject[comp] = compFactory.getCompPath(comp);
        }
        return compObject;
    }
}