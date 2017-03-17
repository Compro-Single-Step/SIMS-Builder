const event = require('./Event'), helper = require('./Helper');
module.exports = class component {
    constructor(compNode, IOMapJson, additionalAttributes) {
        this.eventObject = {};
        this.compNode = compNode;
        this.IOMapJson = IOMapJson;
        this.additionalAttributes = additionalAttributes;
        this.translationFnMap = {
            "sizeandpos": {
                "fnName": "function1",
                "nodeName": "sizeandpos"
            },
            "initialattrs": {
                "fnName": "function2",
                "nodeName": "initial"
            },
            "finalattrs": {
                "fnName": "function2",
                "nodeName": "final"
            },
            "initialattributesets": {
                "fnName": "function3",
                "nodeName": "initial"
            },
            "finalattributesets": {
                "fnName": "updateFinalAttrSets",
                "nodeName": "final"
            }
        };
    }
    compGenerator(dependencyMap, IOMap_additional) {
        for (var idx = 0; idx < this.compNode.childNodes.length; idx++) {
            let childNode = this.compNode.childNodes[idx];
            if (childNode.nodeType === 1) {
                let tagName = childNode.nodeName;
                if (tagName !== "events") {
                    let currTranslation = this.translationFnMap[tagName];
                    this[currTranslation["fnName"]](currTranslation["nodeName"], childNode, this.IOMapJson, dependencyMap);
                }
            }
        }
        //Additional Attributes
        if (this.additionalAttributes)
            this.addAdditionalAttrs(this.additionalAttributes, this.compNode.getElementsByTagName("initialattrs")[0]);
    }
    function1(setName, XMLNode, jsonMap) {
        if (jsonMap && jsonMap[setName]) {
            for (var idx = 0; idx < XMLNode.childNodes.length; idx++) {
                let attr = XMLNode.childNodes[idx];
                if ((attr.nodeType === 1) && attr.getAttribute("userDefined") === "true") {
                    attr.setAttribute("value", jsonMap[setName][attr.getAttribute("name")]);
                    attr.removeAttribute("userDefined");
                }
            }
        }
    }
    function2(parentSet, XMLNode, jsonMap) {
        if (jsonMap && jsonMap[parentSet]) {
            this.function1("default-attrs", XMLNode, jsonMap[parentSet]);
        }
    }
    function3(parentSet, XMLNode, jsonMap) {
        for (var idx = 0; idx < XMLNode.childNodes.length; idx++) {
            let attr = XMLNode.childNodes[idx];
            if (attr.nodeType === 1) {
                let attrSetName = attr.getAttribute("name");
                if (jsonMap[parentSet][attrSetName])
                    this.function1(attrSetName, attr, jsonMap[parentSet]);
            }
        }
    }
    updateFinalAttrSets(parentSet, XMLNode, jsonMap, dependencyMap) {
        let compID = XMLNode.parentNode.getAttribute("id");
        for (var idx = 0; idx < XMLNode.childNodes.length; idx++) {
            let attr = XMLNode.childNodes[idx];
            if (attr.nodeType === 1) {
                let setName = attr.getAttribute("name");
                if (jsonMap[parentSet][setName]) {
                    if (attr.getAttribute("multiple-occurence") === "true") {
                        let dependencyAttrs = eval(attr.getAttribute("dependency-attr")), dependencyAttrsValues = [];
                        dependencyAttrs.forEach((value, index) => {
                            dependencyAttrsValues[index] = jsonMap[parentSet][setName][value];
                        });
                        //Cartesian Product
                        let cartesianProduct = this.cartesianProduct(dependencyAttrsValues);
                        //Constructing Attribute Set
                        dependencyMap[compID] = {};
                        dependencyMap[compID][setName] = [];
                        attr.removeAttribute("multiple-occurence");
                        attr.removeAttribute("based-on");
                        attr.removeAttribute("dependency-attr");
                        cartesianProduct.forEach((value, index) => {
                            //Cloning Attribute Set
                            let newAttributeset = attr.cloneNode(true);
                            //Updating attribute set name
                            newAttributeset.setAttribute("name", setName + (index + 1));
                            //Dependency Map
                            dependencyMap[compID][setName].push(setName + (index + 1));
                            let attrNodes = newAttributeset.getElementsByTagName("attr");
                            //Filling Values in respective attribute nodes
                            dependencyAttrs.forEach((dependencyAttrName, dependencyAttrIndex) => {
                                for (let i = 0; i < attrNodes.$$length; i++) {
                                    if (dependencyAttrName === attrNodes[i].getAttribute("name") && attrNodes[i].getAttribute("userDefined") === "true") {
                                        attrNodes[i].setAttribute("value", value[dependencyAttrIndex]);
                                        attrNodes[i].removeAttribute("userDefined");
                                        break;
                                    }
                                }
                            });
                            XMLNode.insertBefore(newAttributeset, attr);
                        });
                        XMLNode.removeChild(attr);
                    }
                    else
                        this.function1(setName, attr, jsonMap[parentSet]);
                }
            }
        }
    }
    cartesianProduct(dependencyAttrsValues) {

        if(dependencyAttrsValues.length === 1){
            dependencyAttrsValues[0].forEach((accValue, accIndex) => {
                dependencyAttrsValues[accIndex] = [accValue];
            });
            return dependencyAttrsValues;
        }
        var pdt = dependencyAttrsValues.reduce((accumulator, value, index) => {
            let tempArray = [];
            if (index === 1) {
                accumulator.forEach((accValue, accIndex) => {
                    accumulator[accIndex] = [accValue];
                });
            }
            accumulator.forEach((accValue, accIndex) => {
                value.forEach((val, i) => {
                    tempArray.push([...accumulator[accIndex], val]);
                });
            });
            return tempArray;
        });
        return pdt;
    }
    addAdditionalAttrs(attributesObject, parent) {
        for (let key in attributesObject) {
            let attrNode = helper.createNewElement("attr");
            attrNode.setAttribute("name", key);
            attrNode.setAttribute("value", attributesObject[key]);
            parent.appendChild(attrNode);
        }
    }
    eventGenerator(dependencyMap) {
        let eventNodes = this.compNode.getElementsByTagName("event"), compID = this.compNode.getAttribute("id");
        for (let i = 0; i < eventNodes.$$length; i++) {
            this.eventObject[compID] = new event(eventNodes[i], dependencyMap);
            this.eventObject[compID].eventGenerator();
        }
    }
    newCompGenerator(compID, parentNode) {
        this.compNode = helper.createNewElement("comp");
        this.compNode.setAttribute("id", compID);
        for (let key in this.additionalAttributes) {
            let newCompNode = helper.createNewElement(key);
            this.compNode.appendChild(newCompNode);
            this.addAdditionalAttrs(this.additionalAttributes[key], newCompNode);
        }
        parentNode.appendChild(this.compNode);
    }
};
