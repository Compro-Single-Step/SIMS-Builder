import { Injectable } from '@angular/core';

@Injectable()
export class SkillManagerService {
  stepData: any;
  constructor() {
    this.stepData = { "views": { "1": { "documentTitle": "", "documentData": { "name": "", "path": "" }, "sheets": [{ "name": "", "path": "", "gridImage": { "name": "img.png" }, "rowImage": { "name": "" }, "columnImage": { "name": "" }, "cellImage": { "name": "" } }], "taskbarPreviewImage": { "name": "", "path": "" } }, "2": { "sheetInAction": "", "sourceRange": "", "destinationRange": "" }, "3": { "workbookData": { "name": "", "path": "" }, "sheets": [{ "name": "", "path": "", "gridImage": { "name": "" }, "rowImage": { "name": "" }, "columnImage": { "name": "" }, "cellImage": { "name": "" } }] } } };
  }

  getSheetNameAndSheetCountFromInitDocJSON(initDocJSON, modelReference) {

    var mRArr = modelReference.split('.');
    var dependantSheetArrayInModel = [];

    //Extract Array of the Dependant Sheets
    for (let nestingLevel = 0; nestingLevel < mRArr.length; nestingLevel++) {
      if (dependantSheetArrayInModel.length === 0) {
        dependantSheetArrayInModel = this.stepData[mRArr[nestingLevel]];
      }
      else {
        dependantSheetArrayInModel = dependantSheetArrayInModel[mRArr[nestingLevel]];
      }
    }

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
    console.log('Updated - Model : ',this.stepData);
  }

  addSheetNamesToDropdown(initDocJSON, modelReference){
    console.log('addSheetNamesToDropdown Function');
  }

}
