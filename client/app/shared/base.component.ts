import { itemSchema } from './UIConfig.model';
import { Input } from '@angular/core';
import { BuilderModelObj } from '../step-builder/shared/builder-model.service';

export class BaseComponent {
    @Input() compConfig: itemSchema;
    @Input() modelRef = {};
    builderModelSrvc;
    dynamicMode: boolean = false;

    constructor() {
        this.compConfig = new itemSchema();
        this.builderModelSrvc = BuilderModelObj;
    }

    setData(inputConfig, modelRef?){
        this.compConfig = inputConfig;
        if(modelRef){
            this.modelRef = modelRef;
        }
    }

    checkForReference(pathStr){
        return pathStr && (pathStr.indexOf("{{")!=-1);
    }
}