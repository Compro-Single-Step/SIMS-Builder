const baseSkill = require("../../common/baseSkill");
//Excel based Common Functionality goes here 

const xmlUtil = require("../../../../utils/xmlUtil");

module.exports = class ExcelBaseSkill extends baseSkill{

      


    //dynamic sheet changes   
     init(data) {
         var self = this;
         var initDocJSonPath = data.initDocJSonPath;
       var dbMgr = data.dbMgr;
       
       
       return dbMgr.readFileFromFileStore(initDocJSonPath).then(function(resolveParam){ 
              
                self.initDocJson = JSON.parse(resolveParam.fileData);
                self.generateSheetNamesMap();
               return Promise.resolve();
              
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
      skillParams.taskParams.parentFolder = this.genImageJsonResFolder(taskParams.stateId);
      finalObject["folderPath"] = xmlUtil.generateStepFolderPath(taskParams.taskId, taskParams.stepIndex) + skillParams.taskParams.parentFolder;
      
      var promiseArr = [];
      var self = this;
      for(var iterator = 0 ; iterator < paramValueObj["sheets"].length; ++iterator){
        
        promiseArr.push(self.genSheetPromise(skillParams ,iterator));
      }

      return Promise.all(promiseArr).then(function(resolveParam){
        console.log("folder operation success");
        finalObject["sheetImages"] = [];
        var preloadResArr = [];
        for(var index = 0; (index < resolveParam.length) && (resolveParam[index]!=null); ++index){
            finalObject["sheetImages"].push(resolveParam[index].sheetObject);
            for(var iterator = 0; iterator < resolveParam[index].preloadResArr.length; ++iterator){
                preloadResArr.push(resolveParam[index].preloadResArr[iterator]);
            }
        }
        if(finalObject["sheetImages"].length == 0){
            finalObject = "";
        }else{
            finalObject = JSON.stringify(finalObject);
        }
        
        var resolveParams = {"attrValue":finalObject,"preloadResArr":preloadResArr}
        return Promise.resolve(resolveParams);
      },function(err){
        return Promise.reject(err);
      });

    }


    genSheetPromise(skillParams ,iterator, imageName){
      let taskParams = skillParams.taskParams;
      let paramValueObj = skillParams.paramsObj;
      let self = this;
      return new Promise(function(resolve,reject){
        
        let requestArr = [];
        let sheetImgs = {
            "gridImage":"gridImg",
            "rowImage":"rowImg",
            "cellImage":"cellImg",
            "columnImage":"colImg"
        };
        
        for(let imgName in sheetImgs){
            requestArr.push(self.genFilePromise(skillParams , iterator, imgName));
        }

        Promise.all(requestArr).then(function(resolveParam){
            console.log("single sheet success");
            //update the attrParam for that sheet
            let resolveObj = {};
            let preloadResArr = [];
            for(var index = 0; index < resolveParam.length;++index){
                var pathKey = Object.keys(resolveParam[index])[0];
                resolveObj[pathKey] = resolveParam[index][pathKey];
                if((resolveObj[pathKey] != "") && (resolveObj[pathKey] != null)){
                    preloadResArr.push({"path": resolveObj[pathKey],"type": resolveParam[index]["fileType"] }) 
                }
            }
            
            let sheetImgPresent = false;
            let sheetObject = {};
            
                sheetObject["sheetNo"] = self.getSheetNumber(paramValueObj["sheets"][iterator].name);
                
                for(let imgName in sheetImgs){
                    if((resolveObj[imgName] != "") && (resolveObj[imgName] != null)){
                        sheetObject[sheetImgs[imgName]] = resolveObj[imgName].split("/")[resolveObj[imgName].split("/").length - 1];
                        sheetImgPresent = true;
                    }
                }

            let resolveParams = {"sheetObject":sheetObject,"preloadResArr":preloadResArr};
            if(sheetImgPresent == false){
                resolveParams = null;
            }
            resolve(resolveParams);
        },function(error){
            console.log("single sheet failure");
            reject(error);
        })
      })

    }

    genFilePromise(skillParams ,iterator, imgType){
        
      var taskParams = skillParams.taskParams;
      var paramValueObj = skillParams.paramsObj;
        
        var filepath = paramValueObj["sheets"][iterator][imgType]["path"];
        if(filepath != null && filepath != ""){
            return new Promise(function(resolve, reject){
                // var filepath = paramValueObj["sheets"][iterator][Object.keys(imageObj)[0]]["path"];
                return taskParams.dbFilestoreMgr.copyTaskAssetFile(filepath, taskParams)
                .then(function(resolveParam){
                    var preloadResArr = [];
                    
                    var resolveParams = {};
                    resolveParams[imgType] = resolveParam.filePath;
                    resolveParams["fileType"] = resolveParam.fileType;
                    resolve(resolveParams);

            },function(error){
                return Promise.reject(error);
            })
        }); //promise object creation end 
    }// ending the if check
    else{
         var resolveParams = {};
         resolveParams[imgType]  = "";
         resolveParams["fileType"] = "";
        return Promise.resolve(resolveParams);
    }
  }
}
