import { Component, OnInit, Input } from '@angular/core';
import { BaseComponent } from '../base.component';
import { node } from '../UIConfig.model';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss']
})
export class SelectComponent extends BaseComponent implements OnInit {
  labelConfig: node = new node();

  ngOnInit() {
    this.labelConfig.rendererProperties.text = this.compConfig.label;
    this.labelConfig.rendererProperties.type = 'ElementHeading';
  }
}
