const State = require('./State');

module.exports = class Step {

    constructor (stepJson, attrValMap, skillRef, stepData){
        /*this.id = data.stepId;   // step number 1|2|3...
        this.sText = data.stepText;*/

        this.preloadEntities = stepJson[0];
        this.preloadComps = this.preloadEntities[0];
        
        this.attrValMap = attrValMap;
        this.states = {}; // object holding state objects with state id as key
        this.stateOrderIdMap = {};
        this.generateStates(stepJson[1], attrValMap);
    }

    generateStates (states, attrValueMap){

        for(let idx=0; idx<states.length; idx++){
            let currAttrValMap;

            if(attrValueMap && attrValueMap.states){
                currAttrValMap = attrValueMap.states[states[idx].props.id];
            }

            let state = new State (states[idx], currAttrValMap, this);

            this.states[states[idx].props.id] = state;
            this.stateOrderIdMap[idx] = states[idx].props.id;
        }

    }

    generateXML (stepText){
        let xmlString = '<task>';

        xmlString += this.generatePreloadNodeXML();
        xmlString += this.addStepTextToXML(stepText);
        xmlString += this.generateStatesXML();

        xmlString += '</task>';
        return xmlString;
    }

    addStepTextToXML (stepText){
        if(!stepText){
            stepText = this.fetchStepText();
        }
        
        let xmlString = '<texts_formatted>' +
                            '<txt id="1" StateStart="1">'+
                                '<![CDATA['+stepText+']]>'+
                            '</txt>'+
                        '</texts_formatted>';

        return xmlString;
    }

    // fn to fetch step text from Baloo
    fetchStepText(taskId, stepIdx){
        return "Model Step Text later to be fetched from Baloo or to be provided by the SIM Builder while making XML generation request.";
    }

    generatePreloadNodeXML (){
        let xmlString = '<preload>';

        // adding comps to preload node
        xmlString += "<comps>";
        for(let idx=0; idx<this.preloadComps.length; idx++){
            let currCompProps = this.preloadComps[idx].props;
            xmlString += this.generatePreloadCompXML(currCompProps);
        }
        xmlString += "</comps>";

        // adding preload resources
        xmlString += "<resources>";
        for(let idx=0; idx<this.attrValMap.preloadResources.length; idx++){
            let currRes = this.attrValMap.preloadResources[idx];
            xmlString += '<res path="'+currRes.path+'" type="'+currRes.type+'"/>';
        }
        xmlString += "</resources>";

        xmlString += '</preload>';
        return xmlString;
    }

    /**
     * fn to gnerate XML node of a component in preload node
     * @param {*} compProps : properties of that comp node which are mentioned in template XML
     */
    generatePreloadCompXML (compProps){
        if(compProps.userDefined){
            let dynamicCompPropsArr = compProps.userDefined.split(',');
            for(let idx=0; idx<dynamicCompPropsArr.length; idx++){
                try{
                    let propName = dynamicCompPropsArr[idx];
                    let tempPropVal = this.attrValMap.preload.comps[compProps.id][propName];
                    if (tempPropVal) {
                        compProps[propName] = tempPropVal;
                    }
                }catch(e){
                    console.log("ERROR: Value for property '"+dynamicCompPropsArr[idx]+"' for CompId '"+compProps.id+"' (in preload node) not found in the Attr Value Map");
                }
            }
        }
        
        let xmlStr = '<comp id="'+compProps.id+'" name="'+compProps.name+'" cssclass="'+compProps.cssclass+'" type="'+compProps.type+'"';
        if(compProps.title){
            xmlStr += ' title="'+compProps.title+'"';
        }
        xmlStr += ' />';
        return xmlStr;
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
