import { Component } from '@angular/core';
import { BaseComponent } from '../base.component';
import { itemSchema } from '../UIConfig.model';
import { LabelTypes } from '../enums';

@Component({
  selector: 'app-radio',
  templateUrl: './radio.component.html',
  styleUrls: ['./radio.component.scss']
})
export class RadioComponent extends BaseComponent {

 labelConfig: itemSchema = new itemSchema();
  itemList: Object;

  ngOnInit() {
    super.ngOnInit();
    this.UpdateView();
  }

  UpdateView() {
    this.labelConfig.rendererProperties.text = this.compConfig.label;
    this.labelConfig.rendererProperties.type = LabelTypes.ELEMENT_HEADING;
    this.updateDescription();
    this.itemList = this.compConfig.items;
    this.modelRef = this.builderModelSrvc.getModelRef(this.compConfig.val);
  }

  selectedItemChange(value) {
    this.modelRef["value"] = value;
    this.updateDependencies(value);
  }
}
