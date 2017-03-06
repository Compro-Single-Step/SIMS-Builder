import { Component, OnInit, Input } from '@angular/core';
import { BaseComponent } from '../base.component';
import { node } from '../UIConfig.model';

@Component({
  selector: 'app-text-box-component',
  templateUrl: './text-box.component.html',
  styleUrls: ['./text-box.component.css']
})
export class TextBoxComponent extends BaseComponent implements OnInit {
  labelConfig: node = new node();

  ngOnInit() {
    this.labelConfig.rendererProperties.text = this.compConfig.label;
    this.labelConfig.rendererProperties.type = 'ElementHeading';
  }
}
