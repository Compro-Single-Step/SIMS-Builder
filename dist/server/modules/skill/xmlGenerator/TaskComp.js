/**
 * Created with JetBrains WebStorm.
 * User: Tushar
 * Date: 2/6/17
 * Time: 4:03 PM
 * To change this template use File | Settings | File Templates.
 */

const TaskAttr = require('./TaskAttr');
const TaskEvent = require('./TaskEvent');

module.exports = class Comp {

    constructor(comp, attrValMap, parentStateRef) {

        // map holding poperties which are to be mentioned in this comp's node in generated step XML
        this.XMLProps = {
            "id": comp.props.id,
            "mode": comp.props.mode,
            "ref-state": comp.props["ref-state"],
            "subcomp": comp.props.subcomp,
            "hostid": comp.props.hostid
        };

        // this var holds the reference of state object of which this comp object is child
        this.stateRef = parentStateRef;

        this.attrValMap = attrValMap;

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

        this.xmlAttrToObjFnMap = {
            "sizeandpos": {
                "fnName": "createAttrs",
                "attrType": "sizeandpos"
            },

            "initialattrs": {
                "fnName": "createAttrs",
                "attrType": "initial"
            },

            "finalattrs": {
                "fnName": "createAttrs",
                "attrType": "final"
            },

            "initialattributesets": {
                "fnName": "createAttrSets",
                "attrType": "initial"
            },

            "finalattributesets": {
                "fnName": "createAttrSets",
                "attrType": "final"
            }
        };

        if (comp.props.userDefined) {
            this.generateUserDefinedProps(comp.props.userDefined);
        }

        this.addAttrs(comp);
    }

    /**
     * fn reads property names given in comp node of template XML and 
     * add these properties in the comp node of the generated XML with the values coming from AttrValueMap
     * @param {*} propNames : string having comma separated names of properties
     * whose values are user defined and have to be fetched from the AttrValueMap : Eg "hostparam,mode,ref-state"
     */
    generateUserDefinedProps(propNames) {

        let dynamicCompPropsArr = propNames.split(',');
        for (let idx = 0; idx < dynamicCompPropsArr.length; idx++) {
            let propName = dynamicCompPropsArr[idx];
            try {
                let tempPropVal = this.attrValMap.props[propName];
                if (tempPropVal) {
                    this.XMLProps[propName] = tempPropVal;
                } else {
                    throw "error";
                }
            } catch (e) {
                let msg = "ERROR: Value for property '" + propName + "' for CompId '" + this.XMLProps.id + "' " + "in StateId '" + this.stateRef.getId() + "' not found in the AttrValueMap";
                console.log(msg);
            }
        }
    }

    addAttrs(comp) {
        // only those props of component will be handled which are present in xmlAttrToObjFnMap
        // only attributes will be handled
        // events will not be handled in this loop
        for (let attrSet in comp) {
            if (this.xmlAttrToObjFnMap[attrSet]) {
                let fnMap = this.xmlAttrToObjFnMap[attrSet];
                this.attributeSets[attrSet] = this[fnMap.fnName](comp[attrSet][0], fnMap.attrType);
            }
        }
    }

    /**
     * creating attribute sets
     * @param {*} attrSetsObj 
     * @param {*} attrType 
     */
    createAttrSets(attrSetsObj, attrType) {
        let result = {};

        let attrSets = attrSetsObj.attributeset;
        for (let i = 0; i < attrSets.length; i++) {

            if (attrSets[i].props["multiple-occurence"] == "true") {
                let dependencyAttrs = JSON.parse(attrSets[i].props["dependency-attr"]);

                let dependencyVal = this.getAttrValArrBySetNameAndType(attrType, dependencyAttrs, attrSets[i].props.name);

                let dependencyValSetsArr = this.generateDependencyAttrValSets(dependencyVal);
                this.dependencyMap[attrSets[i].props.name] = [];

                for (let j = 1; j <= dependencyValSetsArr.length; j++) {

                    let attrSetName = attrSets[i].props.name + j;
                    this.dependencyMap[attrSets[i].props.name].push(attrSetName); // creating an array of dynamically generated attribute sets names

                    let attrSet = result[attrSetName] = {};
                    if (attrSets[i].props["inherits-default"]) {
                        attrSet["inherits-default"] = attrSets[i].props["inherits-default"];
                    }

                    attrSet["attrs"] = this.createAttrs(attrSets[i], attrType, attrSetName, dependencyValSetsArr[j - 1]);
                }
            } else {
                let attrSet = result[attrSets[i].props.name] = {};
                if (attrSets[i].props["inherits-default"]) {
                    attrSet["inherits-default"] = attrSets[i].props["inherits-default"];
                }
                attrSet["attrs"] = this.createAttrs(attrSets[i], attrType, attrSets[i].props.name);
            }
        }
        return result;
    }

    getAttrValArrBySetNameAndType(attrType, attrNamesArr, attrSetName = "default-attrs") {
        let attrValMap = {};
        for (let i = 0; i < attrNamesArr.length; i++) {
            attrValMap[attrNamesArr[i]] = this.attrValMap[attrType][attrSetName][attrNamesArr[i]];
        }

        return attrValMap;
    }

    getAttrValByNameTypeSet(attrName, attrType, attrSetName = "default-attrs") {
        let val = null;
        try {
            if (attrType === "sizeandpos") val = this.attrValMap[attrType][attrName];else val = this.attrValMap[attrType][attrSetName][attrName];
        } catch (e) {
            console.log("ERROR: Value for attribute " + attrName + " not found in the Attr Value Map");
        }

        return val;
    }

    generateDependencyAttrValSets(attrsValsMap) {

        let attrArr = [];
        let attrValsArr = [];

        for (let attr in attrsValsMap) {
            attrArr.push(attr);
            attrValsArr.push(attrsValsMap[attr]);
        }

        var attrValsCartProd = this.cartesianProduct(attrValsArr);
        let result = [];
        for (let i = 0; i < attrValsCartProd.length; i++) {
            let resAttrSet = {};
            for (let j = 0; j < attrArr.length; j++) {
                resAttrSet[attrArr[j]] = attrValsCartProd[i][j];
            }
            result.push(resAttrSet);
        }

        return result;
    }

    cartesianProduct(arr) {
        return arr.reduce(function (a, b) {
            return a.map(function (x) {
                return b.map(function (y) {
                    return x.concat(y);
                });
            }).reduce(function (a, b) {
                return a.concat(b);
            }, []);
        }, [[]]);
    }

    /**
     * use this.createAttr to create attributes' objects
     */
    createAttrs(attrs, attrType, attrSetName, attrsVal) {
        let result = [];
        let attrArr = attrs.attr;
        for (let i = 0; i < attrArr.length; i++) {
            let myAttr = this.createAttr(attrArr[i].props, attrType, attrSetName, attrsVal);
            result.push(myAttr);
        }
        return result;
    }

    /**
     * creating single attribute object
     */
    createAttr(args, attrType, attrSetName, attrsVal) {

        let val = args.value;
        if (args.userDefined) {
            if (attrsVal) {
                if (attrsVal[args.name]) {
                    val = attrsVal[args.name];
                }
            } else {
                let tempVal = this.getAttrValByNameTypeSet(args.name, attrType, attrSetName, this.XMLProps.id);
                if (tempVal) {
                    val = tempVal;
                }
            }
        }

        let myAttr = new TaskAttr(args, val, this);
        return myAttr;
    }

    /**
     * Adding event objects
     * @param {*} events : arr of events
     */
    addEvents(events) {
        this.events = [];
        let eventArr = events.event;
        for (let i = 0; i < eventArr.length; i++) {
            this.events.push(this.createEvt(eventArr[i]));
        }
    }

    /**
     * creating single event object
     * @param {*} evt : event data used in object creation
     */
    createEvt(evt) {
        let myEvt = new TaskEvent(evt, this);
        return myEvt;
    }

    getCompValidationSets(compId, dependencyName) {

        let result;

        if (compId == this.XMLProps.id) {
            result = this.getDependencySetByName(dependencyName);
        } else {
            result = this.stateRef.getCompValidationSets(compId, dependencyName);;
        }

        return result;
    }

    getDependencySetByName(name) {
        return this.dependencyMap[name];
    }

    generateParentSetXML(parentAttrSet, parentSetNodeName) {
        let xmlString = '<' + parentSetNodeName + '>';

        for (let attrSetName in parentAttrSet) {
            let currParentAttrSet = parentAttrSet[attrSetName];
            xmlString += this.generateAttrSetXML(currParentAttrSet["attrs"], "attributeset", attrSetName, currParentAttrSet["inherits-default"]);
        }

        xmlString += '</' + parentSetNodeName + '>';
        return xmlString;
    }

    generateAttrSetXML(attrSet, setNodeName, setName, inheritsDef) {
        let xmlString = '<' + setNodeName + ' ';
        if (setName) {
            xmlString += 'name="' + setName + '" ';
        }
        if (inheritsDef) {
            xmlString += 'inherits-default="' + inheritsDef + '"';
        }
        xmlString += '>';

        for (let idx = 0; idx < attrSet.length; idx++) {
            xmlString += attrSet[idx].generateXML();
        }

        xmlString += '</' + setNodeName + '>';

        return xmlString;
    }

    generateXML() {

        let xmlString = "<comp ";
        for (let propName in this.XMLProps) {
            let propVal = this.XMLProps[propName];
            if (propVal) {
                xmlString += propName + "='" + propVal + "' ";
            }
        }
        xmlString += ">";

        // adding attribute XML
        for (let attrSet in this.attributeSets) {
            xmlString += this[this.attrXMLGenerationMap[attrSet]["fnName"]](this.attributeSets[attrSet], attrSet);
        }

        // adding event XML
        if (this.events) {
            xmlString += "<events>";
            for (let evtIdx = 0; evtIdx < this.events.length; evtIdx++) {
                xmlString += this.events[evtIdx].generateXML();
            }
            xmlString += "</events>";
        }

        xmlString += '</comp>';
        return xmlString;
    }

    // returning Id of this component
    getId() {
        return this.XMLProps.id;
    }

    // fetching parent state's ID of this component
    getStateId() {
        return this.stateRef.getId();
    }
};