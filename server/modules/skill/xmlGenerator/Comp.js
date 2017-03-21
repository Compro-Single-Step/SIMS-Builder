/**
 * Created with JetBrains WebStorm.
 * User: Tushar
 * Date: 2/6/17
 * Time: 4:03 PM
 * To change this template use File | Settings | File Templates.
 */

const Attr = require('./Attr');
const Sim5Evt = require('./Event');


module.exports = class Comp {

    constructor (comp, attrValMap, parentStateRef){

        this.id = comp.props.id;
        this.mode = comp.props.mode;
        this.stateRef = parentStateRef;
        this.attrValMap = attrValMap;
        console.log("comp attrValMap: ", attrValMap);

        // this object will be having references of attributes according to their sets
        // this is to be used in XML formation
        this.attributeSets = {
            /*"sizeAndPos": [],
             "initialAttrs": [],
             "finalAttrs": [],
             "initialAttributeSets": {
             "set1": {},
             "set2": {}
             },
             "finalAttributeSets": {
             "set1": {},
             "set2": {}
             }*/

        };

        this.dependencyMap = {};

        this.attrXMLGenerationMap = {
            "sizeandpos": {
                "fnName": "generateAttrSetXML"
            },

            "initialattrs": {
                "fnName": "generateAttrSetXML"
            },

            "finalattrs": {
                "fnName": "generateAttrSetXML"
            },

            "initialattributesets": {
                "fnName": "generateParentSetXML"
            },

            "finalattributesets": {
                "fnName": "generateParentSetXML"
            }
        };

        this.addAttrs(comp);

    }

    addAttrs (comp){

        if(comp.initialattrs){
            this.attributeSets.initialattrs = this.createAttrs(comp.initialattrs, "initial");
        }

        if(comp.finalattrs){
            this.attributeSets.finalattrs = this.createAttrs(comp.finalattrs, "final");
        }

        if(comp.initialattributesets){
            this.attributeSets.initialattributesets = this.createAttrSets(comp.initialattributesets, "initial");
        }

        if(comp.finalattributesets){
            this.attributeSets.finalattributesets = this.createAttrSets(comp.finalattributesets, "final");
        }

    }

    createAttrSets (attrSets, attrType){
        let result = {};

        console.log("this.attrValMap: ", this.attrValMap);

        for(let i=0; i<attrSets.length; i++){

            if(attrSets[i].props["multiple-occurence"]=="true"){
                let dependencyAttrs = JSON.parse(attrSets[i].props["dependency-attr"]);
                
                let dependencyValArr = this.getAttrValArrBySetNameAndType(attrType, dependencyAttrs, attrSets[i].props.name);

                // console.log("dependencyValArr: ", dependencyValArr);

                let dependencyValSetsArr = this.generateDependencyAttrValSets(dependencyValArr);
                this.dependencyMap[attrSets[i].props.name] = [];

                for(let j=1; j<=dependencyValSetsArr.length; j++){

                    let attrSetName = attrSets[i].props.name + j;
                    this.dependencyMap[attrSets[i].props.name].push(attrSetName); // creating an array of dynamically generated attribute sets names

                    let attrSet = result[attrSetName] = {};
                    if(attrSets[i].props["inherits-default"]){
                        attrSet["inherits-default"] = attrSets[i].props["inherits-default"];
                    }

                    attrSet["attrs"] = this.createAttrs(attrSets[i].attr, attrType, attrSetName, dependencyValSetsArr[j-1]);

                }
            }else{
                let attrSet = result[attrSets[i].props.name] = {};
                if(attrSets[i].props["inherits-default"]){
                    attrSet["inherits-default"] = attrSets[i].props["inherits-default"];
                }
                attrSet["attrs"] = this.createAttrs(attrSets[i].attr, attrType, attrSets[i].props.name);
            }
        }
        return result;
    }

    getAttrValArrBySetNameAndType (attrType, attrNamesArr, attrSetName = "default-attrs"){
        // console.log("dependencyAttrs: ", attrNamesArr);
        // console.log("attrSetName: ", attrSetName);

        let attrValMap = {};
        
        for(let i=0; i<attrNamesArr.length; i++){
            attrValMap[attrNamesArr[i]] = this.attrValMap[attrType][attrSetName][attrNamesArr[i]];
        }
        
        return attrValMap;
    }

    getAttrValByNameTypeSet(attrName, attrType, attrSetName="default-attrs"){
        let val = null;
        try{
            val = this.attrValMap[attrType][attrSetName][attrName]
        }catch(e){

        }
        
        return val;
    }

    generateDependencyAttrValSets (dependencyValArr){
        /*for(let i=0; i<Object.keys(dependencyValArr).length; i++){

         }*/

        return [
            {
                "SELECTED_CELLS": "D5:E6"
            },
            {
                "SELECTED_CELLS": "D5:E5"
            },
            {
                "SELECTED_CELLS": "D5:D6"
            },
            {
                "SELECTED_CELLS": "D5"
            }
        ]

    }


    createAttrs (attrs, attrType, attrSetName, attrsVal){
        let result = [];
        for(let i=0; i<attrs.length; i++){
            let myAttr = this.createAttr(attrs[i].props, attrType, attrSetName, attrsVal);
            result.push(myAttr);
        }
        return result;
    }

    createAttr  (args, attrType, attrSetName, attrsVal){
        let myAttr = new Attr(args);

        let val = args.value;
        if(!val){
            if(attrsVal){
                if(attrsVal[args.name]){
                    val = attrsVal[args.name];
                }
            }else{
                val = this.getAttrValByNameTypeSet(myAttr.name, attrType, attrSetName, this.id)
            }

        }
        console.log("val: ", val);
        myAttr.setValue(val);
        return myAttr;
    }




    addEvents (events){
        this.events = [];

        for(let i=0; i<events.length; i++){
            this.events.push(this.createEvt(events[i]));
        }

    }

    createEvt  (evt){
        let myEvt = new Sim5Evt(evt, this);
        return myEvt;
    }

    getCompValidationSets (compId, dependencyName){
        return this.stateRef.getCompValidationSets(compId, dependencyName);
    }

    getDependencySetByName (name){
        return this.dependencyMap[name];
    }

    generateParentSetXML (parentAttrSet, parentSetNodeName){
        let xmlString = '<'+parentSetNodeName+'>';

        for (let attrSet in parentAttrSet){
            xmlString += this.generateAttrSetXML(parentAttrSet[attrSet].attrs, "attributeset", attrSet);
        }

        xmlString += '</'+parentSetNodeName+'>';
        return xmlString;
    }

    generateAttrSetXML (attrSet, setNodeName, setName){
        let xmlString = '<'+setNodeName+' name="'+setName+'">';

        for(let idx=0; idx<attrSet.length; idx++){
            xmlString += attrSet[idx].generateXML();
        }

        xmlString += '</'+setNodeName+'>';

        return xmlString;
    }

    generateXML (){
        let xmlString = '<comp id="'+ this.id +'" mode="' + this.mode + '">';

        // adding attribute XML
        for (let attrSet in this.attributeSets){
            console.log("attrSet: ", attrSet);
            xmlString += this[this.attrXMLGenerationMap[attrSet]["fnName"]](this.attributeSets[attrSet], attrSet);
        }

        // adding event XML
        if(this.events){
            for(let evtIdx = 0; evtIdx<this.events.length; evtIdx++){
                xmlString += this.events[evtIdx].generateXML();
            }
        }

        xmlString += '</comp>';
        return xmlString;
    }

}
