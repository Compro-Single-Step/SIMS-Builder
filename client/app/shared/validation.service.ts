import { EventEmitter } from '@angular/core';

class ValidationSrvc {

  validationObject: Object;
  validationMap: Object;
  updateStatus: EventEmitter<string>;
  constructor() {
    this.validationObject = {
      "validationErrors": {},
      "validationParams": {
        "showValidationErrors": false
      }
    };
    this.validationMap = {
      "mandatory": {
        "func": this._isEmpty,
        "default": true
      }
    };
    this.updateStatus = new EventEmitter<string>()
  }

  //To fetch the validation object
  getValidationErrorsObj(key) {
    if (!this.validationObject["validationErrors"][key])
      this.validationObject["validationErrors"][key] = {};
    return this.validationObject["validationErrors"][key];
  }

  //To clear the validation object (used when the component is destroyed)
  clearValidationErrorsObj(key) {
    this.validationObject["validationErrors"][key] = {};
  }

  //To fetch global validation parameters
  getValidationParams() {
    return this.validationObject["validationParams"];
  }

  //To instantiate the validation object by reading UIConfig
  setValidationErrorsUsingUIConfig(uiconfig) {
    let tempObj = {};
    for (let key in this.validationMap) {
      if ((uiconfig[key] === undefined && this.validationMap[key]["default"]) || (uiconfig[key] !== undefined && uiconfig[key].toString().toLowerCase() === "true"))
        tempObj[key] = false;
    }
    return tempObj;
  }

  //To Verify validation errors of all the components of a view
  validateView(viewErrorObj) {
    for (let key in viewErrorObj) {
      if (viewErrorObj[key]["errorsCount"] > 0)
        return false;
    }
    return true;
  }

  //To update validations on change of a component
  validateComponent(errorObject, parentViewRef, value) {
    errorObject.errorsCount = 0;
    let errors = errorObject['errors'];
    for (let key in errors) {
      errors[key] = this.validationMap[key]["func"](value);
      if (errors[key])
        errorObject.errorsCount++;
    }

    if (errorObject.errorsCount)
      parentViewRef["isViewValid"] = false;
    else
      parentViewRef["isViewValid"] = this.validateView(parentViewRef);

    if (!parentViewRef["status"] || parentViewRef["status"] === "active")
      this.setStatus();
  }

  //Emits an event which is sebscribed the 'step-builder' to update the status
  //of all the views.
  setStatus() {
    this.updateStatus.emit("");
  }

  //To show errors when the view is changed
  validateViewAndShowErrors(viewValidationObj, finalViewValidationObj?) {
    let validationParams = this.getValidationParams();
    if (finalViewValidationObj) {
      if (finalViewValidationObj["status"] !== "disable") {
        viewValidationObj["status"] = viewValidationObj["isViewValid"] ? "enable" : "incomplete";
        finalViewValidationObj && (finalViewValidationObj["status"] = "active");
        return (validationParams["showValidationErrors"] = false);
      }
    }
    else if (viewValidationObj["isViewValid"])
      return (validationParams["showValidationErrors"] = false);
    return (validationParams["showValidationErrors"] = true);


  }

  //To delete validation Error Object of a component - Currently used by Dropzone
  deleteValidationErroObj(errorObject, parentViewRef) {
    for (var key in parentViewRef) {
      if (parentViewRef[key] === errorObject)
        delete parentViewRef[key];
    }
  }

  //Disable Validation of a component when its disabled
  disableValidation(errorObject, parentViewRef) {
    errorObject.errorsCount = 0;
    parentViewRef["isViewValid"] = this.validateView(parentViewRef);
  }

  //Enable Validation of a component when it changes its state from disabled
  enableValidation(errorObject, parentViewRef) {
    errorObject.errorsCount = 0;
    let errors = errorObject['errors'];
    for (let key in errors) {
      if (errors[key]) {
        errorObject.errorsCount++;
        parentViewRef["isViewValid"] = false;
      }
    }
  }

  //Functions corresponding to the validation keys like 'mandatory'
  _isEmpty(value) {
    return value === "" || value === undefined || value === null;
  }
}

export let ValidationService = new ValidationSrvc();
