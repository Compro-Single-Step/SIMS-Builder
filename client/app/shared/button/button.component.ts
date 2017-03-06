import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../base.component';
import { itemSchema } from '../UIConfig.model';


@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent extends BaseComponent implements OnInit {
  type: string;

  ngOnInit() {
    this.type = this.compConfig.rendererProperties.type || 'default';
  }

}
