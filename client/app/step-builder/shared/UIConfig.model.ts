import { TextBox } from './text-box-component/text-box.model';

export class node{
  id?: string;  
  label?: string;
  itemType?: string;
  tags?: Array<Object>;
  desc?: Object;
  disabled?: string;
  pos?: string;
  dim?: string;
  mandatory?: string;
  dependents?: Array<Object>;
  items?: Array<Object>;
  itemRenderer?: string;
  rendererProperties?: Object;
  modelReference?: string;

  constructor(){
    this.id = "";
    this.label = "";
    this.itemType = "";
    this.tags = [{}];
    this.desc = {};
    this.disabled = "";
    this.pos = "";
    this.dim = "";
    this.mandatory = "";
    this.dependents = [{}];
    this.items = [{}];
    this.itemRenderer = "";
    this.rendererProperties = {};
    this.modelReference = "";
  }
}

export class UIConfig {
  views: Array<node>
  constructor(){
    this.views =  [new node()];
  }
}