import { Component, OnInit, ElementRef, Input, ViewContainerRef, ViewChild, Injector } from '@angular/core';
import { BaseComponent } from '../base.component';
import { InputFactoryService } from '../input-factory.service';
import { node } from '../UIConfig.model';
declare var jQuery: any;

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.scss']
})
export class GroupComponent extends BaseComponent implements OnInit {
  @ViewChild('inputElementsContainer', { read: ViewContainerRef }) inputElementsContainer;
  $el: any;
  labelConfig: node = new node();
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
