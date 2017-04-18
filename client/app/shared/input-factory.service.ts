import { Injectable, ViewContainerRef, ReflectiveInjector, ComponentFactoryResolver, ComponentRef } from '@angular/core';
import { TextBoxComponent } from './text-box/text-box.component';
import { PanelComponent } from './panel/panel.component';
import { SelectComponent } from './select/select.component';
import { TabComponent } from './tab/tab.component';
import { ButtonComponent } from './button/button.component';
import { DropzoneComponent } from './dropzone/dropzone.component';
import { SwitchComponent }from './switch/switch.component';


@Injectable()
export class InputFactoryService {

  constructor(private componentFactoryResolver: ComponentFactoryResolver) { }

  public createComp(vcref: ViewContainerRef, itemConfig, modelRef?) {

    /**
     * [resolveComponentFactory - Get the factory object to create the component]
     * @param  [Component Class Name]
     * @return {[ComponentFactory]}
     */
    let component = this.componentFactoryResolver.resolveComponentFactory(this.DynamicCompMap(itemConfig.itemRenderer));

    // ReflectiveInjector: A ReflectiveDependency injection container used for instantiating objects and resolving dependencies.
    // Creates an injector from previously resolved providers..
    // vcref is needed cause of that injector..
    let injector = ReflectiveInjector.fromResolvedProviders([], vcref.parentInjector);

    // create component without adding it directly to the DOM
    // Creates a new component and returns the ComponentRef
    let comp = component.create(injector);

    // add Data to the instance of the Component.
    if (modelRef) {
      comp.instance["setData"](itemConfig, modelRef);
    }
    else {
      comp.instance["setData"](itemConfig);
    }

    // add the newly created component to the DOM ..
    vcref.insert(comp.hostView);

    // Run the Lifecycle hooks of the newly added Component
    comp.changeDetectorRef.detectChanges();
    return comp;
  }

  // Map that Maps itemRenderer property with the Component CLass
  //TODO: Error handling.
  private DynamicCompMap(type) {
    return {
      "Panel": PanelComponent,
      "TextBox": TextBoxComponent,
      "Dropdown": SelectComponent,
      "TabGroup": TabComponent,
      "Button": ButtonComponent,
      "Dropzone": DropzoneComponent,
      "Switch": SwitchComponent
    }[type];
  }
}
