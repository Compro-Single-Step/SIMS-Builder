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
  descriptionConfig: itemSchema = new itemSchema();
  itemList: Array<string>;

  ngOnInit() {
    super.ngOnInit();
    this.labelConfig.rendererProperties.text = this.compConfig.label;
    this.labelConfig.rendererProperties.type = 0;

    this.descriptionConfig.rendererProperties.text = this.compConfig.desc['basic'];
    this.descriptionConfig.rendererProperties.type = 2;

    //TODO: Bind the data present in the data model at the reference mentioned in the val node of the ui config.
    this.itemList = [];
  }
}
