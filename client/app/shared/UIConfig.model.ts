export class itemSchema {
  id?: string;
  label?: string;
  itemType?: string;
  tags?: Array<Object>;
  desc?: Object;
  disabled?: boolean;
  pos?: string;
  dim?: string;
  mandatory?: boolean;
  dependants?: Array<Object>;
  items?: Array<itemSchema>;
  itemRenderer?: string;
  rendererProperties?: any;
  val?: string;

  constructor() {
    this.id = "";
    this.label = "";
    this.itemType = "";
    this.tags = [{}];
    this.desc = {};
    this.disabled = false;
    this.pos = "";
    this.dim = "";
    this.mandatory = true;
    this.dependants = [{}];
    this.items = [];
    this.itemRenderer = "";
    this.rendererProperties = {};
    this.val = "";
  }
}

export class UIConfig {
  views: Array<itemSchema>
  constructor() {
    this.views = [];
  }
}


export var itemDataModel = {
  "views": {
    "1": {
      "documentTitle": {
        "value": "ashish"
      },
      "documentData": {
        "name": "",
        "path": ""
      },
      "sheets": [
        {
          "name": "",
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
      ],
      "taskbarPreviewImage": {
        "name": "",
        "path": ""
      }
    },
    "2": {
      "sheetInAction": [],
      "sourceRange": "",
      "destinationRange": ""
    },
    "3": {
      "workbookData": {
        "name": "",
        "path": ""
      },
      "sheets": [
        {
          "name": "",
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
        }
      ]
    }
  }
};

setTimeout(function () {
  console.log("ak91: " + JSON.stringify(itemDataModel));
}, 5000);