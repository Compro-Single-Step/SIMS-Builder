var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var AccessBaseSkill = require("../common/acSkill");

var createcrosstabquery = function (_AccessBaseSkill) {
    _inherits(createcrosstabquery, _AccessBaseSkill);

    function createcrosstabquery() {
        _classCallCheck(this, createcrosstabquery);

        var _this = _possibleConstructorReturn(this, (createcrosstabquery.__proto__ || Object.getPrototypeOf(createcrosstabquery)).call(this));

        _this.crossTabInputJson = {};
        _this.crossTabRowAxisArray = [];
        _this.calcFunctionJson = {};
        _this.finalQueryName = "";

        return _this;
    }

    _createClass(createcrosstabquery, [{
        key: "init",
        value: function init(data) {
            try {
                this.finalQueryName = data.stepUIState.views[2].finalCrossTabQueryName.value;
                if (this.finalQueryName == "") {
                    var defaultQueryName = data.stepUIState.views[2].defaultCrossTabQueryName.value;
                    this.finalQueryName = defaultQueryName;
                }
                return Promise.resolve(true);
            } catch (error) {
                return Promise.reject(true);
            }
        }
    }, {
        key: "getCrossTabJsonInput",
        value: function getCrossTabJsonInput(skillParams) {
            var paramValueObj = skillParams.paramsObj;
            var taskParams = skillParams.taskParams;
            return taskParams.dbFilestoreMgr.readFileFromFileStore(paramValueObj.inputJsonPath).then(function (resolveParam) {
                var finalValue = JSON.parse(resolveParam.fileData);
                var resolveParams = { "attrValue": JSON.stringify(finalValue) };
                return Promise.resolve(resolveParams);
            }, function (error) {
                return Promise.reject(error);
            });
        }
    }, {
        key: "getSelectedDBObjectType",
        value: function getSelectedDBObjectType(skillParams) {
            var paramValueObj = skillParams.paramsObj;
            if (paramValueObj.selectedObj != "") {
                return _get(createcrosstabquery.prototype.__proto__ || Object.getPrototypeOf(createcrosstabquery.prototype), "getSelectedDBObjectType", this).call(this, skillParams);
            } else {
                var resolveParams = { "attrValue": null };
                return Promise.resolve(resolveParams);
            }
        }
    }, {
        key: "getSelectedDBObjectName",
        value: function getSelectedDBObjectName(skillParams) {
            var paramValueObj = skillParams.paramsObj;
            if (paramValueObj.selectedObj != "") {
                return _get(createcrosstabquery.prototype.__proto__ || Object.getPrototypeOf(createcrosstabquery.prototype), "getSelectedDBObjectName", this).call(this, skillParams);
            } else {
                var resolveParams = { "attrValue": null };
                return Promise.resolve(resolveParams);
            }
        }
    }, {
        key: "getCalcFnsMapJson",
        value: function getCalcFnsMapJson(skillParams) {
            var paramValueObj = skillParams.paramsObj;
            var taskParams = skillParams.taskParams;
            if (paramValueObj.calcMapJson != "") {
                return taskParams.dbFilestoreMgr.readFileFromFileStore(paramValueObj.calcMapJson).then(function (resolveParam) {
                    var finalValue = JSON.parse(resolveParam.fileData);
                    var resolveParams = { "attrValue": JSON.stringify(finalValue) };
                    return Promise.resolve(resolveParams);
                }, function (error) {
                    return Promise.reject(error);
                });
            } else {
                var resolveParams = { "attrValue": null };
                return Promise.resolve(resolveParams);
            }
        }
    }, {
        key: "getFinalQueryName",
        value: function getFinalQueryName(skillParams) {
            try {
                var resolveParam = { "attrValue": this.finalQueryName };
                return Promise.resolve(resolveParam);
            } catch (error) {
                return Promise.reject(error);
            }
        }
    }, {
        key: "getSumRowsValue",
        value: function getSumRowsValue(skillParams) {
            try {
                var paramValueObj = skillParams.paramsObj;
                var resolveParam = { "attrValue": paramValueObj.includeSum.toString() };
                return Promise.resolve(resolveParam);
            } catch (error) {
                return Promise.reject(error);
            }
        }
    }, {
        key: "getDatasheetProjectJSon",
        value: function getDatasheetProjectJSon(skillParams) {

            // read the datasheet view project json
            var paramValueObj = skillParams.paramsObj;
            var queryName = this.finalQueryName;
            var taskParams = skillParams.taskParams;

            return taskParams.dbFilestoreMgr.readFileFromFileStore(paramValueObj.datasheetProjJsnPath).then(function (resolveParam) {
                // after reading it, copy the data json path to the xml file folder path 
                // check if the certain query object exists or not 
                var projJson = JSON.parse(resolveParam.fileData);
                var fieldFound = false;

                var _loop = function _loop(index) {
                    var currQueryObj = projJson["queries"][index];
                    if (currQueryObj["name"] == queryName) {
                        fieldFound = true;
                        var tableDatafilepath = paramValueObj.datasheetdataJsnPath;
                        return {
                            v: taskParams.dbFilestoreMgr.copyTaskAssetFile(tableDatafilepath, taskParams).then(function (resolveParam) {

                                // then update the path in the project json
                                currQueryObj["dataPath"] = resolveParam.filePath;
                                // return the resolve param with 2 preload resources
                                var resolveParams = { "fileData": projJson, "Tabledatapath": resolveParam.filePath };
                                return Promise.resolve(resolveParams);
                            }, function (error) {
                                return Promise.reject(error);
                            }).then(function (resolveParam) {
                                // make the write call now
                                return skillParams.taskParams.dbFilestoreMgr.saveTaskDynamicResource(skillParams.taskParams, JSON.stringify(resolveParam.fileData), "tableDataBestFit.json").then(function (resolvePath) {
                                    // the file has been written now
                                    var preloadResArr = []; //;
                                    preloadResArr.push({ "path": resolveParam.Tabledatapath, "type": "json" });
                                    preloadResArr.push({ "path": resolvePath, "type": "json" });
                                    var resolveParams = { "attrValue": resolvePath, "preloadResArr": preloadResArr };
                                    return Promise.resolve(resolveParams);
                                }, function (error) {
                                    return Promise.reject(error);
                                });
                            }, function (error) {
                                return Promise.reject(error);
                            })
                        };
                    } // end of queryname check
                };

                for (var index = 0; index < projJson["queries"].length; ++index) {
                    var _ret = _loop(index);

                    if ((typeof _ret === "undefined" ? "undefined" : _typeof(_ret)) === "object") return _ret.v;
                }
                if (fieldFound == false) {
                    var errObj = new Error("Final Query Name Given does not exist in the Datasheet Project Json");
                    return Promise.reject(errObj);
                }
            }, function (error) {
                console.log("" + error.message);
                return Promise.reject(error);
            });
            // update the path in it
            // save the new Object.prototype.hasOwnProperty;json file to a new place
        }
    }, {
        key: "updateRowAxisDropdown",
        value: function updateRowAxisDropdown(stage1SelectedItem, crossTableRowAxisArray) {

            this.crossTabRowAxisArray = [];
            while (crossTableRowAxisArray.length > 0) {
                crossTableRowAxisArray.pop();
            }
            if (typeof stage1SelectedItem != null && this.isEmptyObject(stage1SelectedItem) == false && this.crossTabInputJson != null) {
                var filteredObj = this.crossTabInputJson[stage1SelectedItem.data.category].find(function (obj) {
                    return obj.table_name === stage1SelectedItem.data.table_name;
                });
                if (filteredObj.table_fields.length > 0) {
                    for (var i = 0; i < filteredObj.table_fields.length; i++) {
                        crossTableRowAxisArray.push({ "label": filteredObj.table_fields[i], "data": filteredObj.table_fields[i] });
                    }
                }
                this.crossTabRowAxisArray = crossTableRowAxisArray;
            }
        }
    }, {
        key: "updateRowColumnAxisDropdown",
        value: function updateRowColumnAxisDropdown(rowAxisSelectedDropdown, columnAxisSelectedItems) {

            this.crossTabColumnAxisArray = [];
            while (columnAxisSelectedItems.value.length > 0) {
                columnAxisSelectedItems.value.pop();
            }
            if (typeof rowAxisSelectedDropdown !== null) {
                var filteredAray = this.crossTabRowAxisArray.filter(function (item) {
                    return item.data !== rowAxisSelectedDropdown.data;
                });
                for (var i = 0; i < filteredAray.length; i++) {
                    columnAxisSelectedItems.value.push({ "label": filteredAray[i].label, "data": filteredAray[i].data });
                }
            }
            this.crossTabColumnAxisArray = filteredAray;
        }
    }, {
        key: "fieldsToBecalculated",
        value: function fieldsToBecalculated(columnAxisSelectedDropdown, fieldsToBecalculatedItem) {
            while (fieldsToBecalculatedItem.value.length > 0) {
                fieldsToBecalculatedItem.value.pop();
            }
            if (typeof columnAxisSelectedDropdown !== null) {
                var filteredAray = this.crossTabColumnAxisArray.filter(function (item) {
                    return item.data !== columnAxisSelectedDropdown.data;
                });
                for (var i = 0; i < filteredAray.length; i++) {
                    fieldsToBecalculatedItem.value.push({ "label": filteredAray[i].label, "data": filteredAray[i].data });
                }
            }
        }
    }, {
        key: "isEmptyObject",
        value: function isEmptyObject(obj) {
            for (var prop in obj) {
                if (obj.hasOwnProperty(prop)) return false;
            }

            return true;
        }
    }, {
        key: "stage1SelectedItems",
        value: function stage1SelectedItems(inputJson, crosstabInputArray) {
            this.crossTabInputJson = inputJson;
            if (typeof stage1SelectedItem !== null) {

                while (crosstabInputArray.length > 0) {
                    crosstabInputArray.pop();
                }
                for (var key in inputJson) {
                    // if (key == 'Tables') {

                    for (var i = 0; i < inputJson[key].length; i++) {
                        crosstabInputArray.push({ "label": inputJson[key][i].table_name, "data": { 'category': key, 'table_fields': inputJson[key][i].table_fields, 'table_name': inputJson[key][i].table_name } });
                    }
                    console.log(crosstabInputArray);
                    //}
                }
                this.crossTabInputJsonArray = crosstabInputArray;
            }
        }
    }, {
        key: "updateCalcFunctionList",
        value: function updateCalcFunctionList(selectedField, updateValue) {

            var defaultCalcArray = [{ "label": "Avg", "data": "Avg" }, { "label": "Count", "data": "Count" }, { "label": "First", "data": "First" }, { "label": "Last", "data": "Last" }, { "label": "Max", "data": "Max" }, { "label": "Min", "data": "Min" }, { "label": "StDev", "data": "StDev" }, { "label": "Sum", "data": "Sum" }, { "label": "Var", "data": "Var" }];
            var fieldFound = false;
            if (selectedField != "" && selectedField != null) {
                if (Object.keys(this.calcFunctionJson).length != 0) {
                    for (var field in this.calcFunctionJson) {
                        if (field == selectedField.data) {
                            fieldFound = true;
                            updateValue.value = [];
                            for (var index = 0; index < this.calcFunctionJson[field].length; ++index) {
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
            } else {
                updateValue.value = [];
            }
        }
    }, {
        key: "populateFieldCalculated",
        value: function populateFieldCalculated(inputObj, updateValue) {
            if (inputObj && inputObj != "") {
                this.calcFunctionJson = inputObj;
            }
        }
    }]);

    return createcrosstabquery;
}(AccessBaseSkill);

module.exports = createcrosstabquery;