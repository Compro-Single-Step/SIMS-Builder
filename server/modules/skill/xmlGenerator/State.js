const TaskComp = require('./TaskComp')

module.exports = class State {

    /**
     * 
     * @param {*} args : template XML related data for this state
     * @param {*} attrValMap : AttributeValueMap pertaining to this state only 
     * @param {*} parentStepRef : obj reference of step class
     * @param {*} addValMap : AddionalData which was present in full Attribute Value Map
     */
    constructor (args, attrValMap, parentStepRef, addValMap){
        
        // to check if the existence of this node is conditional
        if(args.props.sbRule == "conditional-occurrence"){
            if (addValMap[args.props.dependencyName] != args.props.dependencyValue){
                this.ignoreThisNode = true;
                return;
            }
        }
        
        this.id = args.props.id; // state id
        this.description = args.props.desc;
        this.compstack = args.props.compstack;
        this.txt = args.props.txt;
        this.islast = args.props.islast;
        this.stepRef = parentStepRef;
        this.addValMap = addValMap;
        this.comps = {};

        this.generateComponents(args.comps[0].comp, attrValMap);

    }

    generateComponents (comps, attrValMap){

        for(let i=0; i<comps.length; i++){
            this.addComp(comps[i], attrValMap);
        }

        for(let i=0; i<comps.length; i++){
            if(comps[i].events){
                this.comps[comps[i].props.id].addEvents(comps[i].events[0]);
            }

        }

    }

    addComp (comp, attrValMap){

        if(this.comps[comp.props.id]){
            this.updateComp(comp);
        }else{
            let currAttrValMap;

            if(attrValMap && attrValMap.components){
                currAttrValMap = attrValMap.components[comp.props.id];
            }

            let myComp = this.createComp(comp, currAttrValMap);
            this.comps[comp.props.id] = myComp;
        }
    }

    createComp (comp, attrValMap) {
        let myComp = new TaskComp(comp, attrValMap, this, this.addValMap);
        return myComp;
    }

    updateComp  (args) {
        // update comp based on args
    }

    getCompValidationSets (compId, dependencyName){
        return this.comps[compId].getDependencySetByName(dependencyName);
    }

    generateXML (){
        let xml = "";
        if(this.ignoreThisNode != true){
            xml = '<state id="'+ this.id +'" desc="'+ this.description +'" ';

            if(this.compstack){
                xml += 'compstack="'+this.compstack+'" ';
            }

            if(this.txt){
                xml += 'txt="'+this.txt+'" ';
            }

            if(this.islast){
                xml += 'islast="'+this.islast+'" ';
            }

            xml += '><comps>';

            for (let currComp in this.comps) {
                xml += this.comps[currComp].generateXML();
            }
            xml += '</comps></state>';
        }

        return xml;
    }

    /**
     * return id of this state mentioned in template XML
     * currently this fn is being called by children components
     */
    getId(){
        return this.id;
    }
}
