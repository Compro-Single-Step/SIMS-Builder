import { Component } from '@angular/core';
import { BaseComponent } from '../base.component';
import { itemSchema } from '../UIConfig.model';
import { LabelTypes } from '../enums';

@Component({
  selector: 'app-text-box-component',
  templateUrl: './text-box.component.html',
  styleUrls: ['./text-box.component.scss']
})
export class TextBoxComponent extends BaseComponent {
  labelConfig: itemSchema = new itemSchema();
  descriptionConfig: itemSchema = new itemSchema();
  currModelRef: Object;
  ngOnInit() {
    super.ngOnInit();
    this.currModelRef = this.getData();
    this.UpdateView();
  }

  UpdateView() {
    this.labelConfig.rendererProperties.text = this.compConfig.label;
    this.labelConfig.rendererProperties.type = LabelTypes.ELEMENT_HEADING;

    this.updateDescription();
  }

  getData() {
    return this.modelRef ? this.modelRef : this.builderModelSrvc.getStateRef(this.compConfig.val);
  }
}
