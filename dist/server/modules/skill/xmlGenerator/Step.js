const State = require('./State');

module.exports = class Step {

    constructor(stepJson, attrValMap, skillRef, stepData) {
        /*this.id = data.stepId;   // step number 1|2|3...
        this.sText = data.stepText;*/

        this.preloadEntities = stepJson[0];
        this.preloadComps = this.preloadEntities[0];

        this.attrValMap = attrValMap;
        this.states = {}; // object holding state objects with state id as key
        this.stateOrderIdMap = {};
        this.generateStates(stepJson[1], attrValMap);
    }

    generateStates(states, attrValueMap) {

        for (let idx = 0; idx < states.length; idx++) {
            let state = new State(states[idx], attrValueMap.states[states[idx].props.id], this);

            this.states[states[idx].props.id] = state;
            this.stateOrderIdMap[idx] = states[idx].props.id;
        }
    }

    generateXML(stepText) {
        let xmlString = '<task>';

        xmlString += this.generatePreloadNodeXML();
        xmlString += this.addStepTextToXML(stepText);
        xmlString += this.generateStatesXML();

        xmlString += '</task>';
        return xmlString;
    }

    addStepTextToXML(stepText) {
        if (!stepText) {
            stepText = this.fetchStepText();
        }

        let xmlString = '<texts_formatted>' + '<txt id="1" StateStart="1">' + '<![CDATA[' + stepText + ']]>' + '</txt>' + '</texts_formatted>';

        return xmlString;
    }

    // fn to fetch step text from Baloo
    fetchStepText(taskId, stepIdx) {
        return "Model Step Text later to be fetched from Baloo or to be provided by the SIM Builder while making XML generation request.";
    }

    generatePreloadNodeXML() {
        let xmlString = '<preload>';

        // adding comps to preload node
        xmlString += "<comps>";
        for (let idx = 0; idx < this.preloadComps.length; idx++) {
            let currCompProps = this.preloadComps[idx].props;
            xmlString += '<comp id="' + currCompProps.id + '" name="' + currCompProps.name + '" cssclass="' + currCompProps.cssclass + '" type="' + currCompProps.type + '"/>';
        }
        xmlString += "</comps>";

        // adding preload resources
        xmlString += "<resources>";
        for (let idx = 0; idx < this.attrValMap.preloadResources.length; idx++) {
            let currRes = this.attrValMap.preloadResources[idx];
            xmlString += '<res path="' + currRes.path + '" type="' + currRes.type + '"/>';
        }
        xmlString += "</resources>";

        xmlString += '</preload>';
        return xmlString;
    }

    generateStatesXML() {
        let xmlString = '<states>';

        for (let idx in this.stateOrderIdMap) {
            xmlString += this.states[this.stateOrderIdMap[idx]].generateXML();
        }

        xmlString += '</states>';
        return xmlString;
    }

};