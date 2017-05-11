const dbFilestoreMgr = require('./dbFilestoreMgr');
const translator = require("./ioTranslator.js");
const XmlGenerator = require("./xmlGenerator/stepXMLGenerator");

var mapTranslationParams = function (IOMap, stepUIState, skillRef, taskId, stepIndex, dbFilestoreMgr) {
    this.IOMap = IOMap;
    this.stepUIState = stepUIState;
    this.skillRef = skillRef;
    this.taskId = taskId;
    this.stepIndex = stepIndex;
    this.dbFilestoreMgr = dbFilestoreMgr;
};

module.exports.generateStepXML = function (templateId, taskId, stepIndex, stepText, skillRef) {

    return Promise.all([dbFilestoreMgr.getStepUIState(taskId, stepIndex), dbFilestoreMgr.getIOMap(templateId)]).then(([stepUIState, IOMapJson]) => {
        //IO Translator
        let IOMap = JSON.parse(IOMapJson);
        let mapTranslationParam = new mapTranslationParams(IOMap, stepUIState, skillRef, taskId, stepIndex, dbFilestoreMgr);
        // let attrValueMap = translator.getAttrValueMap(IOMap, stepUIState, skillRef, taskId, stepIndex,dbFilestoreMgr);
        return translator.getAttrValueMap(mapTranslationParam).then(([attrValMap, copyResPromiseArray]) => {
            //XML generation
            return Promise.all([dbFilestoreMgr.getSkillXML(templateId).then(skillTemplate => {
                let xmlGenerator = new XmlGenerator();
                let OutputXML = xmlGenerator.generateXml(skillTemplate, attrValMap, stepText);

                //Saving Step XML in File Store
                return dbFilestoreMgr.saveStepXML(taskId, stepIndex, OutputXML).then(msg => {
                    return Promise.resolve(msg);
                }, error => {
                    return Promise.reject(error);
                });
            }, error => {
                return Promise.reject(error);
            })]).then((msg) => {
                return Promise.resolve(msg);
            }).catch(error => {
                return Promise.reject(error);
            });
        }, error => {
            return Promise.reject(error);
        });
    }, error => {
        return Promise.reject(error);
    });
};