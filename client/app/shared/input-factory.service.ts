import { Injectable, ViewContainerRef, ReflectiveInjector, ComponentFactoryResolver, ComponentRef } from '@angular/core';
import { ComponentRepositoryService } from './component-repository.service';

@Injectable()
export class InputFactoryService {

  constructor(private componentFactoryResolver: ComponentFactoryResolver, private compRepoSrvc: ComponentRepositoryService) { }

  public createComp(vcref: ViewContainerRef, itemConfig, viewNumber, modelRef?) {

    /**
     * [resolveComponentFactory - Get the factory object to create the component]
     * @param  [Component Class Name]
     * @return {[ComponentFactory]}
     */
    let component = this.componentFactoryResolver.resolveComponentFactory(this.compRepoSrvc.getDynamicCompClass(itemConfig.itemRenderer));

    // ReflectiveInjector: A ReflectiveDependency injection container used for instantiating objects and resolving dependencies.
    // Creates an injector from previously resolved providers..
    // vcref is needed cause of that injector..
    let injector = ReflectiveInjector.fromResolvedProviders([], vcref.parentInjector);

    // create component without adding it directly to the DOM
    // Creates a new component and returns the ComponentRef
    let comp = component.create(injector);

    // add Data to the instance of the Component.
    if (modelRef) {
      comp.instance["setData"](itemConfig, viewNumber, modelRef);
    }
    else {
      comp.instance["setData"](itemConfig, viewNumber);
    }

    // add the newly created component to the DOM ..
    vcref.insert(comp.hostView);

    // Run the Lifecycle hooks of the newly added Component
    comp.changeDetectorRef.detectChanges();
    return comp;
  }
}
