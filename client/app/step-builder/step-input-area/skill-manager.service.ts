import { Injectable } from '@angular/core';

@Injectable()
export class SkillManagerService {
  stepData: any;
  constructor() {
    //Temporary Variable To Store Model Reference - To be replaced with Obtained Model Reference
    this.stepData = { "views": { "1": { "documentTitle": "", "documentData": { "name": "", "path": "" }, "sheets": [{ "name": "", "path": "", "gridImage": { "name": "img.png" }, "rowImage": { "name": "" }, "columnImage": { "name": "" }, "cellImage": { "name": "" } }], "taskbarPreviewImage": { "name": "", "path": "" } }, "2": { "sheetInAction": [], "sourceRange": "", "destinationRange": "" }, "3": { "workbookData": { "name": "", "path": "" }, "sheets": [{ "name": "", "path": "", "gridImage": { "name": "" }, "rowImage": { "name": "" }, "columnImage": { "name": "" }, "cellImage": { "name": "" } }] } } };
  }

  getSheetNameAndSheetCountFromInitDocJSON(initDocJSON, modelReference) {

    //Extract Array of the Dependant Sheets
    var dependantSheetArrayInModel = this.getNestedObject(this.stepData, modelReference);
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
    console.log('Model Updated with Dependency 1: ', this.stepData);
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
    var dependantSheetArrayInModel = this.getNestedObject(this.stepData, modelReference);

    //Add Sheet Names to Array From Init Doc JSON
    for (let sheetNum = 0; sheetNum < initDocJSON.sheetCount; sheetNum++) {
      dependantSheetArrayInModel.push(initDocJSON.sheets[sheetNum].name);
    }

    console.log('Model Updated with Dependency 2: ', this.stepData);
  }

}