import { itemSchema } from './UIConfig.model';
import { Input, OnInit } from '@angular/core';
import { BuilderModelObj } from '../step-builder/shared/builder-model.service';
import { skillManager } from '../step-builder/shared/skill-manager.service';
import { LabelTypes } from './enums';
export class BaseComponent implements OnInit{
    @Input() compConfig: itemSchema;
    @Input() modelRef: Object;
    builderModelSrvc;
    dynamicMode: boolean = false;
    descriptionConfig: itemSchema = new itemSchema();
    constructor() {
        this.compConfig = new itemSchema();
        this.builderModelSrvc = BuilderModelObj;
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
        var dependants = this.compConfig.dependants || [];
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

    updateDescription() {
        this.descriptionConfig.rendererProperties.text = this.compConfig.desc['basic'];
        this.descriptionConfig.rendererProperties.type = LabelTypes.DESCRIPTION;
    }
}