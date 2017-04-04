import { itemSchema } from './UIConfig.model';
import { Input, OnInit } from '@angular/core';
import { BuilderModelObj } from '../step-builder/shared/builder-model.service';
import { skillManager } from '../step-builder/shared/skill-manager.service';

export class BaseComponent implements OnInit{
    @Input() compConfig: itemSchema;
    @Input() modelRef = {};
    builderModelSrvc;
    itemDataModel;
    dynamicMode: boolean = false;

    constructor() {
        this.compConfig = new itemSchema();
        this.builderModelSrvc = BuilderModelObj;
        this.itemDataModel = this.builderModelSrvc.getModel();
    }

    ngOnInit(){   
    }

    setData(inputConfig, modelRef?) {
        this.compConfig = inputConfig;
        if (modelRef) {
            this.modelRef = modelRef;
        }
    }

    checkForReference(pathStr){
        return pathStr && (pathStr.indexOf("{{")!=-1);
    }

    updateDependencies(componentInput) {
        var dependants = this.compConfig.dependants;
        for (let i = 0; i < dependants.length; i++) {
            let dependantModelReference = dependants[i]['modelReference'];
            let dependantRule = dependants[i]['rule'];
            let dependentObjectInModel = this.builderModelSrvc.getModelRef(dependantModelReference);
            skillManager.skillTranslator[dependantRule](componentInput, dependentObjectInModel);
        }
    }

    getNestedObject(inputObject, propertyAccessorPath) {
        var accessedObject = inputObject;
        var propertyAccessorPathArray = propertyAccessorPath.split('.');
        for (let nestingLevel = 0; nestingLevel < propertyAccessorPathArray.length; nestingLevel++) {
            accessedObject = accessedObject[propertyAccessorPathArray[nestingLevel]];
        }
        return accessedObject;
    }
}