export class itemSchema{
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
  modelReference?: string;
  val?: string;

  constructor(){
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
    this.items = [{}];
    this.itemRenderer = "";
    this.rendererProperties = {};
    this.modelReference = "";
    this.val = "";
  }
}

export class UIConfig {
  views: Array<itemSchema>
  constructor(){
    this.views =  [];
  }
}
