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
    "sortingtablecolumns": {
        primaryFile: "xl/sortingtablecolumns/sortingtablecolumns",
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
        ]
    }
}