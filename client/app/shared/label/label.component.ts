import { Component, OnInit, Input } from '@angular/core';
import { BaseComponent } from '../base.component';

@Component({
  selector: 'app-label',
  templateUrl: './label.component.html',
  styleUrls: ['./label.component.scss']
})
export class LabelComponent extends BaseComponent implements OnInit {
  text: string;
  type: string = 'ElementHeading';

  ngOnInit() {
    this.text = this.compConfig.rendererProperties.text;
    this.type = this.compConfig.rendererProperties.type;
  }
}
