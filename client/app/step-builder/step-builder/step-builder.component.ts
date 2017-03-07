import { Component, OnInit } from '@angular/core';
import { UIConfig } from '../shared/UIConfig.model';

@Component({
  selector: 'app-step-builder',
  templateUrl: './step-builder.component.html',
  styleUrls: ['./step-builder.component.css']
})
export class StepBuilderComponent implements OnInit {
  uiConfig: UIConfig;

  constructor() {
    this.uiConfig = new UIConfig();
  }

  ngOnInit() {}

  fetchConfig(): void {
    //TODO: get this UI from the server using a service.
    this.uiConfig = {
      "views": [
        {
          "id": "1",
          "label": "Initial Document Settings",
          "itemType": "root",
          "desc": {},
          "items": [
            {
              "id": "1.1",
              "label": "Ribbon",
              "itemRenderer": "Panel",
              "itemType": "child",
              "tags": [
                {
                  "compName": "SIMS.Components.Excel.Ribbon",
                  "type": "default"
                }
              ],
              "rendererProperties": {
                "collapsable": true,
                "optionalItems": true
              },
              "items": [
                {
                  "id": "1.1.1",
                  "label": "Document Title",
                  "desc": {
                    "basic": "Name of the document to be displayed in Ribbon.",
                    "detailed": ""
                  },
                  "itemRenderer": "TextBox",
                  "itemType": "leaf",
                  "mandatory": false,
                  "rendererProperties": {
                    "dataType": "string"
                  },
                  "modelReference": "View1.DocumentTitle"
                }
              ]
            },
            {
              "id": "1.2",
              "label": "Workbook",
              "itemRenderer": "Panel",
              "itemType": "child",
              "tags": [
                {
                  "compName": "SIMS.Components.Excel.JSONGrid",
                  "type": "default"
                }
              ],
              "rendererProperties": {
                "collapsable": true,
                "optionalItems": true
              },
              "items": [
                {
                  "id": "1.2.1",
                  "label": "Document Data",
                  "desc": {
                    "basic": "Upload a JSON file which is used to configure the Excel workbook in SIMS.",
                    "detailed": ""
                  },
                  "itemRenderer": "Dropzone",
                  "itemType": "leaf",
                  "rendererProperties": {
                    "dataType": "JSON",
                    "placeHolder": "Drop JSON file here to upload"
                  },
                  "dependents": [
                    {
                      "id": "1.2.2",
                      "rule": ""
                    },
                    {
                      "id": "2.1.1",
                      "rule": ""
                    }
                  ],
                  "mandatory": true,
                  "modelReference": "View1.DocumentData"
                },
                {
                  "id": "1.2.2",
                  "label": "Worksheet Images",
                  "desc": {
                    "basic": "Upload the images which are used to render worksheets in SIMS.",
                    "detailed": ""
                  },
                  "itemRenderer": "TabGroup",
                  "itemType": "child",
                  "disabled": true,
                  "rendererProperties": {
                    "layout": "horizontal"
                  },
                  "items": [
                    {
                      "id": "1.2.2.1",
                      "label": "Sheet 1",
                      "itemRenderer": "TabPage",
                      "itemType": "",
                      "items": [
                        {
                          "id": "GridImage",
                          "itemRenderer": "Dropzone",
                          "itemType": "leaf",
                          "rendererProperties": {
                            "placeHolder": "Drop Grid Image",
                            "dataType": "img"
                          },
                          "pos": "x,y",
                          "dim": "h,w",
                          "modelReference": "View1.GridImage"
                        },
                        {
                          "id": "RowImage",
                          "itemRenderer": "Dropzone",
                          "itemType": "leaf",
                          "rendererProperties": {
                            "placeHolder": "Drop Row Image",
                            "dataType": "img"
                          },
                          "pos": "x,y",
                          "dim": "h,w",
                          "modelReference": "View1.RowImage"
                        },
                        {
                          "id": "ColumnImage",
                          "itemRenderer": "Dropzone",
                          "itemType": "leaf",
                          "rendererProperties": {
                            "placeHolder": "Drop Column Image",
                            "dataType": "img"
                          },
                          "pos": "x,y",
                          "dim": "h,w",
                          "modelReference": "View1.ColumnImage"
                        },
                        {
                          "id": "CellImage",
                          "itemRenderer": "Dropzone",
                          "itemType": "leaf",
                          "rendererProperties": {
                            "placeHolder": "Drop Cell Image",
                            "dataType": "img"
                          },
                          "pos": "x,y",
                          "dim": "h,w",
                          "modelReference": "View1.CellImage"
                        }
                      ]
                    }
                  ]
                }
              ]
            },
            {
              "id": "1.3",
              "label": "Taskbar",
              "itemRenderer": "Panel",
              "itemType": "child",
              "tags": [
                {
                  "compName": "SIMS.Components.Common.TaskBar",
                  "type": "default"
                }
              ],
              "rendererProperties": {
                "collapsable": true,
                "optionalItems": true
              },
              "items": [
                {
                  "id": "1.3.1",
                  "label": "Taskbar Preview Image",
                  "desc": {
                    "basic": "Upload taskbar preview image.",
                    "detailed": ""
                  },
                  "itemRenderer": "Dropzone",
                  "itemType": "leaf",
                  "rendererProperties": {
                    "dataType": "img",
                    "placeHolder": "Drop image here to upload"
                  },
                  "mandatory": false,
                  "modelReference": "View1.TaskbarPreviewImage"
                }
              ]
            },
            {
              "id": "1.4",
              "label": "Add Component(s)",
              "itemRenderer": "Button",
              "itemType": "leaf",
              "rendererProperties": {
                "click": {}
              }
            }
          ]
        },
        {
          "id": "2",
          "label": "Skill Specific Inputs",
          "itemType": "root",
          "desc": {},
          "items": [
            {
              "id": "2.1",
              "label": "Workbook",
              "itemRenderer": "Panel",
              "itemType": "child",
              "tags": [
                {
                  "compName": "SIMS.Components.Excel.JSONGrid",
                  "type": "default"
                }
              ],
              "rendererProperties": {
                "collapsable": true,
                "optionalItems": false
              },
              "items": [
                {
                  "id": "2.1.1",
                  "label": "Sheet in Action",
                  "desc": {
                    "basic": "Name of the sheet in which the move cell content skill is to be performed.",
                    "detailed": ""
                  },
                  "itemRenderer": "Dropdown",
                  "itemType": "leaf",
                  "mandatory": true,
                  "rendererProperties": {
                    "itemList": ["Inventory", "Donations", "Cost"]
                  },
                  "dependents": [
                    {
                      "id": "3.1.2",
                      "rule": ""
                    }
                  ],
                  "modelReference": "View2.SheetInAction"
                },
                {
                  "id": "2.1.2",
                  "label": "Source Range",
                  "desc": {
                    "basic": "Cell range containing the data to be moved.",
                    "detailed": ""
                  },
                  "itemRenderer": "TextBox",
                  "itemType": "leaf",
                  "mandatory": true,
                  "rendererProperties": {
                    "dataType": "string"
                  },
                  "modelReference": "View2.SourceRange"
                },
                {
                  "id": "2.1.3",
                  "label": "Destination Range",
                  "desc": {
                    "basic": "Cell Range where the data is to be placed.",
                    "detailed": ""
                  },
                  "itemRenderer": "TextBox",
                  "itemType": "leaf",
                  "mandatory": true,
                  "modelReference": "View2.DestinationRange"
                }
              ]
            }
          ]
        },
        {
          "id": "3",
          "label": "Final Document Settings",
          "itemType": "root",
          "desc": {},
          "items": [
            {
              "id": "3.1",
              "label": "Workbook",
              "itemRenderer": "Panel",
              "itemType": "child",
              "tags": [
                {
                  "compName": "SIMS.Components.Excel.JSONGrid",
                  "type": "default"
                }
              ],
              "rendererProperties": {
                "collapsable": true,
                "optionalItems": false
              },
              "items": [
                {
                  "id": "3.1.1",
                  "label": "Workbook Data",
                  "desc": {
                    "basic": "Upload JSON file containing the changes made in the worksheet after moving the cell range.",
                    "detailed": ""
                  },
                  "itemRenderer": "Dropzone",
                  "itemType": "leaf",
                  "rendererProperties": {
                    "dataType": "JSON",
                    "placeHolder": "Drop JSON file here to upload"
                  },
                  "mandatory": true,
                  "modelReference": "View3.WorkbookData"
                },
                {
                  "id": "3.1.2",
                  "label": "Worksheet Images",
                  "desc": {
                    "basic": "Upload the images containing the changes made in the worksheet after moving the cell range.",
                    "detailed": ""
                  },
                  "itemRenderer": "TabGroup",
                  "itemType": "child",
                  "disabled": true,
                  "rendererProperties": {
                    "layout": "horizontal"
                  },
                  "items": [
                    {
                      "id": "3.1.2.1",
                      "label": "Sheet 1",
                      "itemRenderer": "TabPage",
                      "itemType": "",
                      "items": [
                        {
                          "id": "GridImage",
                          "itemRenderer": "Dropzone",
                          "itemType": "leaf",
                          "rendererProperties": {
                            "placeHolder": "Drop Grid Image",
                            "dataType": "img"
                          },
                          "pos": "x,y",
                          "dim": "h,w",
                          "modelReference": "View3.GridImage"
                        },
                        {
                          "id": "RowImage",
                          "itemRenderer": "Dropzone",
                          "itemType": "leaf",
                          "rendererProperties": {
                            "placeHolder": "Drop Row Image",
                            "dataType": "img"
                          },
                          "pos": "x,y",
                          "dim": "h,w",
                          "modelReference": "View3.RowImage"
                        },
                        {
                          "id": "ColumnImage",
                          "itemRenderer": "Dropzone",
                          "itemType": "leaf",
                          "rendererProperties": {
                            "placeHolder": "Drop Column Image",
                            "dataType": "img"
                          },
                          "pos": "x,y",
                          "dim": "h,w",
                          "modelReference": "View3.ColumnImage"
                        },
                        {
                          "id": "CellImage",
                          "itemRenderer": "Dropzone",
                          "itemType": "leaf",
                          "rendererProperties": {
                            "placeHolder": "Drop Cell Image",
                            "dataType": "img"
                          },
                          "pos": "x,y",
                          "dim": "h,w",
                          "modelReference": "View3.CellImage"
                        }
                      ]
                    }
                  ]
                }
              ]
            }
          ]
        }
      ]
    }
    var self = this;
    setTimeout(function () {
      console.log(self.uiConfig);
    }, 5000);
  }

}
