module.exports = class TaskAttr {

    constructor (arg){
        this.name = arg.name; // INIT_DOC_JSON
        this.type = arg.type; // img | json | text | bool --> to determine if this has to be pre-loaded
    }

    setValue (val){
        this.val = val;
    }

    generateXML (){
        let result = "";
        // check to exlude the attribute node from the generated XML 
        // if there was no value for this attribute
        if(this.val != null){
            result = "<attr name='"+this.name+"' value='"+this.val+"'/>";
        }
        return result;
    }
}
