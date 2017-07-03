class ValidationSrvc {

  validationObject: Object;
  validationMap: Object;

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
  }

  getValidationErrorsObj(key) {
    if (!this.validationObject["validationErrors"][key])
      this.validationObject["validationErrors"][key] = {};
    return this.validationObject["validationErrors"][key];
  }

  clearValidationErrorsObj(key) {
    this.validationObject["validationErrors"][key] = {};
  }

  getValidationParams() {
    return this.validationObject["validationParams"];
  }

  //Used to instantiate the validation object by reading UIConfig
  setValidationErrorsUsingUIConfig(uiconfig) {
    let tempObj = {};
    for (let key in this.validationMap) {
      if ((uiconfig[key] === undefined && this.validationMap[key]["default"]) || (uiconfig[key] !== undefined && uiconfig[key].toString().toLowerCase() === "true"))
        tempObj[key] = false;
    }
    return tempObj;
  }

  //Used to Verify validation errors of all the components of a view
  validateView(viewErrorObj) {
    for (let key in viewErrorObj) {
      if (viewErrorObj[key]["errorsCount"] > 0)
        return false;
    }
    return true;
  }

  //Used to update validations on change of component
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
  }

  //To show errors when the view is changes
  validateViewAndShowErrors(viewErrorObj) {
    let validationParams = this.getValidationParams();
    if (viewErrorObj["isViewValid"])
      return (validationParams["showValidationErrors"] = false);
    else
      return (validationParams["showValidationErrors"] = true);
  }

  //To delete validation Error Object of a component
  deleteValidationErroObj(errorObject, parentViewRef) {
    for (var key in parentViewRef) {
      if (parentViewRef[key] === errorObject)
        delete parentViewRef[key];
    }
  }

  //Disable Validation of a component when its disabled
  disableValidation(errorObject, parentViewRef){
    errorObject.errorsCount = 0;
    parentViewRef["isViewValid"] = this.validateView(parentViewRef);
  }

  //Enable Validation of a component when it changes its state from disabled
  enableValidation(errorObject, parentViewRef){
    let errors = errorObject['errors'];
    for (let key in errors) {
      if (errors[key]){
        errorObject.errorsCount++;
        parentViewRef["isViewValid"] = false;
      }
    }
  }

  _isEmpty(value) {
    return value === "" || value === undefined || value === null;
  }
}

export let ValidationService = new ValidationSrvc();
