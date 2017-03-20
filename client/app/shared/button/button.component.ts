import { Component } from '@angular/core';
import { BaseComponent } from '../base.component';
import { itemSchema } from '../UIConfig.model';


@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent extends BaseComponent {
  type: string;

  ngOnInit() {
    super.ngOnInit();
    this.type = this.compConfig.rendererProperties.type || 'default';
  }

}
