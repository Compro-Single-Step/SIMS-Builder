import { Component, OnInit, ElementRef, ViewContainerRef, ViewChild, Injector } from '@angular/core';
import { ContainerComponent } from '../element-container.component';
import { InputFactoryService } from '../input-factory.service';
import { itemSchema } from '../UIConfig.model';
declare var jQuery: any;

@Component({
  selector: 'app-panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.scss']
})
export class PanelComponent extends ContainerComponent implements OnInit {
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
    this.UpdateView();
    this.AddChildElements(this.factoryRef, this.inputElementsContainer, this.compConfig.items);
  }

  UpdateView() {
    this.labelConfig.rendererProperties.text = this.compConfig.label;
    this.labelConfig.rendererProperties.type = 'PanelHeading';
    this.$el.find('.widget').widgster();
  }
}
