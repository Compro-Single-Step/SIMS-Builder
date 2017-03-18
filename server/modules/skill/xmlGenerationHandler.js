const dbFilestoreMgr = require('./dbFilestoreMgr');
const translatorClass = require("./ioTranslator.js");
const translator = new translatorClass();
const xmlGenerator = require("./xmlGenerator/Step.js");


function identifySkill(templateId){
    return {
        "movecellcontent":"/xl/moveCellContent/moveCellContent"
    }[templateId];
}

module.exports.generateStepXML = function(templateId, taskId, stepIndex, callback){

    dbFilestoreMgr.getStepUIState(taskId, stepIndex, (stepUIState, error) => {
        if(!error){
            dbFilestoreMgr.getIOMap(templateId, (error, IOMapJson) => {
                if(!error) {

                    //IO Translator
                    let IOMap = JSON.parse(IOMapJson);

                    var identifiedSkill = identifySkill(templateId);
                    const skillRefClass = require("../../libs/skills" + identifiedSkill);
                    var skillRef = new skillRefClass();
            
                    stepUIState = stepUIState[0]._doc.task_data['step_' + stepIndex];
                    attrValueMap = translator.translateMap(IOMap, stepUIState, skillRef);

                    //XML GENERATION
                    dbFilestoreMgr.getSkillXML(templateId, (error, skillTemplate) => {
                        if(!error) {
                            let newStep = new xmlGenerator(skillTemplate, attrValueMap);
                            let OutputXML = newStep.stepGenerator();
                            callback(error, OutputXML);
                        }
                        else{
                            callback(error, skillTemplate);
                        }
                    });
                }
                else {
                    callback(error, IOMapJson);
                }
            });
        }
        else {
            callback(error, stepUIState);
        }
    });



//     Promise.all([
//     dbFilestoreMgr.getSkillXML(templateId),
//     readFile('./IOMap.json')
//     ]).then((files) => {
//         let newStep = new step(...files);
//         let OutputXML = newStep.stateGenerator();
//         res.send(OutputXML);
//         })
//         .catch((error) => console.log(error))

// function readFile(url){
//     return promise = new Promise((resolve,reject) => {
//         fs.readFile(url,"utf8", (err, data) => {
//             if(err)
//                 reject(err);
//             else
//                 resolve(data);
//         })
//     })
// }
}
