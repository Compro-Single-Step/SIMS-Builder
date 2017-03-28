const dbFilestoreMgr = require('./dbFilestoreMgr');
const translatorClass = require("./ioTranslator.js");
const translator = new translatorClass();
const xmlGenerator = require("./xmlGenerator/stepXMLGenerator");

module.exports.generateStepXML = function(templateId, taskId, stepIndex, skillRef, callback){
    
    dbFilestoreMgr.getStepUIState(taskId, stepIndex, (error, stepUIState) => {
        if(!error){
            dbFilestoreMgr.getIOMap(templateId, (error, IOMapJson) => {
                if(!error) {

                    //IO Translator
                    let IOMap = JSON.parse(IOMapJson);
                    attrValueMap = translator.translateMap(IOMap, stepUIState, skillRef);

                    //XML GENERATION
                    dbFilestoreMgr.getSkillXML(templateId, (error, skillTemplate) => {
                        if(!error) {
                            // let newStep = new xmlGenerator(skillTemplate, attrValueMap);
                            // let OutputXML = newStep.stepGenerator();

                            let newStep = new xmlGenerator();
                            let OutputXML = newStep.generateXml(skillTemplate, attrValueMap);
                            
                            // console.log("OutputXML: ", OutputXML);
                            dbFilestoreMgr.saveStepXML("exp.xl.01.01.t1", stepIndex, OutputXML, (error, data)=>{
                                callback(null, OutputXML);
                            });
                            
                            //Saving Step XML in File Store
                            
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
