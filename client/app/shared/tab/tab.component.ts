import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../base.component';
import { node } from '../UIConfig.model';

@Component({
  selector: 'app-tab',
  templateUrl: './tab.component.html',
  styleUrls: ['./tab.component.scss']
})
export class TabComponent extends BaseComponent implements OnInit {
  labelConfig: node = new node();

  ngOnInit() {
    this.labelConfig.rendererProperties.text = this.compConfig.label;
    this.labelConfig.rendererProperties.type = 'ElementHeading';
  }
}
