class ModelHelper {

  // this creates query for mongo from user query
  getMongoSearchObject(query, schema_search_map) {

    /**
     [
       {
           ork1: k1,
           ork2: k2
           },
       {key: k1}
     ]

     ----------------------------------

     $and: [
       { $or: [{ork1: 1}, {ork2: 1}] },
       { key: k1}
     ]

     */

    // if query is array
      // if query is object - > create or q
      // if query is el -> add to and

    if ((query.constructor === Array && query.length === 0) ||
      (query.constructor === Object && Object.keys.length === 0)) {
      return {};
    } else if (query.constructor === Object) {
      query = [query]
    }

    var mongo_q = [];

    try {
      for( let p = 0; p< query.length; p++){
        if (query[p].constructor === Object && (Object.keys(query[p]).length > 0)) {
          var _q_or = [];
          for( let i = 0; i< Object.keys(query[p]).length; i++){
            for (var key in query[p]) {
              if (query[p].hasOwnProperty(key)) {
                let x = schema_search_map[key] ? schema_search_map[key] : key;
                _q_or.push({[x]: query[p][key]});
              }
            }
          }
          _q_or.length > 0 ? mongo_q.push({$or: _q_or}) :  mongo_q.push(_q_or[0]);
        }
      }
    } catch (er){ console.log(er)};

    return {$and: mongo_q};
  }
}

module.exports = new ModelHelper();
