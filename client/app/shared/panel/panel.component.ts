import { Component, OnInit, ElementRef, Input, ViewContainerRef, ViewChild, Injector } from '@angular/core';
import { BaseComponent } from '../base.component';
import { InputFactoryService } from '../input-factory.service';
import { itemSchema } from '../UIConfig.model';
declare var jQuery: any;

@Component({
  selector: 'app-panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.scss']
})
export class PanelComponent extends BaseComponent implements OnInit {
  @ViewChild('inputElementsContainer', { read: ViewContainerRef }) inputElementsContainer;
  $el: any;
  labelConfig: itemSchema = new itemSchema();
  private factoryRef: InputFactoryService;

  constructor(el: ElementRef, vcref: ViewContainerRef, injector: Injector) {
    super();
    this.factoryRef = injector.get(InputFactoryService);
    this.$el = jQuery(el.nativeElement);
    jQuery.fn.widgster.Constructor.DEFAULTS.bodySelector = '.widget-body';
  }

  ngOnInit() {
    this.labelConfig.rendererProperties.text = this.compConfig.label;
    this.labelConfig.rendererProperties.type = 'PanelHeading';
    this.$el.find('.widget').widgster();
    for (let item of this.compConfig.items) {
      this.factoryRef.createComp(this.inputElementsContainer, item);
    }
  }
}
