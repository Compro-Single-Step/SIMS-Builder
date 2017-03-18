import { Injectable } from '@angular/core';
import { BuilderModelObj } from '../shared/builder-model.service'

@Injectable()
export class SkillManagerService {
  itemDataModel = BuilderModelObj.getModel();
  constructor() { }

  getSheetNameAndSheetCountFromInitDocJSON(initDocJSON, modelReference) {

    //Extract Array of the Dependant Sheets
    var dependantSheetArrayInModel = this.getNestedObject(this.itemDataModel, modelReference);
    //Add The Required Number of Sheets in Model
    if (initDocJSON.sheetCount >= dependantSheetArrayInModel.length) {
      let sheetCountDiff = initDocJSON.sheetCount - dependantSheetArrayInModel.length;
      while (sheetCountDiff > 0) {
        dependantSheetArrayInModel.push(JSON.parse(JSON.stringify(dependantSheetArrayInModel[(dependantSheetArrayInModel.length - 1)])));
        sheetCountDiff--;
      }
    }

    //Add Sheet Names From Init Doc JSON
    for (let sheetNum = 0; sheetNum < initDocJSON.sheetCount; sheetNum++) {
      dependantSheetArrayInModel[sheetNum].name = initDocJSON.sheets[sheetNum].name;
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

  addSheetNamesToDropdown(initDocJSON, modelReference) {
    //Extract the Array of Sheets in 'Sheet in Action' Dropdown
    var dependantSheetArrayInModel = this.getNestedObject(this.itemDataModel, modelReference);

    //Add Sheet Names to Array From Init Doc JSON
    for (let sheetNum = 0; sheetNum < initDocJSON.sheetCount; sheetNum++) {
      dependantSheetArrayInModel.push(initDocJSON.sheets[sheetNum].name);
    }
  }

}