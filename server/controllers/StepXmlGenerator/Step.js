var DOMParser = require('xmldom').DOMParser, XMLSerializer = require('xmldom').XMLSerializer;
const state = require('./State'), helper = require('./Helper');
// const preloadGenerator = require('./preloadGenerator');
module.exports = class step {
    constructor(skillTemplate, IOMapJson) {
        this.stateObject = {};
        this.compIDMapping = {};
        this.skillTemplate = skillTemplate;
        this.IOMapJson = IOMapJson;
    }
    stepGenerator() {
        this.IOMapJson = JSON.parse(this.IOMapJson);
        this.skillTemplateXML = new DOMParser().parseFromString(this.skillTemplate, "text/xml");
        //Initializing helper function
        let self = this;
        helper.createNewElement = function (tagName) {
            return self.skillTemplateXML.createElement(tagName);
        };
        let preloadNode = this.skillTemplateXML.getElementsByTagName("preload")[0];
        //Getting Comp ID compIDMapping
        let preloadCompNodes = preloadNode.getElementsByTagName("comp");
        for (let i = 0; i < preloadCompNodes.$$length; i++) {
            this.compIDMapping[preloadCompNodes[i].getAttribute("id")] = preloadCompNodes[i].getAttribute("name");
        }
        //Updating Preload Resources
        this.preloadGenerator(preloadNode, this.IOMapJson.preloadResources);
        //Creating each state
        let stateNodes = this.skillTemplateXML.getElementsByTagName("state"), IOMap_additional = JSON.parse(JSON.stringify(this.IOMapJson["additionals"]));
        for (let i = 0; i < stateNodes.$$length; i++) {
            let stateID = stateNodes[i].getAttribute("id");
            this.stateObject[stateID] = new state(stateNodes[i], stateID, this.IOMapJson.states[stateID]);
            this.stateObject[stateID].stateGenerator(this.compIDMapping, IOMap_additional);
        }
        //HARDCODING NEW COMP ID but it has to be fetched from Start state info
        let compID = parseInt("100");
        let i = 0;
        //Adding Additional Comp
        //Adding in Preload section
        for (let key in IOMap_additional) {
            let preloadCompsNode = preloadNode.getElementsByTagName("comps")[0];
            let compNode = helper.createNewElement("comp");
            compNode.setAttribute("id", compID + i);
            compNode.setAttribute("name", key);
            for (let preloadArgument in IOMap_additional[key]["preload"]) {
                compNode.setAttribute(preloadArgument, IOMap_additional[key]["preload"][preloadArgument]);
            }
            preloadCompsNode.appendChild(compNode);
            delete IOMap_additional[key]["preload"];
            i++;
        }
        //Adding Additional Components - Hardcoding State 1 as initial state 
        this.stateObject["1"].addAdditionalComponent(IOMap_additional, compID);
        //Converting back to XML
        let serializer = new XMLSerializer();
        let OutputXML = serializer.serializeToString(this.skillTemplateXML);
        return OutputXML;
        /*var step = this.createStep(xmlDoc, translatedUserData)
        this.createXml(step);*/
    }
    preloadGenerator(preloadNode, IOMapJson) {
        let resourcesNode = helper.createNewElement("resources");
        preloadNode.appendChild(resourcesNode);
        IOMapJson.forEach((object, index) => {
            let resNode = helper.createNewElement("res");
            resourcesNode.appendChild(resNode);
            for (let key in object) {
                resNode.setAttribute(key, object[key]);
            }
        });
    }
};
