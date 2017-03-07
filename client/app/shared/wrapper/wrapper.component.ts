import { Component, OnInit, ViewContainerRef, Injector, ViewChild } from '@angular/core';
import { BaseComponent } from '../base.component';
import { InputFactoryService } from '../input-factory.service';

@Component({
  selector: 'app-wrapper',
  templateUrl: './wrapper.component.html',
  styleUrls: ['./wrapper.component.scss']
})
export class WrapperComponent extends BaseComponent implements OnInit {
  @ViewChild('wrapper', { read: ViewContainerRef }) wrapperContainer;
  private factoryRef: InputFactoryService;
  constructor(vcref: ViewContainerRef, injector: Injector) {
    super();
    this.factoryRef = injector.get(InputFactoryService);
  }

  ngOnInit() {
    for (let item of this.compConfig.items) {
      this.factoryRef.createComp(this.wrapperContainer, item);
    }
  }

}
