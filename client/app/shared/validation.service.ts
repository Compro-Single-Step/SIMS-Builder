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
      "mandatory": this._isEmpty,
    };
  }

  getValidationErrorsObj(key){
    if(!this.validationObject["validationErrors"][key])
      this.validationObject["validationErrors"][key] = {};
    return this.validationObject["validationErrors"][key];
  }

  clearValidationErrorsObj(key){
    this.validationObject["validationErrors"][key] = {};
  }

  getValidationParams(){
    return this.validationObject["validationParams"];
  }

  //Used to instantiate the validation object by reading UIConfig
  setValidationErrorsUsingUIConfig(uiconfig){
    let tempObj = {};
    for(let key in this.validationMap){
      if(uiconfig[key] && uiconfig[key].toString().toLowerCase() === "true")
        tempObj[key] = true;
    }
    return tempObj;
  }

  //Used to Verify validation errors of all the components of a view
  validateView(viewErrorObj){
    for(let key in viewErrorObj){
      let errorsObj = viewErrorObj[key]["errors"];
      for(let error in errorsObj){
        if(errorsObj[error])
          return false;
      }
    }
    return true;
  }

  //Used to update validations on change of component
  validateComponent(errorObject, parentViewRef, value){
    errorObject.errorsCount = 0;
    let errors = errorObject['errors'];
    for(let key in errors){
      errors[key] = this.validationMap[key](value);
      if(errors[key])
        errorObject.errorsCount++;
    }

    if(errorObject.errorsCount)
      parentViewRef["isViewValid"] = false;
    else
      parentViewRef["isViewValid"] = this.validateView(parentViewRef);
  }

  //To show errors when the view is changes
  validateViewAndShowErrors(viewErrorObj){
    let validationParams = this.getValidationParams();
    if(viewErrorObj["isViewValid"])
      return (validationParams["showValidationErrors"] = false);
    else
      return (validationParams["showValidationErrors"] = true);
  }

  _isEmpty(value){
    return value === "" || value === undefined || value === null;
  }
}

export let ValidationService = new ValidationSrvc();
