const compFactory = require('../sim5Comps/compFactory');


// this map should contain the key-value reference for the templateID-skillObjectFile and this file would generate the instance for the SkillObjectfile
var SkillObjectMap = {
        "movecellcontent": {
            primaryFile: "/xl/moveCellContent/moveCellContent",
            dependencyFiles: ["/xl/moveCellContent/dummyDependencyFile"],
            dependencySkills: ["dummyDependencySkill"]
        },
        "dummyDependencySkill":{
            primaryFile: "/xl/moveCellContent/dummyDependencySkill",
            dependencyFiles: [],
            dependencySkills: []
        }
    }

module.exports = class skillFactory{

    getSkillObjectRef (templateId){
        var skillFile = identifySkill(templateId);
        return require("../../libs/skills" + skillFile);
    }

    identifySkill(templateId){
        if(SkillObjectMap[templateId]){
            return SkillObjectMap[templateId]["primaryFile"];
        }
        else{
            console.log("No Skill Exists in the map for the templateId : "+ templateId);
        }
    }

    getSkillFilesPathObject(templateID){
        let skillFilesPathObject = {};
            
        let files = skillFilesPathObject["files"] = [];
        skillFilesPathObject["skillObjectName"] = `skill.${templateID}`;

        function addFilePath (SkillObjectMap) {
            let skillMapOfTemplate = SkillObjectMap[templateID];
            files.push(skillMapOfTemplate.primaryFile);

            if(skillMapOfTemplate.dependencyFiles)
        }
        for(let comp of compNames){
            compObject[comp] = compFactory.getCompPath(comp);
        }
        return compObject;
    }
}