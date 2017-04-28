import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../base.component';
import { itemSchema } from '../UIConfig.model';
import { LabelTypes } from '../enums';

@Component({
  selector: 'app-radio',
  templateUrl: './radio.component.html',
  styleUrls: ['./radio.component.scss']
})
export class RadioComponent extends BaseComponent implements OnInit {
 labelConfig: itemSchema = new itemSchema();
 itemList: Array<Object>;

 ngOnInit() {
    super.ngOnInit();
    this.UpdateView();
  }
  UpdateView() {
    this.labelConfig.rendererProperties.text = this.compConfig.label;
    this.labelConfig.rendererProperties.type = LabelTypes.ELEMENT_HEADING;
    this.updateDescription();
    this.itemList = this.compConfig.rendererProperties.itemList;
    this.modelRef = this.builderModelSrvc.getModelRef(this.compConfig.val); 
  }
  selectedItemChange(selectedOption){
    this.modelRef["value"] = selectedOption;
  }
}
