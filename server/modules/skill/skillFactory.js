const skillRepo = require('./skillRepo');

class SkillFactory{

    _getSkill (templateId){
        if(skillRepo[templateId]){
            return skillRepo[templateId].primaryFile;
        }
        else{
            console.log("No Skill Exists in the map for the templateId : "+ templateId);
        }
    }

    getSkillObject (templateId){
        let skillFile = this._getSkill(templateId);
        let SkillClass = require("../../libs/skills/" + skillFile);
        let skill = new SkillClass();
        return skill;
    }

    getSkillFilesPath(templateID){
        let skillfilesPathArray = [],
            rootPath = "libs/skills/",
            self = this;;
            
        (function addFilePath (skillTemplateMap, parentFileName) {
            let primaryFileName = self._getFileName(skillTemplateMap.primaryFile);
            skillfilesPathArray.push({originalFileName: primaryFileName, newFileName: parentFileName ? parentFileName + "_" + primaryFileName : primaryFileName, filePath: rootPath + skillTemplateMap.primaryFile+".js"});

            if(skillTemplateMap.dependencyFiles && skillTemplateMap.dependencyFiles.length!==0){
                skillTemplateMap.dependencyFiles.forEach( (value) => {
                    addFilePath(value, primaryFileName);
                })
            }

            if(skillTemplateMap.dependencySkills && skillTemplateMap.dependencySkills.length!==0){
                skillTemplateMap.dependencySkills.forEach( (skillName) => {
                    addFilePath(skillRepo[skillName], primaryFileName);
                });
            }
        })(skillRepo[templateID], null)

        return skillfilesPathArray;
    }

    _getFileName(filePath){
        if(~filePath.lastIndexOf('.js')){
            return filePath.lastIndexOf('\\') > filePath.lastIndexOf('/') ? filePath.substring(filePath.lastIndexOf('\\')+1, filePath.lastIndexOf('.js')) : filePath.substring(filePath.lastIndexOf('/')+1, filePath.lastIndexOf('.js'));
        }
            return filePath.lastIndexOf('\\') > filePath.lastIndexOf('/') ? filePath.substring(filePath.lastIndexOf('\\')+1) : filePath.substring(filePath.lastIndexOf('/')+1);
    }

}

module.exports = new SkillFactory();
