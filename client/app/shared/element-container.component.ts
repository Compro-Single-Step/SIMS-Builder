import { BaseComponent } from './base.component';
import { InputFactoryService } from './input-factory.service';

export class ElementContainerComponent extends BaseComponent {
    AddChildElements(factoryRef, containerRef, itemArray) {        
        for (let item of itemArray) {
            factoryRef.createComp(containerRef, item);
        }
    }
}