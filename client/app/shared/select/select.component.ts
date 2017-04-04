import { Component, Input } from '@angular/core';
import { BaseComponent } from '../base.component';
import { itemSchema } from '../UIConfig.model';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss']
})
export class SelectComponent extends BaseComponent {
  labelConfig: itemSchema = new itemSchema();
  itemList: Object;
  selectedItem;

  ngOnInit() {
    super.ngOnInit();
    this.UpdateView();
  }

  UpdateView() {
    this.labelConfig.rendererProperties.text = this.compConfig.label;
    this.labelConfig.rendererProperties.type = 0;
    if (this.compConfig.rendererProperties.itemListRef) {
      this.itemList = this.builderModelSrvc.getModelRef(this.compConfig.rendererProperties.itemListRef);
    }
    else {
      this.itemList["value"] = this.compConfig.rendererProperties.itemList;
    }
  }

  selectedItemChange($event) {
    this.updateDependencies($event);
  }
}
