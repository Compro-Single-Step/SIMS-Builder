import { Component, OnInit, ViewContainerRef, Injector, ViewChild, Input } from '@angular/core';
import { ContainerComponent } from '../element-container.component';
import { InputFactoryService } from '../input-factory.service';

@Component({
  selector: 'app-wrapper',
  templateUrl: './wrapper.component.html',
  styleUrls: ['./wrapper.component.scss']
})
export class TabPageComponent extends ContainerComponent implements OnInit {
  @ViewChild('wrapper', { read: ViewContainerRef }) wrapperContainer;
  private factoryRef: InputFactoryService;
  constructor(vcref: ViewContainerRef, injector: Injector) {
    super();
    this.factoryRef = injector.get(InputFactoryService);
  }

  AddChildElements(factoryRef, containerRef, itemArray) {
    if (this.dynamicMode == true) {
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
    this.AddChildElements(this.factoryRef, this.wrapperContainer, this.compConfig.items);
  }
}
