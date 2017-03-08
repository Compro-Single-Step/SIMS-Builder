const mongoose = require("mongoose");

const skillConfigRepoSchema = new mongoose.Schema({
    template_id: "string",
    ui_config_path: "string",
    io_map_path: "string",
    skill_xml_path: "string",
    data_model_path: "string"
}, {collection: 'skill_config_repo'});

skillConfigRepoSchema.statics = {
    getFilesPathArray: function(query, map, callback) {
        this.find(query, map, callback);
    }
};

let skill_config_repo = mongoose.model('skill_config_repo', skillConfigRepoSchema);

module.exports = {
    skill_config_repo
};
