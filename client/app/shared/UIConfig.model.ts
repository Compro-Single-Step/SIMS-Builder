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
  dependants?: Array<Object>;
  items?: Array<itemSchema>;
  itemRenderer?: string;
  rendererProperties?: any;
  style?: Object;
  val?: string;

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
    this.dependants = [{}];
    this.items = [];
    this.itemRenderer = "";
    this.rendererProperties = {};
    this.val = "";
    this.style = {};
  }
}

export class UIConfig {
  views: Array<itemSchema>
  constructor() {
    this.views = [];
  }
}
