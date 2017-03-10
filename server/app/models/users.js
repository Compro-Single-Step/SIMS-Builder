var mongoose    = require('mongoose');

var Schema = new mongoose.Schema({ 
    name: String, 
    password: String, 
    admin: Boolean 
});
module.exports = mongoose.model('User',Schema);