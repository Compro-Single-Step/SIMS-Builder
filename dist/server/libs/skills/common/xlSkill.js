"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var baseSkill = require("../../common/baseSkill");
//Excel based Common Functionality goes here 

var xmlUtil = require("../../../../utils/xmlUtil");

module.exports = function (_baseSkill) {
    _inherits(ExcelBaseSkill, _baseSkill);

    function ExcelBaseSkill() {
        _classCallCheck(this, ExcelBaseSkill);

        return _possibleConstructorReturn(this, (ExcelBaseSkill.__proto__ || Object.getPrototypeOf(ExcelBaseSkill)).apply(this, arguments));
    }

    _createClass(ExcelBaseSkill, [{
        key: "init",


        //dynamic sheet changes   
        value: function init(data, callback) {
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
    }, {
        key: "createImageJson",
        value: function createImageJson(skillParams) {

            var taskParams = skillParams.taskParams;
            var paramValueObj = skillParams.paramsObj;
            var finalObject = {};
            finalObject["folderPath"] = xmlUtil.generateStepFolderPath(taskParams.taskId, taskParams.stepIndex) + this.genImageJsonResFolder(taskParams.stateId);
            skillParams.taskParams.parentFolder = this.genImageJsonResFolder(taskParams.stateId);
            var promiseArr = [];
            var self = this;
            for (var iterator = 0; iterator < paramValueObj["sheets"].length; ++iterator) {

                promiseArr.push(self.genSheetPromise(skillParams, iterator));
            }

            return Promise.all(promiseArr).then(function (resolveParam) {
                console.log("folder operation success");
                finalObject["sheetImages"] = [];
                var preloadResArr = [];
                for (var index = 0; index < resolveParam.length; ++index) {
                    finalObject["sheetImages"].push(resolveParam[index].sheetObject);
                    for (var iterator = 0; iterator < resolveParam[index].preloadResArr.length; ++iterator) {
                        preloadResArr.push(resolveParam[index].preloadResArr[iterator]);
                    }
                }
                finalObject = JSON.stringify(finalObject);
                var resolveParams = { "attrValue": finalObject, "preloadResArr": preloadResArr };
                return Promise.resolve(resolveParams);
            }, function (err) {
                return Promise.reject(err);
            });
        }
    }, {
        key: "genSheetPromise",
        value: function genSheetPromise(skillParams, iterator, imageName) {
            var taskParams = skillParams.taskParams;
            var paramValueObj = skillParams.paramsObj;
            var self = this;
            return new Promise(function (resolve, reject) {

                var requestArr = [];

                requestArr.push(self.genFilePromise(skillParams, iterator, { "gridImage": "gridImg" }));
                requestArr.push(self.genFilePromise(skillParams, iterator, { "rowImage": "rowImg" }));
                requestArr.push(self.genFilePromise(skillParams, iterator, { "cellImage": "cellImg" }));
                requestArr.push(self.genFilePromise(skillParams, iterator, { "columnImage": "colImg" }));
                Promise.all(requestArr).then(function (resolveParam) {
                    console.log("single sheet success");
                    //update the attrParam for that sheet
                    var resolveObj = {};
                    var preloadResArr = [];
                    for (var index = 0; index < resolveParam.length; ++index) {
                        var pathKey = Object.keys(resolveParam[index])[0];
                        resolveObj[pathKey] = resolveParam[index][pathKey];
                        preloadResArr.push({ "path": resolveObj[pathKey], "type": resolveParam[index]["fileType"] });
                    }

                    var sheetObject = {};
                    sheetObject["sheetNo"] = self.getSheetNumber(paramValueObj["sheets"][iterator].name);
                    sheetObject["gridImg"] = resolveObj["gridImage"].split("/")[resolveObj["gridImage"].split("/").length - 1];
                    sheetObject["rowImg"] = resolveObj["rowImage"].split("/")[resolveObj["rowImage"].split("/").length - 1];
                    sheetObject["cellImg"] = resolveObj["cellImage"].split("/")[resolveObj["cellImage"].split("/").length - 1];
                    sheetObject["colImg"] = resolveObj["columnImage"].split("/")[resolveObj["columnImage"].split("/").length - 1];

                    var resolveParam = { "sheetObject": sheetObject, "preloadResArr": preloadResArr };
                    resolve(resolveParam);
                }, function (error) {
                    console.log("single sheet failure");
                    reject(error);
                });
            });
        }
    }, {
        key: "genFilePromise",
        value: function genFilePromise(skillParams, iterator, imageObj) {

            var taskParams = skillParams.taskParams;
            var paramValueObj = skillParams.paramsObj;

            return new Promise(function (resolve, reject) {
                var filepath = paramValueObj["sheets"][iterator][Object.keys(imageObj)[0]]["path"];
                return taskParams.dbFilestoreMgr.copyTaskAssetFile(filepath, taskParams).then(function (resolveParam) {
                    var preloadResArr = [];

                    var resolveParams = {};
                    resolveParams[Object.keys(imageObj)[0]] = resolveParam.filePath;
                    resolveParams["fileType"] = resolveParam.fileType;
                    resolve(resolveParams);
                }, function (error) {
                    return Promise.reject(error);
                });
            });
        }
    }]);

    return ExcelBaseSkill;
}(baseSkill);