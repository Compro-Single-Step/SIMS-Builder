import { Component, OnInit, Input } from '@angular/core';
import { BaseComponent } from '../base.component';
import { itemSchema, itemDataModel } from '../UIConfig.model';

@Component({
  selector: 'app-text-box-component',
  templateUrl: './text-box.component.html',
  styleUrls: ['./text-box.component.scss']
})
export class TextBoxComponent extends BaseComponent implements OnInit {
  labelConfig: itemSchema = new itemSchema();

  ngOnInit() {
    this.modelRef = this.builderModelSrvc.getModelRef(this.compConfig.val);
    this.UpdateView();
  }

  UpdateView() {
    this.labelConfig.rendererProperties.text = this.compConfig.label;
    this.labelConfig.rendererProperties.type = 'ElementHeading';
  }
}
