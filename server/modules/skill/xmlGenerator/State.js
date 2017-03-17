const component = require('./Component'), helper = require('./Helper');
;
module.exports = class state {
    constructor(stateNode, stateID, IOMapJson) {
        this.componentObject = {};
        this.stateNode = stateNode;
        this.IOMapJson = IOMapJson;
        this.stateID = stateID;
    }
    stateGenerator(compIDMapping, IOMap_additional) {
        this.compsNode = this.stateNode.getElementsByTagName("comps")[0];
        let compNodes = this.compsNode.childNodes, dependencyMap = {};
        //Update all Components of a state
        for (let i = 0; i < compNodes.length; i++) {
            if (compNodes[i].nodeName === "comp") {
                let compID = compNodes[i].getAttribute("id");
                this.componentObject[compID] = new component(compNodes[i], this.IOMapJson.components[compID], IOMap_additional[compIDMapping[compID]]);
                this.componentObject[compID].compGenerator(dependencyMap);
                delete IOMap_additional[compIDMapping[compID]];
            }
        }
        //Update all events of a state
        for (let key in this.componentObject) {
            this.componentObject[key].eventGenerator(dependencyMap);
        }
    }
    addAdditionalComponent(IOMap_additionalComps, compID) {
        for (let key in IOMap_additionalComps) {
            this.componentObject[compID] = new component(null, null, IOMap_additionalComps[key]);
            this.componentObject[compID].newCompGenerator(compID++, this.compsNode);
        }
    }
};
