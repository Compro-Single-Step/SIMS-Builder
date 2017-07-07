import { itemSchema } from './UIConfig.model';
import { Input, OnInit, OnDestroy } from '@angular/core';
import { BuilderModelObj } from '../step-builder/shared/builder-model.service';
import { skillManager } from '../step-builder/shared/skill-manager.service';
import { EventService } from '../step-builder/shared/event.service';
import { LabelTypes } from './enums';
import { ValidationService } from './validation.service';

export class BaseComponent implements OnInit, OnDestroy {
    @Input() compConfig: itemSchema;
    @Input() modelRef: Object;
    builderModelSrvc;
    dynamicMode: boolean = false;
    descriptionConfig: itemSchema = new itemSchema();
    eventSrvc: Object;
    subscriptions: Array<Object>;
    validationErrors: Object;
    parentViewValidationRef: Object;
    validationParams: Object;
    validationService;

    constructor() {
        this.compConfig = new itemSchema();
        this.builderModelSrvc = BuilderModelObj;
        this.validationService = ValidationService;
        this.eventSrvc = EventService;
        this.subscriptions = [];

        //Used to show errors on change of view
        this.validationParams = ValidationService.getValidationParams();
    }
    ngOnInit() {
        this.registerEvents();
        this.subscribeEvents();
        this.updateModel();
        this.addValidations();
    }

    //function to call a skill specific function to update model from an external file while it is being painted.
    updateModel() {
        if (this.compConfig.rendererProperties && this.compConfig.rendererProperties.updateModel) {
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
        this.deleteValidationErroObj();
    }

    setData(inputConfig, validationErrors, modelRef?) {
        this.compConfig = inputConfig;
        this.parentViewValidationRef = validationErrors;
        if (modelRef) {
            this.modelRef = modelRef;
        }
    }

    checkForReference(pathStr) {
        return pathStr && (pathStr.indexOf("{{") != -1);
    }

    updateDependencies(eventId, componentInput) {
        var subscribeEvents = this.compConfig.subscribeEvents || [];
        for (let i = 0; i < subscribeEvents.length; i++) {
            if (subscribeEvents[i]['eventId'] === eventId) {
                let dependantModelReference = subscribeEvents[i]['modelReference'];
                let dependantRule = subscribeEvents[i]['rule'];
                let dependentObjectInModel = this.builderModelSrvc.getStateRef(dependantModelReference);
                let clonedDependentObjectInModel = this.builderModelSrvc.getDefaultState(dependantModelReference);
                this.invokeSkillManager(dependantRule, componentInput, dependentObjectInModel, clonedDependentObjectInModel);
            }
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

    eventCallback({ eventId, payload: callbackData }) {
        this.updateDependencies(eventId, callbackData);
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
        //TODO - Optimize it so that error checking is not done on every life cycle detection
        if ((this.compConfig.rendererProperties && this.compConfig.rendererProperties.disabled === true) || (this.modelRef["disabled"] !== undefined && this.modelRef["disabled"].toString().toLowerCase() === "true")) {
            this.validationErrors && this.validationService.disableValidation(this.validationErrors, this.parentViewValidationRef);
            return true;
        }
        this.validationErrors && this.validationService.enableValidation(this.validationErrors, this.parentViewValidationRef);
        return false;
    }

    addValidations() {
        // parentViewValidationRef is set for the Components that are created dynamically,
        // unlike label component. Validations are required only for such components.
        if (this.parentViewValidationRef) {
            let tempErrorObj = this.validationService.setValidationErrorsUsingUIConfig(this.compConfig);
            if (Object.keys(tempErrorObj).length !== 0) {
                this.validationErrors = (this.parentViewValidationRef[this.uniqueId() + "_" + this.compConfig.itemRenderer] = { "errors": tempErrorObj, "errorsCount": -1 });
            }
        }
    }

    validateComp(ComponentValue) {
        // validationErrors: The error object of corresponding Component
        // parentViewValidationRef: The error object of corresponding group (view)
        if (this.validationErrors)
            this.validationService.validateComponent(this.validationErrors, this.parentViewValidationRef, ComponentValue);
    }

    deleteValidationErroObj() {
        if (this.validationErrors)
            this.validationService.deleteValidationErroObj(this.validationErrors, this.parentViewValidationRef);
    }

    uniqueId() {
        // desired length of Id
        var idStrLen = 25;
        // add a timestamp in milliseconds (base 36 again) as the base
        var idStr = (new Date()).getTime().toString();
        // similar to above, complete the Id using random, alphanumeric characters
        do {
            idStr += (Math.floor((Math.random() * 35))).toString(36);
        } while (idStr.length < idStrLen);

        return (idStr);
    }
}
