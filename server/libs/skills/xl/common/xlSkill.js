const BaseSkill = require("../../common/baseSkill");
//Excel based Common Functionality goes here 

const xmlUtil = require("../../../../utils/xmlUtil");

module.exports = class ExcelBaseSkill extends BaseSkill {
    //dynamic sheet changes
    init(data) {
        var self = this;
        var initDocJSonPath = data.initDocJSonPath;
        var dbMgr = data.dbMgr;


        return dbMgr.readFileFromFileStore(initDocJSonPath).then(function (resolveParam) {

            self.initDocJson = JSON.parse(resolveParam.fileData);
            self.generateSheetNamesMap();
            return Promise.resolve(true);

        }, function (error) {
            return Promise.reject(error)
        });
    }

    generateSheetNamesMap() {
        this.sheetNameMap = {};
        for (var index = 0; index < this.initDocJson.sheets.length; ++index) {
            this.sheetNameMap[this.initDocJson.sheets[index].name] = (index + 1);
        }
    }

    getSheetNumber(sheetName) {
        return this.sheetNameMap[sheetName];
    }

    genImageJsonResFolder(stateId) {
        return "state" + stateId;
    }



    /**
 * fnality
 * for populating the attribute IMAGE_JSON
 * This attributes takes 4 or less resources(images in this case) 
 * and generates an attribute value with the folder path where the 
 * images are stored along with their names
 * return
 * {"folderPath": "XMLs/TaskXmls2016/exp/xl/04/03.02.T1/Assets/State1",
 * "sheetImages":[{"sheetNo":1,
 *                  "gridImg": "March_Data_DataGrid.png",
 *                  "rowImg": "March_Data_RowGrid.png",
 *                  "colImg": "March_Data_ColumnGrid.png",
 *                  "cellImg":"March_Data_CellImg.png"}]}
 * 
 */

    createImageJson(skillParams) {

        var taskParams = skillParams.taskParams;
        var paramValueObj = skillParams.paramsObj;
        var finalObject = {};
        skillParams.taskParams.parentFolder = this.genImageJsonResFolder(taskParams.stateId);
        finalObject["folderPath"] = xmlUtil.generateStepFolderPath(taskParams.taskId, taskParams.stepIndex) + skillParams.taskParams.parentFolder;

        var promiseArr = [];
        var self = this;
        for (var iterator = 0; iterator < paramValueObj["sheets"].length; ++iterator) {

            promiseArr.push(self.copySheetImages(skillParams, iterator));
        }

        return Promise.all(promiseArr).then(function (resolveParam) {
            console.log("folder operation success");
            finalObject["sheetImages"] = [];
            var preloadResArr = [];
            for (var index = 0; (index < resolveParam.length) && (resolveParam[index] != null); ++index) {
                finalObject["sheetImages"].push(resolveParam[index].sheetObject);
                for (var iterator = 0; iterator < resolveParam[index].preloadResArr.length; ++iterator) {
                    preloadResArr.push(resolveParam[index].preloadResArr[iterator]);
                }
            }
            if (finalObject["sheetImages"].length == 0) {
                finalObject = "";
            } else {
                finalObject = JSON.stringify(finalObject);
            }

            var resolveParams = { "attrValue": finalObject, "preloadResArr": preloadResArr }
            return Promise.resolve(resolveParams);
        }, function (err) {
            return Promise.reject(err);
        });

    }

    copySheetImages(skillParams, sheetIdx) {
        let taskParams = skillParams.taskParams;
        let paramValueObj = skillParams.paramsObj;
        let self = this;
        return new Promise(function (resolve, reject) {

            let requestArr = [];
            let sheetImgs = {
                "gridImage": "gridImg",
                "rowImage": "rowImg",
                "cellImage": "cellImg",
                "columnImage": "colImg"
            };

            for (let imgName in sheetImgs) {
                requestArr.push(self.copyImage(skillParams, sheetIdx, imgName));
            }

            Promise.all(requestArr).then(function (resultArr) {
                console.log("single sheet success");

                let translatedResult = {};
                for (let idx = 0; idx < resultArr.length; ++idx) {
                    translatedResult[resultArr[idx].imgType] = {
                        "path": resultArr[idx].path,
                        "fileType": resultArr[idx].fileType
                    }
                }

                //update the attrParam for that sheet
                // let resolveObj = {};
                let preloadResArr = [];
                let sheetObject = {};
                let sheetImgPresent = false;

                sheetObject["sheetNo"] = self.getSheetNumber(paramValueObj["sheets"][sheetIdx].name);

                for (let imgName in sheetImgs) {
                    let currImg = translatedResult[imgName];
                    if (currImg && (currImg.path != "") && (currImg.path != null)) {
                        let tempImgPathArr = currImg.path.split("/");
                        sheetObject[sheetImgs[imgName]] = tempImgPathArr[tempImgPathArr.length - 1];
                        preloadResArr.push({ "path": currImg["path"], "type": currImg["fileType"] });
                        sheetImgPresent = true;
                    }
                }

                let resolveParams = { "sheetObject": sheetObject, "preloadResArr": preloadResArr };
                if (sheetImgPresent == false) {
                    resolveParams = null;
                }
                resolve(resolveParams);
            }, function (error) {
                console.log("single sheet failure");
                reject(error);
            })
        })

    }

    copyImage(skillParams, sheetIdx, imgType) {

        var taskParams = skillParams.taskParams;
        var paramValueObj = skillParams.paramsObj;

        var filepath = paramValueObj["sheets"][sheetIdx][imgType]["path"];
        if (filepath != null && filepath != "") {
            return new Promise(function (resolve, reject) {
                // var filepath = paramValueObj["sheets"][sheetIdx][Object.keys(imageObj)[0]]["path"];
                return taskParams.dbFilestoreMgr.copyTaskAssetFile(filepath, taskParams)
                    .then(function (resolveParam) {
                        var preloadResArr = [];

                        let resolveParams = {
                            "imgType": imgType,
                            "path": resolveParam.filePath,
                            "fileType": resolveParam.fileType
                        };
                        resolve(resolveParams);

                    }, function (error) {
                        return Promise.reject(error);
                    })
            }); //promise object creation end 
        }// ending the if check
        else {
            let resolveParams = {
                "imgType": imgType,
                "path": "",
                "fileType": ""
            };
            return Promise.resolve(resolveParams);
        }
    }


    /**
     * fnality
     * for populating the attribute INIT_DOC_JSON and
     * adding the asset path to resource map
     * Resources added to this resource map are later copied to step asset folder
     */
    createJsonPath(skillParams) {
        var taskParams = skillParams.taskParams;
        var paramValueObj = skillParams.paramsObj;

        var attrValue = skillParams.taskParams.addResourceToMap({ path: paramValueObj["docData"]}).absFilePath;
        // { attrValue } is new syntax of ES6 which means => { 'attrValue': attrValue }
        return Promise.resolve({ attrValue });
    }

    /**
     * fnality
     * for populating the attribute SHEET_CELLS_DATA
     * adding the asset path to resource map
     * Resources added to this resource map are later copied to step asset folder
     * return
     * {"sheetNo":1, "dataJSONPath":"XMLs/TaskXmls2016/exp/xl/04/03.02.T1/Assets/State3/SheetCell.json" }
     */
    createSheetCellData(skillParams) {

        var attrValue = {},
            filePath = skillParams.taskParams.addResourceToMap({ "path" : skillParams.paramsObj["wbData"] }).absFilePath;

        attrValue["sheetNo"] = this.getSheetNumber(skillParams.paramsObj.sheetAction);
        attrValue["dataJSONPath"] = filePath;
        attrValue = JSON.stringify(attrValue);

        return Promise.resolve({ attrValue });
    }
}
