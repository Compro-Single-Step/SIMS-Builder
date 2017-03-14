import { Component, OnInit, Input } from '@angular/core';
import { BaseComponent } from '../base.component';
import { itemSchema } from '../UIConfig.model';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss']
})
export class SelectComponent extends BaseComponent implements OnInit {
  labelConfig: itemSchema = new itemSchema();
  itemList: Array<string>;

  ngOnInit() {
    this.labelConfig.rendererProperties.text = this.compConfig.label;
    this.labelConfig.rendererProperties.type = 'ElementHeading';
    //TODO: need to bind the data present in the data model at the reference mentioned in the val node of the ui config.
    this.itemList = [];
  }
}
