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

  ngOnInit() {
    super.ngOnInit();
    this.UpdateView();
  }

  UpdateView() {
    this.labelConfig.rendererProperties.text = this.compConfig.label;
    this.labelConfig.rendererProperties.type = LabelTypes.ELEMENT_HEADING;
    this.itemList = this.compConfig.items;
    this.modelRef = this.builderModelSrvc.getStateRef(this.compConfig.val);
  }

  selectedItemChange() {
    this.updateDependencies(this.modelRef["value"]);
    this.emitEvents(this.modelRef["value"]);
  }
}
