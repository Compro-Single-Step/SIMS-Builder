import { Component, Input } from '@angular/core';
import { BaseComponent } from '../base.component';
enum labelType {
  ElementHeading = 0,
  PanelHeading = 1,
  Description = 2
}
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
    this.type = labelType[0];
  }

  ngOnInit() {
    super.ngOnInit();
    this.text = this.compConfig.rendererProperties.text;
    this.type = labelType[this.compConfig.rendererProperties.type];
  }
}
