import { Component, Input } from '@angular/core';
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
  ngOnInit() {
    super.ngOnInit();
    this.modelRef = this.builderModelSrvc.getModelRef(this.compConfig.val);
    this.UpdateView();
  }

  UpdateView() {
    this.labelConfig.rendererProperties.text = this.compConfig.label;
    this.labelConfig.rendererProperties.type = LabelTypes.ELEMENT_HEADING;
    if(this.modelRef["show"] != undefined) {
      this.isVisible = this.modelRef;
    }
    this.updateDescription();
  }
}
