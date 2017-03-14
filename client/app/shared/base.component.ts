import { itemSchema } from './UIConfig.model';
import { Input } from '@angular/core';

export class BaseComponent {
    @Input() compConfig: itemSchema;

    constructor() {
        this.compConfig = new itemSchema();
    }

    setData(inputConfig){
        this.compConfig = inputConfig;
    }

    getVariableRef(varString){
        return eval(varString);
    }
}