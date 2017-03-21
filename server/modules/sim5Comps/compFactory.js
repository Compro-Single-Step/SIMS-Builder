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

    getCompObjectRef (compName){
        let compPath = this.getCompPath(compName);
        if(compPath){
            return require("../../libs/sim5Comps" + compPath);
        }
        else
            return {};  //Component not found
    }

    getCompPath(compName){
        return this.compMap[compName]["CompFilePath"];
    }
}

module.exports = new compFactory();