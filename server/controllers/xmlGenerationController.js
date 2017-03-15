const dbFileStoreController = require('./dbFileStoreController');
//const translator = require("./IOTranslator.js");
// const StepXmlGenerator = require("./StepXmlGenerator/Step.js");


var skillMap = {"movecell":"MoveCell_Skill"};
var IoMap = {};
//require DB Manager
var dbMgr = require("./dbFileStoreController.js");
//fetch the task id
taskId = "task_1";
//fetch the Step index
stepIdx = "1";
//fetch template id 
var templateId = "movecell";

const translator = require("./IOTranslator.js");

identifySkill = function(templateId){
    return skillMap[templateId];
}





module.exports.generateStepXML = function(taskId, stepIndex, templateId, callback){
    //to assign the static values if the file is run independently 
    if(taskId == undefined || stepIndex == undefined || templateId == undefined){
                        taskId = "task_1";
                        stepIndex = stepIdx;
                        templateId = "movecell";
                    }

    dbFileStoreController.getStepUIState(taskId, stepIndex, (stepUIState, error) => {
        if(!error){
            dbFileStoreController.getIOMap(templateId, (error, IOMapJson) => {
                if(!error){
                    
                    IOMap = JSON.parse(IOMapJson);

                    var identifiedSkill = identifySkill(templateId);
                    var skillRef = require("./"+identifiedSkill);
            
                    stepUIState = stepUIState[0]._doc.task_data['step_' + stepIdx];
                    attrValueMap = translator.translateMap(IOMap, stepUIState, skillRef);
                    //TRANSLATE TO A JSON...

                    //XML GENERATION - Directly using IOMapJson here
                    dbFileStoreController.getSkillXML(templateId, (error, skillTemplate) => {
                        if(!error){
                            let newStep = new StepXmlGenerator(skillTemplate, attrValueMap);
                            let OutputXML = newStep.stepGenerator();
                            callback(error, OutputXML);
                        }
                        else{
                            console.log("Unable to fetch Skill XML");
                        }
                    })
                }
                else{
                    console.log("Unable to fetch IO Map");
                }
            })
        }
        else{
            console.log("Unable to fetch step UI state");
        }
    })
    


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
debugger;
this.generateStepXML();


// var skillMap = {"movecell":"MoveCell_Skill"};
// var IoMap = {};

// identifySkill = function(templateId){
//     return skillMap[templateId];
// }

// IoCallback = function(error, data){

//     console.log("iomap callback");
//     IoMap = JSON.parse(data);
//     var dbMgr = require("./dbFileStoreController.js");
//     stepUIState = dbMgr.getStepUIState(taskId, stepIdx, modelCallback);
// }
// modelCallback = function(data,error){
//     console.log("model callback");
//     templateId = "movecell";
//     var identiFiedSkill = identifySkill(templateId);
//     skillRef = require("./"+identiFiedSkill);
    
//     stepUIState = data[0]._doc.task_data['step_' + stepIdx];
//     attrValueMap = translator.translateMap(IoMap, stepUIState, skillRef);
//     // skillXML = dbMgr.getSkillXML(templateId);
//     // XMLString = XMLGenerator.generateXML(attrValueMap, skillXML)

//     // return XMLString;
// }

// generateXML = function(templateId, taskId, stepIdx){
//     //require the database manager
//     debugger;
//     var dbMgr = require("./dbFileStoreController.js");
//     templateId = "movecell";
//     IOMap = dbMgr.getIOMap(templateId, IoCallback);
//     // stepUIState = dbMgr.getStepUIState(taskId, stepIdx, modelCallback);

//     // var identiFiedSkill = identifySkill(templateId);
//     // // skillRef = // dynamic require("translator_core");
//     // skillRef = require("./"+identiFiedSkill);

//     // attrValueMap = translator.translateMap(iomap, stepUIState, skillRef);
//     // attrValueMap = translator.translateMap(IOMap, modelJson, skillRef);

//     // skillXML = dbMgr.getSkillXML(templateId);
//     // XMLString = XMLGenerator.generateXML(attrValueMap, skillXML)

//     // return XMLString;
// }

// //require the translator_core
// //fetch the templateId
// //fetch the task id
// //currently stored in the database
// taskId = "task_1";
// //fetch the Step index
// stepIdx = "1";
// generateXML();

// // translator.startExecution(iomap,modelJson);