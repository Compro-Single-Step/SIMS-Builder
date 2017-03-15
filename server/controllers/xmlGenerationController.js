const dbFileStoreController = require('./dbFileStoreController');
const translator = require("./IOTranslator.js");
const StepXmlGenerator = require("./StepXmlGenerator/Step.js");


function identifySkill(templateId){
    return {
        "movecellcontent":"MoveCell_Skill"
    }[templateId];
}

module.exports.generateStepXML = function(taskId, stepIndex, templateId, callback){

    dbFileStoreController.getStepUIState(taskId, stepIndex, (stepUIState, error) => {
        if(!error){
            dbFileStoreController.getIOMap(templateId, (error, IOMapJson) => {
                if(!error){

                    //IO Translator
                    let IOMap = JSON.parse(IOMapJson);

                    var identifiedSkill = identifySkill(templateId);
                    var skillRef = require("./"+identifiedSkill);
            
                    stepUIState = stepUIState[0]._doc.task_data['step_' + stepIndex];
                    attrValueMap = translator.translateMap(IOMap, stepUIState, skillRef);

                    //XML GENERATION
                    dbFileStoreController.getSkillXML(templateId, (error, skillTemplate) => {
                        if(!error){
                            let newStep = new StepXmlGenerator(skillTemplate, attrValueMap);
                            let OutputXML = newStep.stepGenerator();
                            callback(error, OutputXML);
                        }
                        else{
                            callback(error, skillTemplate);
                        }
                    });
                }
                else{
                    callback(error, IOMapJson);
                }
            });
        }
        else{
            callback(error, stepUIState);
        }
    });
    


//     Promise.all([
//     dbFileStoreController.getSkillXML(templateId),
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