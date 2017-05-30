const AccessBaseSkill = require("../common/acSkill");

class createcrosstabquery extends AccessBaseSkill {
    constructor() {
        super();
        this.crossTabInputJson = {};
        this.crossTabRowAxisArray = [];
        this.calcFunctionJson = {};
        this.finalQueryName = ""

    }

     init(data) {
         try{
            this.finalQueryName  = data.stepUIState.views[2].finalCrossTabQueryName.value;
            if(this.finalQueryName == ""){
                let defaultQueryName  = data.stepUIState.views[2].defaultCrossTabQueryName.value;
                this.finalQueryName = defaultQueryName;
         }
         return Promise.resolve(true);
         }catch(error){
            return Promise.reject(true);
         }
         
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

    getSelectedDBObjectType(skillParams) {
        var paramValueObj = skillParams.paramsObj;
        if (Object.keys(paramValueObj.selectedObj) != 0) {
            return super.getSelectedDBObjectType(skillParams);
        }
        else {
            let resolveParams = { "attrValue": null }
            return Promise.resolve(resolveParams);
        }
    }

     getSelectedDBObjectName(skillParams) {
        var paramValueObj = skillParams.paramsObj;
        if (Object.keys(paramValueObj.selectedObj) != 0) {
            return super.getSelectedDBObjectName(skillParams);
        }
        else {
            let resolveParams = { "attrValue": null }
            return Promise.resolve(resolveParams);
        }
    }

getCalcFnsMapJson(skillParams) {
    let paramValueObj = skillParams.paramsObj;
    let taskParams = skillParams.taskParams;
    if (paramValueObj.calcMapJson != "") {
        return taskParams.dbFilestoreMgr.readFileFromFileStore(paramValueObj.calcMapJson).then(function (resolveParam) {
            var finalValue = JSON.parse(resolveParam.fileData);
            var resolveParams = { "attrValue": JSON.stringify(finalValue) };
            return Promise.resolve(resolveParams);
        }, function (error) {
            return Promise.reject(error);
        });
    } else {
        let resolveParams = { "attrValue": null };
        return Promise.resolve(resolveParams);
    }
}
    
    getFinalQueryName(skillParams){
        try{
            let resolveParam = {"attrValue": this.finalQueryName};
            return Promise.resolve(resolveParam);
        }catch(error){
            return Promise.reject(error);
        }
    }

    getSumRowsValue(skillParams){
        try{
            let paramValueObj = skillParams.paramsObj;
            let resolveParam = {"attrValue": (paramValueObj.includeSum).toString()};
            return Promise.resolve(resolveParam);
        }catch(error){
            return Promise.reject(error);
        }
    }

getDatasheetProjectJSon(skillParams) {

    // read the datasheet view project json
    let paramValueObj = skillParams.paramsObj;
    let queryName = this.finalQueryName;
    let taskParams = skillParams.taskParams;

    return taskParams.dbFilestoreMgr.readFileFromFileStore(paramValueObj.datasheetProjJsnPath).then(function (resolveParam) {
        // after reading it, copy the data json path to the xml file folder path 
        // check if the certain query object exists or not 
        let projJson = JSON.parse(resolveParam.fileData);
        let fieldFound = false;
        for (let index = 0; index < projJson["queries"].length; ++index) {
            let currQueryObj = projJson["queries"][index];
            if (currQueryObj["name"] == queryName) {
                fieldFound = true;
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
                        }, function (error) {
                            return Promise.reject(error);
                        })
                    }, function (error) {
                        return Promise.reject(error)
                    });

            } // end of queryname check
        }
        if (fieldFound == false) {
            let errObj = new Error("Final Query Name Given does not exist in the Datasheet Project Json");
            return Promise.reject(errObj);
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
    if (((typeof stage1SelectedItem != null && this.isEmptyObject(stage1SelectedItem) == false) && (this.crossTabInputJson != null))) {
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
    if (typeof rowAxisSelectedDropdown !== null) {
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
    if (typeof columnAxisSelectedDropdown !== null) {
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
    if (typeof stage1SelectedItem !== null) {


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
}

updateCalcFunctionList(selectedField, updateValue) {

    let defaultCalcArray = [{ "label": "Avg", "data": "Avg" },
    { "label": "Count", "data": "Count" },
    { "label": "First", "data": "First" },
    { "label": "Last", "data": "Last" },
    { "label": "Max", "data": "Max" },
    { "label": "Min", "data": "Min" },
    { "label": "StDev", "data": "StDev" },
    { "label": "Sum", "data": "Sum" },
    { "label": "Var", "data": "Var" }
    ]
    let fieldFound = false;
    if (selectedField != "" && selectedField != null) {
        if (Object.keys(this.calcFunctionJson).length != 0) {
            for (let field in this.calcFunctionJson) {
                if (field == selectedField.data) {
                    fieldFound = true;
                    updateValue.value = [];
                    for (let index = 0; index < this.calcFunctionJson[field].length; ++index) {
                        updateValue.value.push({
                            "label": this.calcFunctionJson[field][index],
                            "data": this.calcFunctionJson[field][index]
                        });
                    }
                    break;
                }
            }
        }
        if (fieldFound == false) {
            updateValue.value = defaultCalcArray;
        }
    }
    else {
        updateValue.value = [];
    }
}

populateFieldCalculated(inputObj, updateValue) {
    if (inputObj && inputObj != "") {
        this.calcFunctionJson = inputObj;
    }
}
}
module.exports = createcrosstabquery;