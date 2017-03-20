import { Component, Input } from '@angular/core';
import { BaseComponent } from '../base.component';
import { itemSchema, itemDataModel } from '../UIConfig.model';

@Component({
  selector: 'app-text-box-component',
  templateUrl: './text-box.component.html',
  styleUrls: ['./text-box.component.scss']
})
export class TextBoxComponent extends BaseComponent {
  labelConfig: itemSchema = new itemSchema();
  itemDataModel;
  modelRef;

  ngOnInit() {
    super.ngOnInit();
    this.itemDataModel = itemDataModel;
    if (this.compConfig.val) {
      this.modelRef = this.getVariableRef("this.itemDataModel." + this.compConfig.val);
    }
    this.labelConfig.rendererProperties.text = this.compConfig.label;
    this.labelConfig.rendererProperties.type = 'ElementHeading';
  }
}
