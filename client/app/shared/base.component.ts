import { itemSchema } from './UIConfig.model';
import { Input, OnInit } from '@angular/core';

export class BaseComponent implements OnInit{
    @Input() compConfig: itemSchema;

    constructor() {
        this.compConfig = new itemSchema();
    }

    ngOnInit(){   
    }

    setData(inputConfig){
        this.compConfig = inputConfig;
    }

    getVariableRef(varString){
        return eval(varString);
    }
}