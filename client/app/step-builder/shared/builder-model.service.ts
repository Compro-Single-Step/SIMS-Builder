class BuilderModel {
    private builderModel: Object = {
        "views": {
            "1": {
                "documentTitle": {
                    "value": ""
                },
                "documentData": {
                    "name": "",
                    "path": ""
                },
                "sheets": {
                    "value": [
                        {
                            "name": "dummy sheet",
                            "path": "",
                            "gridImage": {
                                "name": "img.png"
                            },
                            "rowImage": {
                                "name": ""
                            },
                            "columnImage": {
                                "name": ""
                            },
                            "cellImage": {
                                "name": ""
                            }
                        }
                    ]
                },
                "taskbarPreviewImage": {
                    "name": "",
                    "path": ""
                }
            },
            "2": {
                "sheetInAction": { "value": [] },
                "sourceRange": { "value": "G5:H6" },
                "destinationRange": { "value": "D5:E6" }
            },
            "3": {
                "workbookData": {
                    "name": "",
                    "path": ""
                },
                "sheets": {
                    "value": [{
                        "name": "dummy sheet",
                        "path": "",
                        "gridImage": {
                            "name": ""
                        },
                        "rowImage": {
                            "name": ""
                        },
                        "columnImage": {
                            "name": ""
                        },
                        "cellImage": {
                            "name": ""
                        }
                    }]
                }
            }
        }
    }

    setModel(newModel) {
        this.builderModel = newModel;
    }

    getModel() {
        return this.builderModel;
    }

    getModelRef(modelRefStr) {
        return eval("this.builderModel." + modelRefStr.replace(/['{{','}}']/g, ""));
    }
};

export let BuilderModelObj = new BuilderModel();
