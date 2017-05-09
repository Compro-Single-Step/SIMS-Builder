import { itemSchema } from './UIConfig.model';
import { Input, OnInit, OnDestroy } from '@angular/core';
import { BuilderModelObj } from '../step-builder/shared/builder-model.service';
import { skillManager } from '../step-builder/shared/skill-manager.service';
import { EventService } from '../step-builder/shared/event.service';
import { LabelTypes } from './enums';

export class BaseComponent implements OnInit, OnDestroy {
    @Input() compConfig: itemSchema;
    @Input() modelRef: Object;
    builderModelSrvc;
    dynamicMode: boolean = false;
    descriptionConfig: itemSchema = new itemSchema();
    eventSrvc: Object;
    subscriptions: Array<Object>;
    constructor() {
        this.compConfig = new itemSchema();
        this.builderModelSrvc = BuilderModelObj;
        this.eventSrvc = EventService;
        this.subscriptions = [];
    }
    ngOnInit() {
        this.registerEvents();
        this.subscribeEvents();
        this.updateModel();
    }

    updateModel() {      
        if(this.compConfig.rendererProperties && this.compConfig.rendererProperties.updateModel)
        {
            let updateModels = this.compConfig.rendererProperties.updateModel || [];
            for (let i = 0; i < updateModels.length; i++) {
                let dependantModelReference = updateModels[i]['modelReference'];
                let dependantRule = updateModels[i]['rule'];
                let dependentObjectInModel = this.builderModelSrvc.getStateRef(dependantModelReference);
                skillManager.skillTranslator[dependantRule](dependentObjectInModel);
            }
        }
    }

    ngOnDestroy() {
        this.unsubscribeEvents();
    }

    setData(inputConfig, modelRef?) {
        this.compConfig = inputConfig;
        if (modelRef) {
            this.modelRef = modelRef;
        }
    }

    checkForReference(pathStr) {
        return pathStr && (pathStr.indexOf("{{") != -1);
    }

    updateDependencies(componentInput) {
        var subscribeEvents = this.compConfig.subscribeEvents || [];
        for (let i = 0; i < subscribeEvents.length; i++) {
            let dependantModelReference = subscribeEvents[i]['modelReference'];
            let dependantRule = subscribeEvents[i]['rule'];
            let dependentObjectInModel = this.builderModelSrvc.getStateRef(dependantModelReference);
            let clonedDependentObjectInModel = this.builderModelSrvc.getDefaultState(dependantModelReference);
            this.invokeSkillManager(dependantRule, componentInput, dependentObjectInModel, clonedDependentObjectInModel);
        }
    }

    invokeSkillManager(dependantRule, componentInput, dependentObjectInModel, clonedDependentObjectInModel) {
        skillManager.skillTranslator[dependantRule](componentInput, dependentObjectInModel, clonedDependentObjectInModel);
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

    registerEvents() {
        let eventArray = this.compConfig["emitEvents"];
        if (eventArray && eventArray.length > 0) {
            for (let eventIndex = 0; eventIndex < eventArray.length; eventIndex++) {
                this.registerEvent(eventArray[eventIndex]);
            }
        }
    }

    subscribeEvents() {
        let subscribeEvents = this.compConfig.subscribeEvents;
        if (subscribeEvents && subscribeEvents.length > 0) {
            for (let eventIndex = 0; eventIndex < subscribeEvents.length; eventIndex++) {
                let subscriptionId = this.subscribeEvent(subscribeEvents[eventIndex]["eventId"], this.eventCallback.bind(this));
                this.subscriptions.push(subscriptionId);
            }
        }
    }

    eventCallback(callbackData) {
        this.updateDependencies(callbackData);
        this.emitEvents(this.getEventPayload());
    }

    unsubscribeEvents() {
        for (let subscriptionIndex = 0; subscriptionIndex < this.subscriptions.length; subscriptionIndex++) {
            this.unsubscribeEvent(this.subscriptions[subscriptionIndex]);
        }
    }

    getEventPayload() {
        return null;
    }

    emitEvents(payload) {
        let events = this.compConfig.emitEvents;
        if (events && events.length > 0) {
            for (let eventIndex = 0; eventIndex < events.length; eventIndex++) {
                this.emitEvent(events[eventIndex], payload);
            }
        }
    }

    registerEvent(eventId) {
        this.eventSrvc["registerEvent"](eventId);
    }

    subscribeEvent(eventId, func) {
        return this.eventSrvc["subscribeEvent"](eventId, func);
    }

    unsubscribeEvent(subscriptionId) {
        this.eventSrvc["unsubscribeEvent"](subscriptionId);
    }

    emitEvent(eventId, data) {
        this.eventSrvc["emitEvent"](eventId, data);
    }
    isDisabled() {
        if(this.compConfig.rendererProperties && this.compConfig.rendererProperties.disabled === true) {
            return true;
        }
        return this.modelRef["disabled"];
    }
}