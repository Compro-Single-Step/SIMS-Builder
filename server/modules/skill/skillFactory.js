const compFactory = require('../sim5Comps/compFactory');


// this map should contain the key-value reference for the templateID-skillObjectFile and this file would generate the instance for the SkillObjectfile
var SkillObjectMap = {
        "movecellcontent": {
            primaryFile: "/xl/moveCellContent/moveCellContent",
            dependencyFiles: ["/xl/moveCellContent/dummyDependencyFile"],

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
        let files = [],
            rootPath = "libs/skills";
            
        (function addFilePath (skillMapOfTemplate) {
            rootPath = "libs/skills";
            files.push(rootPath+skillMapOfTemplate.primaryFile+".js");

            if(skillMapOfTemplate.dependencyFiles && skillMapOfTemplate.dependencyFiles.length!==0){
                skillMapOfTemplate.dependencyFiles.forEach( (value) => {
                    files.push(rootPath+value+".js");
                })
            }

            if(skillMapOfTemplate.dependencySkills && skillMapOfTemplate.dependencySkills.length!==0){
                skillMapOfTemplate.dependencySkills.forEach( (skillName) => {
                    addFilePath(SkillObjectMap[skillName]);
                });
            }
        })(SkillObjectMap[templateID])

        return files;
    }

}