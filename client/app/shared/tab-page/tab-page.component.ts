import { Component, ViewContainerRef, Injector, ViewChild, Input } from '@angular/core';
import { ContainerComponent } from '../container.component';
import { InputFactoryService } from '../input-factory.service';

@Component({
  selector: 'app-tab-page',
  templateUrl: './tab-page.component.html',
  styleUrls: ['./tab-page.component.scss']
})

export class TabPageComponent extends ContainerComponent {
  @ViewChild('wrapper', { read: ViewContainerRef }) wrapperContainer;
  private factoryRef: InputFactoryService;
  constructor(vcref: ViewContainerRef, injector: Injector) {
    super();
    this.factoryRef = injector.get(InputFactoryService);
  }

  AddChildElements(factoryRef, containerRef, itemArray) {
    if (this.modelRef) {
      for (let item of itemArray) {
        let childModelRef = this.modelRef[item.relVal];
        factoryRef.createComp(containerRef, item, childModelRef);
      }
    }
    else {
      super.AddChildElements(factoryRef, containerRef, itemArray);
    }
  }

  ngOnInit() {
    super.ngOnInit();
    this.AddChildElements(this.factoryRef, this.wrapperContainer, this.compConfig.items);
  }
}
