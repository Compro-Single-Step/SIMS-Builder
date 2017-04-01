module.exports = class event {
    constructor(eventNode, dependencyMap) {
        this.eventNode = eventNode;
        this.dependencyMap = dependencyMap;
    }
    eventGenerator() {
        let validate_compNode = this.eventNode.getElementsByTagName("comp");
        for (let i = 0; i < validate_compNode.$$length; i++) {
            if (validate_compNode[i].getAttribute("multiple-occurence") === "true") {
                let dependencySet = validate_compNode[i].getAttribute("dependency-set"), compId = validate_compNode[i].getAttribute("id"), parentNode = validate_compNode[i].parentNode;
                validate_compNode[i].removeAttribute("multiple-occurence");
                validate_compNode[i].removeAttribute("based-on");
                validate_compNode[i].removeAttribute("dependency-set");
                if (this.dependencyMap[compId][dependencySet]) {
                    this.dependencyMap[compId][dependencySet].forEach((finalAttrSetName, index) => {
                        //Cloning Attribute Set
                        let newcompNode = validate_compNode[i].cloneNode(true);
                        newcompNode.setAttribute("validation-set", finalAttrSetName);
                        parentNode.insertBefore(newcompNode, validate_compNode);
                    });
                    parentNode.removeChild(validate_compNode);
                }
            }
        }
    }
};
