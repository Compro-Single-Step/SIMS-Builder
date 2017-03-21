import { Component, Input } from '@angular/core';
import { BaseComponent } from '../base.component';

@Component({
  selector: 'app-label',
  templateUrl: './label.component.html',
  styleUrls: ['./label.component.scss']
})
export class LabelComponent extends BaseComponent {
  text: string;
  type: string = 'ElementHeading';

  ngOnInit() {
    super.ngOnInit();
    this.text = this.compConfig.rendererProperties.text;
    this.type = this.compConfig.rendererProperties.type;
  }
}
