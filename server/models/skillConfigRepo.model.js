const mongoose = require("mongoose");

const skillConfigRepoSchema = new mongoose.Schema({
    template_id: "string",
    ui_config_path: "string",
    io_map_path: "string",
    skill_xml_path: "string",
    data_model_path: "string"
},
{
    collection: 'skill_config_repo'
});

skillConfigRepoSchema.statics = {
    getUIConfigPath: function(templateId, callback) {
        this.find({"template_id": templateId}, {"_id": false, "ui_config_path": true}, (error, data) => {
            callback(data[0]["ui_config_path"], error);
        });
    },
    getIOMapPath: function(templateId, callback) {
        this.find({"template_id": templateId}, {"_id": false, "io_map_path": true}, (error, data) => {
            callback(data[0]["io_map_path"], error);
        });
    },
    getSkillXMLPath: function(templateId, callback) {
        this.find({"template_id": templateId}, {"_id": false, "skill_xml_path": true}, (error, data) => {
            callback(data[0]["skill_xml_path"], error);
        });
    },
    getSkillModelPath: function(templateId, callback) {
        this.find({"template_id": templateId}, {"_id": false, "data_model_path": true}, (error, data) => {
            callback(data[0]["data_model_path"], error);
        });
    }
};

let skill_config_repo = mongoose.model('skill_config_repo', skillConfigRepoSchema);

module.exports = {
    skill_config_repo
};
