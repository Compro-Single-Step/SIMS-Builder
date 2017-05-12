const hb = require('handlebars');
const hbHelperFns = require('./hbHelperFns')

class HBUtils{

    constructor(){
        for(let helper in hbHelperFns){
            hb.registerHelper(helper, hbHelperFns[helper]);
        }
    }

    _init (customHelperFns){
       // todo: register skill-spcific/ additional custom helper functions
    }

    getHBTemplate (template, helperFns){
        this._init(helperFns);
        return hb.compile(template);
    }
}

module.exports = new HBUtils();