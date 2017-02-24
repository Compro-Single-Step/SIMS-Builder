import { Injectable, ViewContainerRef, ReflectiveInjector, ComponentFactoryResolver, ComponentRef } from '@angular/core';
import { TextBoxComponentComponent } from './text-box-component/text-box-component.component';

@Injectable()
export class InputFactoryService {

  constructor(private componentFactoryResolver: ComponentFactoryResolver) { }

  public createComp (vCref: ViewContainerRef, modelInput){
     let factory = this.componentFactoryResolver.resolveComponentFactory(TextBoxComponentComponent);
    
    // vCref is needed cause of that injector..
    let injector = ReflectiveInjector.fromResolvedProviders([], vCref.parentInjector);
    
    // create component without adding it directly to the DOM
    let comp = factory.create(injector);
    
    // add inputs first !! otherwise component/template crashes ..
    comp.instance.data = modelInput;
    console.log("ak91: inside service" + modelInput);
    
    // all inputs set? add it to the DOM ..
    vCref.insert(comp.hostView);
    comp.changeDetectorRef.detectChanges();
    return comp;
  }

}
