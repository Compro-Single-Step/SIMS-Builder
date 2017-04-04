const dbFilestoreMgr = require('./dbFilestoreMgr');
const translator = require("./ioTranslator.js");
const XmlGenerator = require("./xmlGenerator/stepXMLGenerator");

var mapTranslationParams = function(IOMap, stepUIState, skillRef, taskId, stepIndex, dbFilestoreMgr){
     this.IOMap = IOMap;
     this.stepUIState = stepUIState;
     this.skillRef = skillRef;
     this.taskId = taskId;
     this.stepIndex = stepIndex;
     this.dbFilestoreMgr = dbFilestoreMgr;
}

module.exports.generateStepXML = function(templateId, taskId, stepIndex, skillRef, callback){
  
    dbFilestoreMgr.getStepUIState(taskId, stepIndex, (error, stepUIState) => {
        if(!error){
            dbFilestoreMgr.getIOMap(templateId, (error, IOMapJson) => {
                if(!error) {

                    //IO Translator
                    let IOMap = JSON.parse(IOMapJson);
                    let mapTranslationParam = new mapTranslationParams(IOMap, stepUIState, skillRef, taskId, stepIndex, dbFilestoreMgr)
                    // let attrValueMap = translator.getAttrValueMap(IOMap, stepUIState, skillRef, taskId, stepIndex,dbFilestoreMgr);
                    translator.getAttrValueMap(mapTranslationParam, function(error,IOmap){
                        //XML generation
                        
                        dbFilestoreMgr.getSkillXML(templateId, (error, skillTemplate) => {
                            if(!error) {
                                let xmlGenerator = new XmlGenerator();

                                let OutputXML1 = xmlGenerator.generateXml(skillTemplate, IOmap);

                                //Saving Step XML in File Store
                                dbFilestoreMgr.saveStepXML(taskId, stepIndex, OutputXML1, callback);
                                
                            }
                            else{
                                callback(error, skillTemplate);
                            }
                        });
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
