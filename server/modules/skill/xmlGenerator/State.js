const Comp = require('./Comp')
module.exports = class State {

    constructor (args, attrValMap, parentStepRef){
        this.id = args.props.id; // state id
        this.description = args.props.desc;
        this.stepId = args.props.txt;
        this.stepRef = parentStepRef;
        this.comps = {};

        this.generateComponents(args.comps, attrValMap);

    }

    generateComponents (comps, attrValMap){

        for(let i=0; i<comps.length; i++){
            this.addComp(comps[i], attrValMap);
        }

        for(let i=0; i<comps.length; i++){
            if(comps[i].events){
                this.comps[comps[i].props.id].addEvents(comps[i].events);
            }

        }

    }

    addComp (comp, attrValMap){

        if(this.comps[comp.props.id]){
            this.updateComp(comp);
        }else{
            let myComp = this.createComp(comp, attrValMap.components[comp.props.id]);
            this.comps[comp.props.id] = myComp;
        }
    }

    createComp   (comp, attrValMap) {
        let myComp = new Comp(comp, attrValMap, this);
        return myComp;
    }

    updateComp  (args) {
        // update comp based on args
    }

    getCompValidationSets (compId, dependencyName){
        return this.comps[compId].getDependencySetByName(dependencyName);
    }

    generateXML (){
        console.log("this.comps: ", this.comps);
        let xml = '<state id="'+ this.id +'" desc="'+ this.description +'"><comps>';


        for (let currComp in this.comps) {
            xml += this.comps[currComp].generateXML();
        }
        xml += '</comps></state>';

        return xml;

    }
}
