// this map should contain the key-value reference for the templateID-skillObjectFile and this file would generate the instance for the SkillObjectfile
module.exports = {
    "movecellcontent": {
        primaryFile: "xl/moveCellContent/moveCellContent",
        dependencyFiles: [
            {
                primaryFile: "xl/common/xlSkill",
                dependencyFiles: [
                    {
                        primaryFile: "common/baseSkill",
                        dependencyFiles: []
                    }
                ]
            }
        ],
        dependencySkills: []
    },
    "maxfunction": {
        primaryFile: "xl/maxfunction/maxfunction",
        dependencyFiles: [
            {
                primaryFile: "xl/common/xlSkill",
                dependencyFiles: [
                    {
                        primaryFile: "common/baseSkill",
                        dependencyFiles: []
                    }
                ]
            }
        ],
        dependencySkills: []
    },
        "insertpicture": {
        dependencyFiles: [
            {
                dependencyFiles: [
                    {
                        primaryFile: "common/baseSkill",
                        dependencyFiles: []
                    }
                ]
            }
        ],
        dependencySkills: []
    }
}