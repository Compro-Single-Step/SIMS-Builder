var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var BaseSkill = require("../../common/baseSkill");
//Excel based Common Functionality goes here 

var xmlUtil = require("../../../../utils/xmlUtil");

module.exports = function (_BaseSkill) {
    _inherits(ExcelBaseSkill, _BaseSkill);

    function ExcelBaseSkill() {
        _classCallCheck(this, ExcelBaseSkill);

        return _possibleConstructorReturn(this, (ExcelBaseSkill.__proto__ || Object.getPrototypeOf(ExcelBaseSkill)).apply(this, arguments));
    }

    _createClass(ExcelBaseSkill, [{
        key: "init",

        //dynamic sheet changes
        value: function init(data) {
            var self = this;
            var initDocJSonPath = data.initDocJSonPath;
            var dbMgr = data.dbMgr;

            return dbMgr.readFileFromFileStore(initDocJSonPath).then(function (resolveParam) {

                self.initDocJson = JSON.parse(resolveParam.fileData);
                self.generateSheetNamesMap();
                return Promise.resolve(true);
            }, function (error) {
                return Promise.reject(error);
            });
        }
    }, {
        key: "generateSheetNamesMap",
        value: function generateSheetNamesMap() {
            this.sheetNameMap = {};
            for (var index = 0; index < this.initDocJson.sheets.length; ++index) {
                this.sheetNameMap[this.initDocJson.sheets[index].name] = index + 1;
            }
        }
    }, {
        key: "getSheetNumber",
        value: function getSheetNumber(sheetName) {
            return this.sheetNameMap[sheetName];
        }
    }, {
        key: "genImageJsonResFolder",
        value: function genImageJsonResFolder(stateId) {
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

    }, {
        key: "createImageJson",
        value: function createImageJson(skillParams) {

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
                for (var index = 0; index < resolveParam.length && resolveParam[index] != null; ++index) {
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

                var resolveParams = { "attrValue": finalObject, "preloadResArr": preloadResArr };
                return Promise.resolve(resolveParams);
            }, function (err) {
                return Promise.reject(err);
            });
        }
    }, {
        key: "copySheetImages",
        value: function copySheetImages(skillParams, sheetIdx) {
            var taskParams = skillParams.taskParams;
            var paramValueObj = skillParams.paramsObj;
            var self = this;
            return new Promise(function (resolve, reject) {

                var requestArr = [];
                var sheetImgs = {
                    "gridImage": "gridImg",
                    "rowImage": "rowImg",
                    "cellImage": "cellImg",
                    "columnImage": "colImg"
                };

                for (var imgName in sheetImgs) {
                    requestArr.push(self.copyImage(skillParams, sheetIdx, imgName));
                }

                Promise.all(requestArr).then(function (resultArr) {
                    console.log("single sheet success");

                    var translatedResult = {};
                    for (var idx = 0; idx < resultArr.length; ++idx) {
                        translatedResult[resultArr[idx].imgType] = {
                            "path": resultArr[idx].path,
                            "fileType": resultArr[idx].fileType
                        };
                    }

                    //update the attrParam for that sheet
                    // let resolveObj = {};
                    var preloadResArr = [];
                    var sheetObject = {};
                    var sheetImgPresent = false;

                    sheetObject["sheetNo"] = self.getSheetNumber(paramValueObj["sheets"][sheetIdx].name);

                    for (var _imgName in sheetImgs) {
                        var currImg = translatedResult[_imgName];
                        if (currImg && currImg.path != "" && currImg.path != null) {
                            var tempImgPathArr = currImg.path.split("/");
                            sheetObject[sheetImgs[_imgName]] = tempImgPathArr[tempImgPathArr.length - 1];
                            preloadResArr.push({ "path": currImg["path"], "type": currImg["fileType"] });
                            sheetImgPresent = true;
                        }
                    }

                    var resolveParams = { "sheetObject": sheetObject, "preloadResArr": preloadResArr };
                    if (sheetImgPresent == false) {
                        resolveParams = null;
                    }
                    resolve(resolveParams);
                }, function (error) {
                    console.log("single sheet failure");
                    reject(error);
                });
            });
        }
    }, {
        key: "copyImage",
        value: function copyImage(skillParams, sheetIdx, imgType) {

            var taskParams = skillParams.taskParams;
            var paramValueObj = skillParams.paramsObj;

            var filepath = paramValueObj["sheets"][sheetIdx][imgType]["path"];
            if (filepath != null && filepath != "") {
                return new Promise(function (resolve, reject) {
                    // var filepath = paramValueObj["sheets"][sheetIdx][Object.keys(imageObj)[0]]["path"];
                    return taskParams.dbFilestoreMgr.copyTaskAssetFile(filepath, taskParams).then(function (resolveParam) {
                        var preloadResArr = [];

                        var resolveParams = {
                            "imgType": imgType,
                            "path": resolveParam.filePath,
                            "fileType": resolveParam.fileType
                        };
                        resolve(resolveParams);
                    }, function (error) {
                        return Promise.reject(error);
                    });
                }); //promise object creation end 
            } // ending the if check
            else {
                    var resolveParams = {
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

    }, {
        key: "createJsonPath",
        value: function createJsonPath(skillParams) {
            var taskParams = skillParams.taskParams;
            var paramValueObj = skillParams.paramsObj;

            var attrValue = skillParams.taskParams.addResourceToMap("step", paramValueObj["docData"]).absFilePath;
            // { attrValue } is new syntax of ES6 which means => { 'attrValue': attrValue }
            return Promise.resolve({ attrValue: attrValue });
        }

        /**
         * fnality
         * for populating the attribute SHEET_CELLS_DATA
         * adding the asset path to resource map
         * Resources added to this resource map are later copied to step asset folder
         * return
         * {"sheetNo":1, "dataJSONPath":"XMLs/TaskXmls2016/exp/xl/04/03.02.T1/Assets/State3/SheetCell.json" }
         */

    }, {
        key: "createSheetCellData",
        value: function createSheetCellData(skillParams) {

            var attrValue = {},
                filePath = skillParams.taskParams.addResourceToMap("step", skillParams.paramsObj["wbData"]).absFilePath;

            attrValue["sheetNo"] = this.getSheetNumber(skillParams.paramsObj.sheetAction);
            attrValue["dataJSONPath"] = filePath;
            attrValue = JSON.stringify(attrValue);

            return Promise.resolve({ attrValue: attrValue });
        }
    }]);

    return ExcelBaseSkill;
}(BaseSkill);