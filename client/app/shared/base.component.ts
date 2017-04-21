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
        this.attachSubscribers();
    }

    ngOnDestroy() {
        this.detachSubscribers();
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
        var dependants = this.compConfig.dependants || [];
        for (let i = 0; i < dependants.length; i++) {
            let dependantModelReference = dependants[i]['modelReference'];
            let dependantRule = dependants[i]['rule'];
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
        let eventArray = this.compConfig["emitEvent"];
        if (eventArray && eventArray.length > 0) {
            for (let eventIndex = 0; eventIndex < eventArray.length; eventIndex++) {
                this.registerEvent(eventArray[eventIndex]);
            }
        }
    }

    attachSubscribers() {
        let dependants = this.compConfig.dependants;
        if (dependants && dependants.length > 0) {
            for (let dependantIndex = 0; dependantIndex < dependants.length; dependantIndex++) {
                let subscriptionId = this.attachSubscriber(dependants[dependantIndex]["eventId"], this.eventCallback.bind(this));
                this.subscriptions.push(subscriptionId);
            }
        }
    }

    eventCallback(callbackData) {
        this.updateDependencies(callbackData);
        this.emitEvents(this.getEventPayload());
    }

    detachSubscribers() {
        for (let subscriptionIndex = 0; subscriptionIndex < this.subscriptions.length; subscriptionIndex++) {
            this.detachSubscriber(this.subscriptions[subscriptionIndex]);
        }
    }

    getEventPayload() {
        return null;
    }

    emitEvents(payload) {
        let events = this.compConfig.emitEvent;
        if (events && events.length > 0) {
            for (let eventIndex = 0; eventIndex < events.length; eventIndex++) {
                this.emitEvent(events[eventIndex], payload);
            }
        }
    }

    registerEvent(eventId) {
        this.eventSrvc["registerEvent"](eventId);
    }

    attachSubscriber(eventId, func) {
        return this.eventSrvc["attachSubscriber"](eventId, func);
    }

    detachSubscriber(subscriptionId) {
        this.eventSrvc["detachSubscriber"](subscriptionId);
    }

    emitEvent(eventId, data) {
        this.eventSrvc["emitEvent"](eventId, data);
    }
}