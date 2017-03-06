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
  dependents?: Array<Object>;
  items?: Array<itemSchema>;
  itemRenderer?: string;
  rendererProperties?: any;
  modelReference?: string;

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
    this.dependents = [{}];
    this.items = [{}];
    this.itemRenderer = "";
    this.rendererProperties = {};
    this.modelReference = "";
  }
}

export class UIConfig {
  views: Array<itemSchema>
  constructor(){
    this.views =  [];
  }
}
