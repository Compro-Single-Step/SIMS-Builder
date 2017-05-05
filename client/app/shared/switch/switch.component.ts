import { Component } from '@angular/core';
import { BaseComponent } from '../base.component';
import { itemSchema } from '../UIConfig.model';
import { LabelTypes } from '../enums';

@Component({
  selector: 'app-switch',
  templateUrl: './switch.component.html',
  styleUrls: ['./switch.component.scss']
})
export class SwitchComponent extends BaseComponent {

 labelConfig: itemSchema = new itemSchema();
  itemList: Object;
  layout_mode;
  valueOptions;

  ngOnInit() {
    super.ngOnInit();
    this.UpdateView();
  }

  UpdateView() {
    this.labelConfig.rendererProperties.text = this.compConfig.label;
    this.labelConfig.rendererProperties.type = LabelTypes.ELEMENT_HEADING;
    this.itemList = this.compConfig.items;
    this.modelRef = this.builderModelSrvc.getStateRef(this.compConfig.val);
    this.layout_mode = LayoutModes[this.compConfig.rendererProperties.layout_mode]
    this.valueOptions = this.getValueOptions(ValueOptionType[this.compConfig.rendererProperties.value_type]);
  }

  selectedItemChange() {
    this.emitEvents(this.modelRef["value"]);
  }

  getValueOptions (value_type) {
    let options = {};
    options[ValueOptionType.BOOLEAN] = ["True", "False"];
    options[ValueOptionType.QUESTION] = ["Yes", "No"];
    options[ValueOptionType.SWITCH] = ["On", "Off"];
    return options[ValueOptionType[value_type]];
  }
}
enum LayoutModes {
  RIGHT = <any>"right",
  BELOW = <any>"below"
}
enum ValueOptionType {
  BOOLEAN = <any>"boolean",
  QUESTION = <any>"question",
  SWITCH = <any>"switch"
}

