var dbFilestoreMgr = require('./dbFilestoreMgr');
var translator = require("./ioTranslator.js");
var XmlGenerator = require("./xmlGenerator/stepXMLGenerator");
var mapTranslationParams = function (IOMap, stepUIState, skillRef, taskId, stepIndex, dbFilestoreMgr) {
    this.IOMap = IOMap;
    this.stepUIState = stepUIState;
    this.skillRef = skillRef;
    this.taskId = taskId;
    this.stepIndex = stepIndex;
    this.dbFilestoreMgr = dbFilestoreMgr;
};
module.exports.generateStepXML = function (templateId, taskId, stepIndex, stepText, skillRef) {
    return Promise.all([dbFilestoreMgr.getStepUIState(taskId, stepIndex), dbFilestoreMgr.getIOMap(templateId)]).then(function (_a) {
        var stepUIState = _a[0], IOMapJson = _a[1];
        //IO Translator
        var IOMap = JSON.parse(IOMapJson);
        var mapTranslationParam = new mapTranslationParams(IOMap, stepUIState, skillRef, taskId, stepIndex, dbFilestoreMgr);
        // let attrValueMap = translator.getAttrValueMap(IOMap, stepUIState, skillRef, taskId, stepIndex,dbFilestoreMgr);
        return translator.getAttrValueMap(mapTranslationParam).then(function (_a) {
            var attrValMap = _a[0], copyResPromiseArray = _a[1];
            //XML generation
            return Promise.all([dbFilestoreMgr.getSkillXML(templateId).then(function (skillTemplate) {
                    var xmlGenerator = new XmlGenerator();
                    var OutputXML = xmlGenerator.generateXml(skillTemplate, attrValMap, stepText);
                    //Saving Step XML in File Store
                    return dbFilestoreMgr.saveStepXML(taskId, stepIndex, OutputXML).then(function (msg) {
                        return Promise.resolve(msg);
                    }, function (error) {
                        return Promise.reject(error);
                    });
                }, function (error) {
                    return Promise.reject(error);
                })].concat(copyResPromiseArray)).then(function (_a) {
                var msg = _a[0], copyResMsg = _a.slice(1);
                return Promise.resolve(msg);
            })["catch"](function (error) {
                return Promise.reject(error);
            });
        }, function (error) {
            return Promise.reject(error);
        });
    }, function (error) {
        return Promise.reject(error);
    });
};
