"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var baseSkill = require("../../common/baseSkill");
//Excel based Common Functionality goes here 
// var sheetArr = [];


var xmlUtil = require("../../../../utils/xmlUtil");

module.exports = function (_baseSkill) {
    _inherits(ExcelBaseSkill, _baseSkill);

    function ExcelBaseSkill() {
        _classCallCheck(this, ExcelBaseSkill);

        return _possibleConstructorReturn(this, (ExcelBaseSkill.__proto__ || Object.getPrototypeOf(ExcelBaseSkill)).apply(this, arguments));
    }

    _createClass(ExcelBaseSkill, [{
        key: "genImageJsonResFolderPath",
        value: function genImageJsonResFolderPath(stateId) {

            return "state" + stateId + "/";
        }
    }, {
        key: "genImageJsonResFolderPath1",
        value: function genImageJsonResFolderPath1(stepIdx, stateId) {
            // patch fix
            return stepIdx + "/state" + stateId + "/";
        }
    }, {
        key: "createImageJson",
        value: function createImageJson(skillParams, callback) {

            var taskParams = skillParams.taskParams;
            var paramValueObj = skillParams.paramsObj;
            //   var stateId = 1;
            var finalObject = {};
            finalObject["folderPath"] = xmlUtil.generateTaskFolderPath(taskParams.taskId) + this.genImageJsonResFolderPath1(taskParams.stepIndex, taskParams.stateId);

            skillParams.taskParams.parentFolder = this.genImageJsonResFolderPath(taskParams.stateId);

            var promiseArr = [];
            var self = this;
            for (var iterator = 0; iterator < paramValueObj["sheets"].length; ++iterator) {

                promiseArr.push(self.genSheetPromise(skillParams, iterator));

                // requestArr1.push(promiseObj);

                // Promise.all(requestArr[iterator]).then(function(resolveParam){
                //     console.log("Single sheet operation success");
                //     // callback(null,resolveParam.finalObject, resolveParam.preloadResArr);
                //     //update folder name
                //     resolve("resolved");

                //     },function(err){
                //     console.log("Single sheet operation Failed");
                //     reject(error);
                //     // callback(err)

                //     });
            }

            Promise.all(promiseArr).then(function (resolveParam) {
                console.log("folder operation success");
                finalObject["sheetImages"] = [];
                var preloadResArr = [];
                for (var index = 0; index < resolveParam.length; ++index) {
                    finalObject["sheetImages"].push(resolveParam[index].sheetObject);
                    for (var iterator = 0; iterator < resolveParam[index].preloadResArr.length; ++iterator) {
                        preloadResArr.push(resolveParam[index].preloadResArr[iterator]);
                    }
                }

                var abc = JSON.stringify(finalObject);
                callback(null, abc, preloadResArr);
            }, function (err) {
                console.log("folder operation Failed");
                callback(err);
            });

            // taskParams.dbFilestoreMgr.copyAssetFolderContents(paramValueObj["sheets"][0]["path"], taskParams.stepIndex,taskParams.taskId, function(error, newFolderPath){
            //     if(!error){
            //         var finalObject = {};
            //         // finalObject['folderPath'] = paramValueObj["sheets"][0]["path"];
            //         finalObject['folderPath'] = newFolderPath;
            //         // only this path needds to be changed.
            //         var sheetArr = []
            //         var requestArray = [];
            //         var preloadResArr = [];

            //         for(var iterator = 0 ; iterator < paramValueObj["sheets"].length; ++iterator){
            //             sheetArr[iterator] = {};
            //             sheetArr[iterator]['sheetNo'] = 1;

            //             sheetArr[iterator]['gridImg'] = paramValueObj["sheets"][iterator].gridImage.name;
            //             preloadResArr.push({"path":""+ newFolderPath + sheetArr[iterator]['gridImg'] ,"type":"img"})

            //             sheetArr[iterator]['rowImg'] = paramValueObj["sheets"][iterator].rowImage.name
            //             preloadResArr.push({"path":""+ newFolderPath + sheetArr[iterator]['rowImg'] ,"type":"img"})

            //             sheetArr[iterator]['colImg'] = paramValueObj["sheets"][iterator].cellImage.name;
            //             preloadResArr.push({"path":""+ newFolderPath + sheetArr[iterator]['colImg'] ,"type":"img"})
            //             // requestArray.push(returnPromiseObj(finalObject['folderPath'] + sheetArr[iterator]['colImg']))

            //             sheetArr[iterator]['cellImg'] = paramValueObj["sheets"][iterator].columnImage.name;
            //             preloadResArr.push({"path":""+ newFolderPath + sheetArr[iterator]['cellImg'] ,"type":"img"})

            //         }    

            //         finalObject['sheetImages'] = sheetArr;
            //         finalObject = JSON.stringify(finalObject);
            //         callback(null, finalObject, preloadResArr);
            // }
            // else{
            //     callback(error)
            // }
            // })
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
                // genFilePromise(skillParams ,iterator, imageName);
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
                    sheetObject["sheetNo"] = 1;
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
                taskParams.dbFilestoreMgr.copyTaskAssetFile(filepath, taskParams, function (error, xmlPath, fileType) {
                    if (!error) {
                        // sheetArr[iterator] = [];
                        // sheetArr[iterator][imageObj] = paramValueObj["sheets"]["value"][iterator][Object.keys(imageObj)[0]].name;
                        //  xmlPath; //for this file
                        var preloadResArr = [];
                        // preloadResArr.push({"path":""+ xmlPath +"/"+ sheetArr[iterator]['gridImg'] ,"type":"img"});
                        //where to update the folder path
                        var resolveParam = {};
                        resolveParam[Object.keys(imageObj)[0]] = xmlPath;
                        resolveParam["fileType"] = fileType;
                        resolve(resolveParam);
                    } else {
                        // console.log("error in the createSheetCellData");
                        // callback(error);
                        reject(error);
                    }
                });
            });
        }

        // genFilePromise(paramValueObj , iterator, stepIndex, taskId){

        //     return new Promise(function(resolve,reject){
        //         taskParams.dbFilestoreMgr.copyAssetFolderContents(paramValueObj["sheets"]["value"][iterator]["filepath"], taskParams.stepIndex,taskParams.taskId, function(error, newFolderPath){
        //         if(!error){
        //             var finalObject = {};
        //             // finalObject['folderPath'] = paramValueObj["sheets"][0]["path"];
        //             finalObject['folderPath'] = newFolderPath;
        //             // only this path needds to be changed.
        //             var sheetArr = []
        //             var requestArray = [];
        //             var preloadResArr = [];

        //             // for(var iterator = 0 ; iterator < paramValueObj["sheets"].length; ++iterator){
        //                 sheetArr[iterator] = {};
        //                 sheetArr[iterator]['sheetNo'] = 1;

        //                 sheetArr[iterator]['gridImg'] = paramValueObj["sheets"][iterator].gridImage.name;
        //                 preloadResArr.push({"path":""+ newFolderPath + sheetArr[iterator]['gridImg'] ,"type":"img"})
        //                 preloadResArr.push({"path":""+ newFolderPath + sheetArr[iterator]['gridImg'] ,"type":"img"})

        //                 sheetArr[iterator]['rowImg'] = paramValueObj["sheets"][iterator].rowImage.name
        //                 preloadResArr.push({"path":""+ newFolderPath + sheetArr[iterator]['rowImg'] ,"type":"img"})

        //                 sheetArr[iterator]['colImg'] = paramValueObj["sheets"][iterator].cellImage.name;
        //                 preloadResArr.push({"path":""+ newFolderPath + sheetArr[iterator]['colImg'] ,"type":"img"})
        //                 // requestArray.push(returnPromiseObj(finalObject['folderPath'] + sheetArr[iterator]['colImg']))

        //                 sheetArr[iterator]['cellImg'] = paramValueObj["sheets"][iterator].columnImage.name;
        //                 preloadResArr.push({"path":""+ newFolderPath + sheetArr[iterator]['cellImg'] ,"type":"img"})

        //             // }    

        //             finalObject['sheetImages'] = sheetArr;
        //             finalObject = JSON.stringify(finalObject);
        //             // callback(null, finalObject, preloadResArr);
        //             resolveParam = {"finalObject": finalObject, "preloadResArr":preloadResArr}
        //             resolve(resolveParam);
        //     }
        //     else{
        //         reject(error)
        //     }
        //     })

        //     })
        // }

    }]);

    return ExcelBaseSkill;
}(baseSkill);