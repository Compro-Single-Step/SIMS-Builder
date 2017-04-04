import { Component, Input } from '@angular/core';
import { BaseComponent } from '../base.component';
import { itemSchema } from '../UIConfig.model';
import { LabelTypes } from '../enums';


@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss']
})
export class SelectComponent extends BaseComponent {
  labelConfig: itemSchema = new itemSchema();
  itemList: Object;
  selectedItem: Object;

  ngOnInit() {
    super.ngOnInit();
    this.UpdateView();
  }

  UpdateView() {
    this.labelConfig.rendererProperties.text = this.compConfig.label;
    this.labelConfig.rendererProperties.type = LabelTypes.ELEMENT_HEADING;
    this.updateDescription();
    if (this.compConfig.rendererProperties.itemListRef) {
      this.itemList = this.builderModelSrvc.getModelRef(this.compConfig.rendererProperties.itemListRef);
    }
    else {
      this.itemList["value"] = this.compConfig.rendererProperties.itemList;
    }
    this.selectedItem = this.builderModelSrvc.getModelRef(this.compConfig.val); 
  }

  selectedItemChange() {
    this.updateDependencies(this.selectedItem["value"]);
  }
}
