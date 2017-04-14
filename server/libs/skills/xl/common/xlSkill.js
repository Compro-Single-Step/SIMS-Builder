const baseSkill = require("../../common/baseSkill");
//Excel based Common Functionality goes here 

const xmlUtil = require("../../../../utils/xmlUtil");

module.exports = class ExcelBaseSkill extends baseSkill{

    //dynamic sheet changes   
    init(data, callback) {
        var self = this;
        var initDocJSonPath = data.initDocJSonPath;
        var dbMgr = data.dbMgr;
        return dbMgr.readFileFromFileStore(initDocJSonPath)
        .then(function(resolveParam){ 
            self.initDocJson = JSON.parse(resolveParam.fileData);
            self.generateSheetNamesMap();
            return Promise.resolve(true);
        },function(error){
            return Promise.reject(error)
        });
   }

   generateSheetNamesMap(){
       this.sheetNameMap = {};
       for(var index = 0; index < this.initDocJson.sheets.length; ++index){
           this.sheetNameMap[this.initDocJson.sheets[index].name] = (index+1);
       }
   }

   getSheetNumber(sheetName){
       return this.sheetNameMap[sheetName];
   }

    genImageJsonResFolder(stateId){   
        return "state" + stateId;
    }

    createImageJson (skillParams){
        
      var taskParams = skillParams.taskParams;
      var paramValueObj = skillParams.paramsObj;
      var finalObject = {};
      finalObject["folderPath"] = xmlUtil.generateStepFolderPath(taskParams.taskId, taskParams.stepIndex) + this.genImageJsonResFolder(taskParams.stateId);
      skillParams.taskParams.parentFolder = this.genImageJsonResFolder(taskParams.stateId);
      var promiseArr = [];
      var self = this;
      for(var iterator = 0 ; iterator < paramValueObj["sheets"].length; ++iterator){
        
        promiseArr.push(self.genSheetPromise(skillParams ,iterator));
      }

      return Promise.all(promiseArr).then(function(resolveParam){
        console.log("folder operation success");
        finalObject["sheetImages"] = [];
        var preloadResArr = [];
        for(var index = 0; index < resolveParam.length; ++index){
            finalObject["sheetImages"].push(resolveParam[index].sheetObject);
            for(var iterator = 0; iterator < resolveParam[index].preloadResArr.length; ++iterator){
                preloadResArr.push(resolveParam[index].preloadResArr[iterator]);
            }
        }
        finalObject = JSON.stringify(finalObject);
        var resolveParams = {"attrValue":finalObject,"preloadResArr":preloadResArr}
        return Promise.resolve(resolveParams);
      },function(err){
        return Promise.reject(err);
      });

    }


    genSheetPromise(skillParams ,iterator, imageName){
      var taskParams = skillParams.taskParams;
      var paramValueObj = skillParams.paramsObj;
      var self = this;
      return new Promise(function(resolve,reject){
        
        var requestArr = [];


        requestArr.push(self.genFilePromise(skillParams , iterator, {"gridImage":"gridImg"}));
        requestArr.push(self.genFilePromise(skillParams , iterator, {"rowImage":"rowImg"}));
        requestArr.push(self.genFilePromise(skillParams , iterator, {"cellImage":"cellImg"}));
        requestArr.push(self.genFilePromise(skillParams , iterator, {"columnImage":"colImg"}));
        Promise.all(requestArr).then(function(resolveParam){
            console.log("single sheet success");
            //update the attrParam for that sheet
            var resolveObj = {};
            var preloadResArr = [];
            for(var index = 0; index < resolveParam.length;++index){
                var pathKey = Object.keys(resolveParam[index])[0];
                resolveObj[pathKey] = resolveParam[index][pathKey];
                preloadResArr.push({"path": resolveObj[pathKey],"type": resolveParam[index]["fileType"] }) 
            }
            
            var sheetObject = {};
                sheetObject["sheetNo"] = self.getSheetNumber(paramValueObj["sheets"][iterator].name);
                sheetObject["gridImg"] = resolveObj["gridImage"].split("/")[resolveObj["gridImage"].split("/").length - 1];
                sheetObject["rowImg"] = resolveObj["rowImage"].split("/")[resolveObj["rowImage"].split("/").length - 1];
                sheetObject["cellImg"] = resolveObj["cellImage"].split("/")[resolveObj["cellImage"].split("/").length - 1];
                sheetObject["colImg"] = resolveObj["columnImage"].split("/")[resolveObj["columnImage"].split("/").length-1];

            var resolveParam = {"sheetObject":sheetObject,"preloadResArr":preloadResArr};
            resolve(resolveParam);
        },function(error){
            console.log("single sheet failure");
            reject(error);
        })
      })

    }

    genFilePromise(skillParams ,iterator, imageObj){
        
      var taskParams = skillParams.taskParams;
      var paramValueObj = skillParams.paramsObj;
        
        return new Promise(function(resolve, reject){
            var filepath = paramValueObj["sheets"][iterator][Object.keys(imageObj)[0]]["path"];
            return taskParams.dbFilestoreMgr.copyTaskAssetFile(filepath, taskParams)
            .then(function(resolveParam){
                var preloadResArr = [];
                
                var resolveParams = {};
                resolveParams[Object.keys(imageObj)[0]] = resolveParam.filePath;
                resolveParams["fileType"] = resolveParam.fileType;
                resolve(resolveParams);

        },function(error){
            return Promise.reject(error);
        })
    });  
  }
}
