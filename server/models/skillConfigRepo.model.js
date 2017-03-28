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

const configTypeMap = {
    "uiconfig": "ui_config_path",
    "iomap": "io_map_path",
    "xml": "skill_xml_path",
    "model": "data_model_path"
}

skillConfigRepoSchema.statics = {
    getSkillConfigPath: function(templateId, configType, callback) {

        let projection = {"_id": false};
        projection[configTypeMap[configType]] = true;

        this.find({"template_id": templateId}, projection, (error, data) => {
            callback(data[0][configTypeMap[configType]], error);
        });
    }
};

let skill_config_repo = mongoose.model('skill_config_repo', skillConfigRepoSchema);

module.exports = {
    skill_config_repo
};
