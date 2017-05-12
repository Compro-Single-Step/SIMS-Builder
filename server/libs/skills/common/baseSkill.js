module.exports = class BaseSkill {

    /**
     * function for some processing which is required for IO Map translation of all the applications
     * @param {*} data : an object of values having certain data to be used
     */
    init(data) {
        // returning empty promise
        // equivalent to do nothing
        return Promise.resolve(true);
    }

    /**
  * fnality
  * function takes the path of the taskkbar preview image and moves the image resource and returns its new path
  */
    createTooltipImagePath(skillParams) {

        var taskParams = skillParams.taskParams;
        var paramValueObj = skillParams.paramsObj;
        return taskParams.dbFilestoreMgr.copyTaskAssetFile(paramValueObj["tbPrvImage"], taskParams)
            .then(function (resolveParam) {
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

    extractSingleParamVal(skillParams) {

        var paramValueObj = skillParams.paramsObj;
        var resolveParam = { "attrValue": paramValueObj[Object.keys(paramValueObj)[0]] };
        return Promise.resolve(resolveParam);
    }

    getSubribbon(skillParams) {
        var skillParamsObj = skillParams.skillParamsObj;
        var pathArray = [
            {
                "path": skillParamsObj["subribbonPath"],
                "resourceType": "skill",
                "addToPreload": "false"
            },
            {
                "path": skillParamsObj["subribbonPath_1024"],
                "resourceType": "skill",
                "addToPreload": "false"
            }
        ];
        let attrValue = skillParams.taskParams.addResourceToMap(pathArray)[0]["absFilePath"];
        return Promise.resolve({ attrValue });
    }

    extractAttrPath(skillParams) {  //Use this function instead of createTooltipImagePath for tooltip in next iteration of Move Cell Content 
        var taskParams = skillParams.taskParams;
        var paramValueObj = skillParams.paramsObj;
        if (paramValueObj[Object.keys(paramValueObj)[0]] != "") {
            return taskParams.dbFilestoreMgr.copyTaskAssetFile(paramValueObj[Object.keys(paramValueObj)[0]], taskParams)
                .then(function (resolveParam) {
                    var preloadResArr = [];
                    preloadResArr.push({ "path": "" + resolveParam.filePath, "type": resolveParam.fileType });
                    var resolveParams = { "attrValue": resolveParam.filePath, "preloadResArr": preloadResArr };
                    return Promise.resolve(resolveParams);
                }, function (error) {
                    return Promise.reject(error);
                });
        }
        else {
            var resolveParams = { "attrValue": "" };
            return Promise.resolve(resolveParams);
        }
    }

    handleEmbededResources(skillParams) {
        try {
            let dbfileStoreManager = skillParams.taskParams.dbFilestoreMgr;
            let resourceUtil = skillParams.taskParams.resourceUtil;
            let { resourcePath, embedableResources } = skillParams.paramsObj;
            let fromArray = [];
            let toArray = [];
            let modifiedPathArr = [];

            embedableResources.forEach(function (imgObject) {
                modifiedPathArr.push(skillParams.taskParams.addResourceToMap({"path": imgObject.path}).absFilePath);
            });

            return dbfileStoreManager.getFileFromFileStore(dbfileStoreManager.getResourcePath(resourcePath))
                .then((fileContent) => {
                    if (embedableResources.length) {
                        let regex = /{#([^}]*)#}/g;
                        let matches,
                            imgNameArray = [];
                        while (matches = regex.exec(fileContent)) {
                            imgNameArray.push(matches[1]);
                        }

                        imgNameArray.forEach(function (imageName) {
                            modifiedPathArr.forEach(function (path) {
                                let modifiedImageName = resourceUtil.getFileNameWithExtension(path).split('.').slice(1).join('.');
                                if (imageName.toLowerCase() === modifiedImageName.toLowerCase()) {
                                    fromArray.push(`{#${imageName}#}`);
                                    toArray.push(path);
                                }
                            });
                        });

                        for (let index = 0; index < fromArray.length; index++) {
                            fileContent = fileContent.replace(fromArray[index], toArray[index]);
                        }

                        let fileName = resourceUtil.getFileNameWithExtension(resourcePath);
                        return dbfileStoreManager.saveTaskDynamicResource(skillParams.taskParams, fileContent, fileName)
                            .then((filePath) => {
                                return Promise.resolve({ "attrValue": filePath, 'preloadResArr': [{ path: filePath, type: resourceUtil.getFileType(filePath) }] });
                            })
                            .catch((error) => {
                                return Promise.reject(error);
                            });

                    } else {
                        return dbfileStoreManager.copyTaskAssetFile(resourcePath, skillParams.taskParams)
                            .then((resolveParam) => {
                                return Promise.resolve({ "attrValue": resolveParam.filePath, 'preloadResArr': [{ path: resolveParam.filePath, type: resolveParam.fileType }] });
                            })
                            .catch((error) => {
                                return Promise.reject(error);
                            });
                    }
                })
                .catch((error) => {
                    return Promise.reject(error);
                });
        } catch (error) {
            return Promise.reject(error);
        }
    }
}