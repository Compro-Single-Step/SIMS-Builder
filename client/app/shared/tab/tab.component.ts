import { Component } from '@angular/core';
import { BaseComponent } from '../base.component';
import { itemSchema } from '../UIConfig.model';
import { LabelTypes } from '../enums';

@Component({
  selector: 'app-tab',
  templateUrl: './tab.component.html',
  styleUrls: ['./tab.component.scss']
})
export class TabComponent extends BaseComponent {
  labelConfig: itemSchema = new itemSchema();
  descriptionConfig: itemSchema = new itemSchema();
  tabs: Array<Object> = [];

  ngOnInit() {
    super.ngOnInit();
    this.UpdateView();
  }

  UpdateView() {
    if (this.compConfig.rendererProperties.dynamicMode === true) {
      this.dynamicMode = true;
      this.tabs = this.builderModelSrvc.getModelRef(this.compConfig.rendererProperties.itemListRef);
    }

    this.labelConfig.rendererProperties.text = this.compConfig.label;
    this.labelConfig.rendererProperties.type = LabelTypes.ElementHeading;

    this.updateDescription();
  }
}
