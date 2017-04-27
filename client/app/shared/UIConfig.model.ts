export class itemSchema {
  id?: string;
  label?: string;
  itemType?: string;
  tags?: Array<Object>;
  desc?: Object;
  disabled?: boolean;
  pos?: string;
  dim?: Object;
  mandatory?: boolean;
  subscribeEvents?: Array<Object>;
  items?: Array<itemSchema>;
  itemRenderer?: string;
  rendererProperties?: any;
  style?: Object;
  val?: string;
  relVal?: string;
  emitEvents?: Array<string>;
  itemList: Array<Object>;
  constructor() {
    this.id = "";
    this.label = "";
    this.itemType = "";
    this.tags = [{}];
    this.desc = {};
    this.disabled = false;
    this.pos = "";
    this.dim = {};
    this.mandatory = true;
    this.subscribeEvents = [];
    this.items = [];
    this.itemRenderer = "";
    this.rendererProperties = {};
    this.val = "";
    this.style = {};
    this.relVal = "";
    this.emitEvents = [];
    this.itemList = [{}];
  }
}

export class UIConfig {
  views: Array<itemSchema>
  constructor() {
    this.views = [];
  }
}
