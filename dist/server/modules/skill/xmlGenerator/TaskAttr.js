module.exports = class TaskAttr {

    constructor(arg, val, compRef) {
        this.XMLProps = {
            "name": arg.name, /* INIT_DOC_JSON */
            "params": arg.params
        };

        this.parentCompRef = compRef;
        this.setValue(arg, val);
    }

    /**
     * sets properties of attr node
     * @param {*} args : metadata
     * @param {*} val : it can be a string or an object
     * If string => directly goes to value property
     * If object => fills several properties of this XML node using keys as property names
     */
    setValue(args, val) {
        if (args.userDefined && args.userDefined != "true") {
            let propNames = args.userDefined;
            let dynamicAttrPropsArr = propNames.split(',');
            for (let idx = 0; idx < dynamicAttrPropsArr.length; idx++) {
                let propName = dynamicAttrPropsArr[idx];
                try {
                    let tempPropVal = val[propName];
                    if (tempPropVal) {
                        this.XMLProps[propName] = tempPropVal;
                    } else {
                        throw "error";
                    }
                } catch (e) {
                    let msg = "ERROR: Value for property '" + propName + "' for Attribute '" + this.XMLProps.name + "' " + "for CompId '" + this.parentCompRef.getId() + "' " + "in StateId '" + this.parentCompRef.getStateId() + "' not found in the AttrValueMap";
                    console.log(msg);
                }
            }
        } else {
            this.XMLProps.value = val;
        }
    }

    generateXML() {
        let xmlString = "";
        // ignore attr node in XML if value is NULL
        if (this.XMLProps.value != null) {
            xmlString = "<attr ";
            for (let propName in this.XMLProps) {
                let propVal = this.XMLProps[propName];
                if (propVal) {
                    xmlString += propName + "='" + propVal + "' ";
                }
            }
            xmlString += "/>";
        }
        return xmlString;
    }

};