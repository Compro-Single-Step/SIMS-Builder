var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

module.exports = function () {
    function BaseSkill() {
        _classCallCheck(this, BaseSkill);
    }

    _createClass(BaseSkill, [{
        key: "init",


        /**
         * function for some processing which is required for IO Map translation of all the applications
         * @param {*} data : an object of values having certain data to be used
         */
        value: function init(data) {
            // returning empty promise
            // equivalent to do nothing
            return Promise.resolve(true);
        }

        /**
        * fnality
        * function takes the path of the taskkbar preview image and moves the image resource and returns its new path
        */

    }, {
        key: "createTooltipImagePath",
        value: function createTooltipImagePath(skillParams) {

            var taskParams = skillParams.taskParams;
            var paramValueObj = skillParams.paramsObj;
            return taskParams.dbFilestoreMgr.copyTaskAssetFile(paramValueObj["tbPrvImage"], taskParams).then(function (resolveParam) {
                var preloadResArr = [];
                preloadResArr.push({ "path": "" + resolveParam.filePath, "type": resolveParam.fileType });
                var resolveParams = { "attrValue": resolveParam.filePath, "preloadResArr": preloadResArr };
                return Promise.resolve(resolveParams);
            }, function (error) {
                return Promise.reject(error);
            });
        }

        /**
        * if any attribute is not given any function value then this function is called 
        * it takes the value fo the first key in the params value and returns its value as the resolveParam
        */

    }, {
        key: "extractSingleParamVal",
        value: function extractSingleParamVal(skillParams) {

            var paramValueObj = skillParams.paramsObj;
            var resolveParam = { "attrValue": paramValueObj[Object.keys(paramValueObj)[0]] };
            return Promise.resolve(resolveParam);
        }
    }, {
        key: "getSubribbon",
        value: function getSubribbon(skillParams) {
            var skillParamsObj = skillParams.skillParamsObj;
            var pathArray = [{
                "path": skillParamsObj["subribbonPath"],
                "resourceType": "skill",
                "addToPreload": "false"
            }, {
                "path": skillParamsObj["subribbonPath_1024"],
                "resourceType": "skill",
                "addToPreload": "false"
            }];
            var attrValue = skillParams.taskParams.addResourceToMap(pathArray)[0]["absFilePath"];
            return Promise.resolve({ attrValue: attrValue });
        }
    }, {
        key: "extractAttrPath",
        value: function extractAttrPath(skillParams) {
            //Use this function instead of createTooltipImagePath for tooltip in next iteration of Move Cell Content 
            var taskParams = skillParams.taskParams;
            var paramValueObj = skillParams.paramsObj;
            if (paramValueObj[Object.keys(paramValueObj)[0]] != "") {
                return taskParams.dbFilestoreMgr.copyTaskAssetFile(paramValueObj[Object.keys(paramValueObj)[0]], taskParams).then(function (resolveParam) {
                    var preloadResArr = [];
                    preloadResArr.push({ "path": "" + resolveParam.filePath, "type": resolveParam.fileType });
                    var resolveParams = { "attrValue": resolveParam.filePath, "preloadResArr": preloadResArr };
                    return Promise.resolve(resolveParams);
                }, function (error) {
                    return Promise.reject(error);
                });
            } else {
                var resolveParams = { "attrValue": "" };
                return Promise.resolve(resolveParams);
            }
        }
    }, {
        key: "handleEmbededResources",
        value: function handleEmbededResources(skillParams) {
            try {
                var dbfileStoreManager = skillParams.taskParams.dbFilestoreMgr;
                var resourceUtil = skillParams.taskParams.resourceUtil;
                var _skillParams$paramsOb = skillParams.paramsObj,
                    resourcePath = _skillParams$paramsOb.resourcePath,
                    embedableResources = _skillParams$paramsOb.embedableResources;

                var fromArray = [];
                var toArray = [];
                var modifiedPathArr = [];

                embedableResources.forEach(function (imgObject) {
                    modifiedPathArr.push(skillParams.taskParams.addResourceToMap({ "path": imgObject.path }).absFilePath);
                });

                return dbfileStoreManager.getFileFromFileStore(dbfileStoreManager.getResourcePath(resourcePath)).then(function (fileContent) {
                    if (embedableResources.length) {
                        var regex = /{#([^}]*)#}/g;
                        var matches = void 0,
                            imgNameArray = [];
                        while (matches = regex.exec(fileContent)) {
                            imgNameArray.push(matches[1]);
                        }

                        imgNameArray.forEach(function (imageName) {
                            modifiedPathArr.forEach(function (path) {
                                var modifiedImageName = resourceUtil.getFileNameWithExtension(path).split('.').slice(1).join('.');
                                if (imageName.toLowerCase() === modifiedImageName.toLowerCase()) {
                                    fromArray.push("{#" + imageName + "#}");
                                    toArray.push(path);
                                }
                            });
                        });

                        for (var index = 0; index < fromArray.length; index++) {
                            fileContent = fileContent.replace(fromArray[index], toArray[index]);
                        }

                        var fileName = resourceUtil.getFileNameWithExtension(resourcePath);
                        return dbfileStoreManager.saveTaskDynamicResource(skillParams.taskParams, fileContent, fileName).then(function (filePath) {
                            return Promise.resolve({ "attrValue": filePath, 'preloadResArr': [{ path: filePath, type: resourceUtil.getFileType(filePath) }] });
                        }).catch(function (error) {
                            return Promise.reject(error);
                        });
                    } else {
                        return dbfileStoreManager.copyTaskAssetFile(resourcePath, skillParams.taskParams).then(function (resolveParam) {
                            return Promise.resolve({ "attrValue": resolveParam.filePath, 'preloadResArr': [{ path: resolveParam.filePath, type: resolveParam.fileType }] });
                        }).catch(function (error) {
                            return Promise.reject(error);
                        });
                    }
                }).catch(function (error) {
                    return Promise.reject(error);
                });
            } catch (error) {
                return Promise.reject(error);
            }
        }
    }, {
        key: "createResourcePath",
        value: function createResourcePath(skillParams) {
            var taskParams = skillParams.taskParams;
            var paramValueObj = skillParams.paramsObj;

            var attrValue = skillParams.taskParams.addResourceToMap({ path: paramValueObj["path"] }).absFilePath;
            // { attrValue } is new syntax of ES6 which means => { 'attrValue': attrValue }
            return Promise.resolve({ attrValue: attrValue });
        }
    }]);

    return BaseSkill;
}();