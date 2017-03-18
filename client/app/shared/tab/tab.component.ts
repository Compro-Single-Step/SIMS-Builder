import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../base.component';
import { itemSchema } from '../UIConfig.model';

@Component({
  selector: 'app-tab',
  templateUrl: './tab.component.html',
  styleUrls: ['./tab.component.scss']
})
export class TabComponent extends BaseComponent implements OnInit {
  labelConfig: itemSchema = new itemSchema();
  tabs: Array<Object> = [];

  ngOnInit() {
    if(this.compConfig.rendererProperties.dynamicMode === true){
      this.dynamicMode = true;
      this.tabs = this.builderModelSrvc.getModelRef(this.compConfig.rendererProperties.itemListRef);
    }

    this.labelConfig.rendererProperties.text = this.compConfig.label;
    this.labelConfig.rendererProperties.type = 'ElementHeading';
  }
}
