const XMLState = require('./XMLState');

module.exports = class XMLStep {

    constructor (stepJson, attrValMap, skillRef, stepData){
        /*this.id = data.stepId;   // step number 1|2|3...
        this.sText = data.stepText;*/

        this.preloadEntities = stepJson[0];
        this.preloadComps = this.preloadEntities[0];
        
        this.states = {}; // object holding state objects with state id as key
        this.stateOrderIdMap = {};
        console.log("attrValueMap: ", attrValueMap);
        this.generateStates(stepJson[1], attrValueMap);
    }

    generateStates (states, attrValueMap){

        for(let idx=0; idx<states.length; idx++){
            let state = new XMLState (states[idx], attrValueMap.states[states[idx].props.id], this);

            this.states[states[idx].props.id] = state;
            this.stateOrderIdMap[idx] = states[idx].props.id;
        }

    }

    updateState (args){
        // update state based on args
    }

    addStepText  (txt){

        // fn to add step text to the xml
    }

    generateXML (){
        let xmlString = '<task>';

        xmlString += this.generatePreloadNodeXML();
        xmlString += this.generateStatesXML();

        xmlString += '</task>';
        return xmlString;
    }

    generatePreloadNodeXML (){
        let xmlString = '<preload>';

        // adding comps to preload node
        xmlString += "<comps>";
        for(let idx=0; idx<this.preloadComps.length; idx++){
            let currCompProps = this.preloadComps[idx].props;
            xmlString += '<comp id="'+currCompProps.id+'" name="'+currCompProps.name+'" cssclass="'+currCompProps.cssclass+'" type="'+currCompProps.type+'"/>';
        }
        xmlString += "</comps>";

        // adding preload resources
        xmlString += "<resources>" + "</resources>";

        xmlString += '</preload>';
        return xmlString;
    }

    generateStatesXML (){
        let xmlString = '<states>';

        for (let idx in this.stateOrderIdMap){
            xmlString += this.states[this.stateOrderIdMap[idx]].generateXML();
        }

        xmlString += '</states>';
        return xmlString;
    }

}
