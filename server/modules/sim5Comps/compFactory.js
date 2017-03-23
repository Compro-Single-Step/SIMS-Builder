const path = require('path');

class compFactory{

    constructor(){
        this.compMap = {
            "SIMS.Components.Excel.Ribbon":{
                CompFilePath: "/ribbon/ribbon",
                subComps: ["abc", "pqr"]
            },
            "SIMS.Components.Excel.JSONGrid": {
                CompFilePath: "/JSONGrid/JSONGrid",
                subComps: ["abc", "pqr"]
            }
        }
    }

    // getCompObjectRef (compName){
    //     let compPath = this.getCompPath(compName);
    //     if(compPath){
    //         return require("../../libs/sim5Comps" + compPath);
    //     }
    //     else
    //         return {};  //Component not found
    // }

    getCompPath(compName){
        if(this.compMap[compName])
            return path.join("libs", "sim5Comps", this.compMap[compName]["CompFilePath"] + ".js");
        return "Component not found"
    }
}

module.exports = new compFactory();