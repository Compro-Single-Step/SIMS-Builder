import { Component, ViewContainerRef, Injector, ViewChild } from '@angular/core';
import { ContainerComponent } from '../container.component';
import { InputFactoryService } from '../input-factory.service';

@Component({
  selector: 'app-wrapper',
  templateUrl: './wrapper.component.html',
  styleUrls: ['./wrapper.component.scss']
})
export class WrapperComponent extends ContainerComponent {
  @ViewChild('wrapper', { read: ViewContainerRef }) wrapperContainer;
  private factoryRef: InputFactoryService;
  constructor(vcref: ViewContainerRef, injector: Injector) {
    super();
    this.factoryRef = injector.get(InputFactoryService);
  }

  ngOnInit() {
    super.ngOnInit();
    this.AddChildElements(this.factoryRef, this.wrapperContainer, this.compConfig.items);
  }
}
