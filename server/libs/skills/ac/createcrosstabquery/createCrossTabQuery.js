const AccessBaseSkill = require("../common/acSkill");

class createcrosstabquery extends AccessBaseSkill {

    getCrossTabJsonInput(skillParams) {
        let paramValueObj = skillParams.paramsObj;
        return taskParams.dbFilestoreMgr.readFileFromFileStore(paramValueObj.inputJsonPath).then(function (resolveParam) {
            var finalValue = JSON.parse(resolveParam.fileData);
            var resolveParams = { "attrValue": JSON.stringify(finalValue) };
            return Promise.resolve(resolveParams);
        }, function (error) {
            return Promise.reject(error);
        })
    }

    getCalcFnsMapJson(skillParams) {
        let paramValueObj = skillParams.paramsObj;
        return taskParams.dbFilestoreMgr.readFileFromFileStore(paramValueObj.calcMapJson).then(function (resolveParam) {
            var finalValue = JSON.parse(resolveParam.fileData);
            var resolveParams = { "attrValue": JSON.stringify(finalValue) };
            return Promise.resolve(resolveParams);
        }, function (error) {
            return Promise.reject(error);
        });
    }
    getDatasheetProjectJSon(skillParams) {

        // read the datasheet view project json
        let paramValueObj = skillParams.paramsObj;
        let queryName = paramValueObj.finalQueryName;
        let taskParams = skillParams.taskParams;

        return taskParams.dbFilestoreMgr.readFileFromFileStore(paramValueObj.datasheetProjJsnPath).then(function (resolveParam) {
            // after reading it, copy the data json path to the xml file folder path 
            // check if the certain query object exists or not 
            let projJson = JSON.parse(resolveParam.fileData);
            for (let index = 0; index < projJson["queries"].length; ++index) {
                let currQueryObj = projJson["queries"][index];
                if (currQueryObj["name"] == queryName) {
                    let tableDatafilepath = paramValueObj.datasheetdataJsnPath;
                    return taskParams.dbFilestoreMgr.copyTaskAssetFile(tableDatafilepath, taskParams)
                        .then(function (resolveParam) {

                            // then update the path in the project json
                            currQueryObj["dataPath"] = resolveParam.filePath;
                            // return the resolve param with 2 preload resources
                            let resolveParams = { "fileData": projJson, "Tabledatapath": resolveParam.filePath }
                            return Promise.resolve(resolveParams)
                        }, function (error) {
                            return Promise.reject(error);
                        }).then(function (resolveParam) {
                            // make the write call now
                            return skillParams.taskParams.dbFilestoreMgr.saveTaskDynamicResource(skillParams.taskParams, JSON.stringify(resolveParam.fileData), "tableDataBestFit.json").then((resolvePath) => {
                                // the file has been written now
                                let preloadResArr = [];//;
                                preloadResArr.push({ "path": resolveParam.Tabledatapath, "type": "json" });
                                preloadResArr.push({ "path": resolvePath, "type": "json" });
                                let resolveParams = { "attrValue": resolvePath, "preloadResArr": preloadResArr };
                                return Promise.resolve(resolveParams);
                            })
                        }, function (error) {
                            return Promise.reject(error)
                        });

                } // end of queryname check
            }
        }, function (error) {
            console.log("" + error.message);
            return Promise.reject(error);
        });
        // update the path in it
        // save the new json file to a new place
    }
    updateRowAxisDropdown(crossTabInputJson, crosstabInputArray) {
        var objectType;

        while (crosstabInputArray.length > 0) {
            crosstabInputArray.pop(); //https://jsperf.com/array-clear-methods/3
        }
        for (let key in crossTabInputJson) {
            if (key == 'Tables') {
                //objectType = crossTabInputJson[key];
                for (let i = 0; i < crossTabInputJson[key].length; i++) {
                    crosstabInputArray.push({ "label": crossTabInputJson[key][i].table_name, "data": crossTabInputJson[key][i].table_name });
                }
                console.log(crosstabInputArray);
            }
        }
    }

}
module.exports = createcrosstabquery;