import { Component, Input } from '@angular/core';
import { BaseComponent } from '../base.component';
import { LabelTypes } from '../enums';

@Component({
  selector: 'app-label',
  templateUrl: './label.component.html',
  styleUrls: ['./label.component.scss']
})
export class LabelComponent extends BaseComponent {
  text: string;
  type: string;
  constructor() {
    super();
    this.type = LabelTypes.ELEMENT_HEADING;
  }

  ngOnInit() {
    super.ngOnInit();
    this.text = this.compConfig.rendererProperties.text;
    this.type = this.compConfig.rendererProperties.type;
  }
}
