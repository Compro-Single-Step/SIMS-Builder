class ModelHelper {

  getMongoSearchObject(query, schema_search_map) {

    if (Object.keys(query).length === 0 && query.constructor === Object) {
      return {};
    } else {
      let q_arr = [];
      for (var key in query) {
        if (query.hasOwnProperty(key)) {
          let x = schema_search_map[key] ? schema_search_map[key] : key;
          q_arr.push({[x]: query[key]});
        }
      }
      return {$and: q_arr};
    }
  }
}

module.exports = new ModelHelper();
