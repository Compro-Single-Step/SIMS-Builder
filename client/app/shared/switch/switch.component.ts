import { Component } from '@angular/core';
import { BaseComponent } from '../base.component';
import { itemSchema } from '../UIConfig.model';
import { LabelTypes, SwitchLayoutModes, SwitchValueOptionType } from '../enums';

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
    this.layout_mode = SwitchLayoutModes[this.compConfig.rendererProperties.layout_mode]
    this.valueOptions = this.getValueOption(SwitchValueOptionType[this.compConfig.rendererProperties.value_type]);
  }

  selectedItemChange() {
    this.emitEvents(this.modelRef["value"]);
  }

  getValueOption (value_type) {
    return {
      "BOOLEAN": ["True", "False"],
      "QUESTION": ["Yes", "No"],
      "SWITCH": ["On", "Off"]
    }[value_type];
  }
}
