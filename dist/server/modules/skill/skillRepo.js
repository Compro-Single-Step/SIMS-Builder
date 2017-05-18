// this map should contain the key-value reference for the templateID-skillObjectFile and this file would generate the instance for the SkillObjectfile
module.exports = {
    "movecellcontent": {
        primaryFile: "xl/moveCellContent/moveCellContent",
        dependencyFiles: [{
            primaryFile: "xl/common/xlSkill",
            dependencyFiles: [{
                primaryFile: "common/baseSkill",
                dependencyFiles: []
            }]
        }],
        dependencySkills: []
    },
    "maxfunction": {
        primaryFile: "xl/maxfunction/maxfunction",
        dependencyFiles: [{
            primaryFile: "xl/common/xlSkill",
            dependencyFiles: [{
                primaryFile: "common/baseSkill",
                dependencyFiles: []
            }]
        }],
        dependencySkills: []
    },
    "insertpicture": {
        primaryFile: "wd/insertPicture/insertPicture",
        dependencyFiles: [{
            primaryFile: "wd/common/wdSkill",
            dependencyFiles: [{
                primaryFile: "common/baseSkill",
                dependencyFiles: []
            }]
        }]
    },

    "importaccessobject": {
        primaryFile: "ac/importAccessObject/importAccessObject",
        dependencyFiles: [{
            primaryFile: "ac/common/acSkill",
            dependencyFiles: [{
                primaryFile: "common/baseSkill",
                dependencyFiles: []
            }]
        }],
        dependencySkills: []
    },
    "sortingtablecolumns": {
        primaryFile: "xl/sortingTableColumns/sortingtablecolumns",
        dependencyFiles: [{
            primaryFile: "xl/common/xlSkill",
            dependencyFiles: [{
                primaryFile: "common/baseSkill",
                dependencyFiles: []
            }]
        }]
    },
    "insertaudio": {
        primaryFile: "pp/InsertAudio/insertAudio",
        dependencyFiles: [{
            primaryFile: "pp/common/ppSkill",
            dependencyFiles: [{
                primaryFile: "common/baseSkill"
            }]
        }]
    },
    "applyshapeeffect": {
        primaryFile: "wd/ApplyShapeEffect/ApplyShapeEffect",
        dependencyFiles: [{
            primaryFile: "wd/common/wordRibbonEventMap"
        }, {
            primaryFile: "wd/common/wdSkill",
            dependencyFiles: [{
                primaryFile: "common/baseSkill"
            }]
        }]
    }
};
