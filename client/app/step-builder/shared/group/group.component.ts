import { Component, OnInit, ElementRef, Input, ViewContainerRef, ViewChild, Injector } from '@angular/core';
import { InputFactoryService } from '../input-factory.service';
import { node } from '../UIConfig.model';
declare var jQuery: any;
@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.scss']
})
export class GroupComponent implements OnInit {
  @Input() data: node;
  @ViewChild('inputElementsContainer', {read: ViewContainerRef}) inputElementsContainer;
  $el: any;
  private factoryRef: InputFactoryService;
  constructor(el: ElementRef, vcref: ViewContainerRef, injector: Injector) {
   this.factoryRef = injector.get(InputFactoryService);
   this.$el = jQuery(el.nativeElement);
   jQuery.fn.widgster.Constructor.DEFAULTS.bodySelector = '.widget-body';
  }

  ngOnInit() {
   this.$el.find('.widget').widgster();
  }
}
