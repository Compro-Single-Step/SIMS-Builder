import { BaseComponent } from './base.component';
import { InputFactoryService } from './input-factory.service';

export class ContainerComponent extends BaseComponent {
    AddChildElements(factoryRef, containerRef, itemArray, viewNumber) {        
        for (let item of itemArray) {
            factoryRef.createComp(containerRef, item, viewNumber);
        }
    }
}