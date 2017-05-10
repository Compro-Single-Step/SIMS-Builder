const AccessBaseSkill = require("../common/acSkill");

class createcrosstabquery extends AccessBaseSkill {
    constructor() {
        super();
        this.crossTabInputJson = {};
        this.crossTabRowAxisArray = [];
        this.calcFunctionJson = {};

    }
    getCrossTabJsonInput(skillParams) {
        let paramValueObj = skillParams.paramsObj;
        let taskParams = skillParams.taskParams;
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
        let taskParams = skillParams.taskParams;
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
        // save the new Object.prototype.hasOwnProperty;json file to a new place
    }

    updateRowAxisDropdown(stage1SelectedItem, crossTableRowAxisArray) {
        this.crossTabRowAxisArray = [];
        while (crossTableRowAxisArray.length > 0) {
            crossTableRowAxisArray.pop();
        }
        if (this.isEmptyObject(stage1SelectedItem) === false) {
            var filteredObj = this.crossTabInputJson[stage1SelectedItem.data.category].find(function (obj) {
                return obj.table_name === stage1SelectedItem.data.table_name

            });
            if (filteredObj.table_fields.length > 0) {
                for (let i = 0; i < filteredObj.table_fields.length; i++) {
                    crossTableRowAxisArray.push({ "label": filteredObj.table_fields[i], "data": filteredObj.table_fields[i] });
                }
            }
            this.crossTabRowAxisArray = crossTableRowAxisArray;
        }

    }
    updateRowColumnAxisDropdown(rowAxisSelectedDropdown, columnAxisSelectedItems) {

    	 this.crossTabColumnAxisArray = [];
         while (columnAxisSelectedItems.value.length > 0) {
            columnAxisSelectedItems.value.pop();
        }
        if (this.isEmptyObject(rowAxisSelectedDropdown) === false) {
            var filteredAray = this.crossTabRowAxisArray.filter((item) => item.data !== rowAxisSelectedDropdown.data);
            for (let i = 0; i < filteredAray.length; i++) {
                columnAxisSelectedItems.value.push({ "label": filteredAray[i].label, "data": filteredAray[i].data });
            }
        }
        this.crossTabColumnAxisArray = filteredAray;

    }
    
     fieldsToBecalculated(columnAxisSelectedDropdown, fieldsToBecalculatedItem) {
         while (fieldsToBecalculatedItem.value.length > 0) {
            fieldsToBecalculatedItem.value.pop();

        }
        if (this.isEmptyObject(columnAxisSelectedDropdown) === false) {
            var filteredAray = this.crossTabColumnAxisArray.filter((item) => item.data !== columnAxisSelectedDropdown.data);
            for (let i = 0; i < filteredAray.length; i++) {
                fieldsToBecalculatedItem.value.push({ "label": filteredAray[i].label, "data": filteredAray[i].data });
            }
        }

    }

    isEmptyObject(obj) {
        for (var prop in obj) {
            if (obj.hasOwnProperty(prop))
                return false;
        }

        return true;
    }
    stage1SelectedItems(inputJson, crosstabInputArray) {

        this.crossTabInputJson = inputJson;

        while (crosstabInputArray.length > 0) {
            crosstabInputArray.pop();
        }
        for (let key in inputJson) {
            // if (key == 'Tables') {

            for (let i = 0; i < inputJson[key].length; i++) {
                crosstabInputArray.push({ "label": inputJson[key][i].table_name, "data": { 'category': key, 'table_fields': inputJson[key][i].table_fields, 'table_name': inputJson[key][i].table_name } });
            }
            console.log(crosstabInputArray);
            //}
        }
        this.crossTabInputJsonArray = crosstabInputArray;
    }

    updateCalcFunctionList(selectedField, updateValue) {

        let defaultCalcArray = ["Avg", "Count", "First", "Last", "Max", "Min", "StDev", "Sum", "Var"];
        let fieldFound = false;
        if (selectedField != "") {
            if (Object.keys(this.calcFunctionJson).length != 0) {
                for (field in this.calcFunctionJson) {
                    if (field == selectedField) {
                        fieldFound = true;
                        updateValue = this.calcFunctionJson[field]
                        break;
                    }
                }
            }
            if (fieldFound == false) {
                updateValue = defaultCalcArray;
            }
        }
        else {
            updateValue = [];
        }
    }

    populateFieldCalculated(inputObj, param2) {

        if(inputObj){
            this.calcFunctionJson = inputObj;
        }
    }
}
module.exports = createcrosstabquery;