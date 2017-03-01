import { Injectable, ViewContainerRef, ReflectiveInjector, ComponentFactoryResolver, ComponentRef } from '@angular/core';
import { TextBoxComponent } from './text-box-component/text-box.component';
import { GroupComponent } from './group/group.component';
import { SelectComponent } from './select/select.component';
import { TabComponent } from './tab/tab.component';
import { ButtonComponent } from './button/button.component';


@Injectable()
export class InputFactoryService {

  constructor(private componentFactoryResolver: ComponentFactoryResolver) { }

  public createComp (vCref: ViewContainerRef, modelInput){
     let factory = this.componentFactoryResolver.resolveComponentFactory(this.DynamicCompMap(modelInput.itemRenderer));

    // vCref is needed cause of that injector..
    let injector = ReflectiveInjector.fromResolvedProviders([], vCref.parentInjector);

    // create component without adding it directly to the DOM
    let comp = factory.create(injector);

    // add inputs first !! otherwise component/template crashes ..
    comp.instance["data"] = modelInput;
    console.log("ak91: inside service" + modelInput);
    console.log(modelInput);

    // all inputs set? add it to the DOM ..
    vCref.insert(comp.hostView);
    comp.changeDetectorRef.detectChanges();
    return comp;
  }

  private DynamicCompMap(type){
    return {
      "Panel": GroupComponent,
      "TextBox": TextBoxComponent,
      "Dropdown": SelectComponent,
      "TabGroup": TabComponent,
      "Button": ButtonComponent
    }[type] || TextBoxComponent;
  }
}
