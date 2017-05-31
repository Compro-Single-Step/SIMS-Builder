const ExcelBaseSkill = require("../common/xlSkill");

module.exports = class maxFunction extends ExcelBaseSkill {

  init(data) {
    var initDocJSonPath = data.stepUIState.views["1"].documentData.path;
    var skilldata = { "initDocJSonPath": initDocJSonPath, "dbMgr": data.dbFilestoreMgr };
    return super.init(skilldata);
  }

  //init DOC JSON 
  createJsonPath(skillParams) {

    var taskParams = skillParams.taskParams;
    var paramValueObj = skillParams.paramsObj;


    return taskParams.dbFilestoreMgr.copyTaskAssetFile(paramValueObj["docData"], taskParams)
      .then(function (resolveParam) {
        paramValueObj["docData"] = resolveParam.filePath;
        var preloadResArr = [];
        preloadResArr.push({ "path": "" + resolveParam.filePath, "type": "" + resolveParam.fileType })
        resolveParam = { "attrValue": paramValueObj["docData"], "preloadResArr": preloadResArr }
        return Promise.resolve(resolveParam);
      }, function (error) {
        return Promise.reject(error);
        console.log("rejection at the movecellcontent");
      }).catch(function (error) {
        return Promise.reject(error);
      });

  }

  /* getCellFormulaPermutations
  @Inputs 
  cellContainingFormula: B23
  sheetInAction: 1
  formulaCellRangeReference: F5:F11

  @Output 
  {"sheetNo":1,"cellID":"B23","formula":"=MAX(F5:F11)"}
  {"sheetNo":1,"cellID":"B23","formula":"=MAXA(F5:F11)"}
  {"sheetNo":1,"cellID":"B23","formula":"=MAX((F5):(F11))"}
  {"sheetNo":1,"cellID":"B23","formula":"=MAXA((F5):(F11))"}
  {"sheetNo":1,"cellID":"B23","formula":"=MAXA"}
  {"sheetNo":1,"cellID":"B23","formula":"=MAX"}

*/
  getCellFormulas(skillParams) {
    let { taskParams, paramsObj } = skillParams;
    let cellFormulas = [];
    let cellRange = (paramsObj.formulaCellRangeReference).toUpperCase().split(':');
    let [startCell, endCell] = cellRange;
    let sheetNumber = this.getSheetNumber(paramsObj.sheetInAction);
    let variations = [
      `=MAX(${startCell}:${endCell})`,
      `=MAXA(${startCell}:${endCell})`,
      `=MAX((${startCell}):(${endCell}))`,
      `=MAXA((${startCell}):(${endCell}))`,
      `=MAXA`,
      `=MAX`
    ];
    variations.forEach((value) => {
      cellFormulas.push(JSON.stringify(
        { "sheetNo": sheetNumber, "cellID": paramsObj.cellContainingFormula, "formula": value }
        ));
    });

    let resolveParams = { "attrValue": cellFormulas };
    return Promise.resolve(resolveParams);
  }

  getNumberCellsWithTilde(skillParams) {
    let { taskParams, paramsObj } = skillParams;
    let resolveParams;
    if(paramsObj.prefilledSelection === true) {
      let cellRange = (paramsObj.formulaCellRangeReference).toUpperCase();
      resolveParams = { "attrValue": `${cellRange}~` };
    } else {
      resolveParams = { "attrValue": "" }
    }
    
    return Promise.resolve(resolveParams);
  }
  getNumberCells(skillParams) {
    let { taskParams, paramsObj } = skillParams;
    let [startCell, endCell] = (paramsObj.formulaCellRangeReference).toUpperCase().split(":");
    let startSplitter = startCell.search(/\d/);
    let endSplitter = endCell.search(/\d/);
    let firstCol = startCell.substr(0,startSplitter);
    let firstRow = parseInt(startCell.substr(startSplitter));
    let secondCol = endCell.substr(0,endSplitter);
    let secondRow = parseInt(endCell.substr(endSplitter));
    let range = [];
    if (firstCol === secondCol) {
      for (let i = firstRow; i <= secondRow; i++) {
        range.push(`${firstCol}${i}`);
      }
    } else if (firstRow === secondRow) {
      for (let i = firstCol; i <= secondCol; i++) {
        range.push(`${i}${firstRow}`);
      }
    }
    let variations = [
      `(${startCell}:${endCell})`,
      `(${startCell}):(${endCell})`,
      `((${startCell}):(${endCell}))`,
      range.toString(),
      range.toString().replace(/,/g, '~'),
      range.sort().toString().replace(/,/g, '~')
    ];
    let resolveParams = { "attrValue": variations };
    return Promise.resolve(resolveParams);
  }

getMAXCellText(skillParams) {
  let { taskParams, paramsObj } = skillParams;
  let sheetNumber = this.getSheetNumber(paramsObj.sheetInAction);
  let cellText = { "sheetNo": sheetNumber, "cellID": paramsObj.cellContainingFormula.toUpperCase(), "formula": `MAX(F5:F11)` };
  let resolveParams = { "attrValue": JSON.stringify(cellText) };
  return Promise.resolve(resolveParams);
}

getMAXACellText(skillParams) {
  let { taskParams, paramsObj } = skillParams;
  let sheetNumber = this.getSheetNumber(paramsObj.sheetInAction);
  let cellText = { "sheetNo": sheetNumber, "cellID": paramsObj.cellContainingFormula.toUpperCase(), "formula": `MAXA(F5:F11)` };
  let resolveParams = { "attrValue": JSON.stringify(cellText) };
  return Promise.resolve(resolveParams);
}
getCellValues(skillParams) {
  let { taskParams, paramsObj } = skillParams;
  let resolveParams;
  if(paramsObj.prefilledSelection === true) {
    let cellValues = paramsObj.cellValues.replace(/,/g, ';');
    resolveParams = { "attrValue": `&#123;${cellValues}&#125;~`};  
  } else {
    resolveParams = { "attrValue": ""};  
  }
  return Promise.resolve(resolveParams);
}
getFormulaResult(skillParams) {
  let { taskParams, paramsObj } = skillParams;
  let resolveParams;
  if(paramsObj.prefilledSelection === true) {
    resolveParams = { "attrValue": paramsObj.formulaResult};  
  } else {
    resolveParams = { "attrValue": ""};
  }
  return Promise.resolve(resolveParams);  
}
getEditCellText(skillParams) {
  let { taskParams, paramsObj } = skillParams;
  let editCellTextValue = {
    "typingText": `=MAX(${paramsObj.formulaCellRangeReference.toUpperCase()})`,
    "selectionStart": 5,
    "selectionEnd": paramsObj.formulaCellRangeReference.length + 5
  };
  let resolveParams = { "attrValue": JSON.stringify(editCellTextValue)};

  return Promise.resolve(resolveParams);
}
 getSheetDetails(initDocJSON, dependantSheetArrayInModel, clonedDependantSheetArrayInModel) {
    while (dependantSheetArrayInModel.length > 0) {
      dependantSheetArrayInModel.pop(); //https://jsperf.com/array-clear-methods/3
    }

    if (initDocJSON === null || initDocJSON === undefined) { //initDocJSON Removed
      dependantSheetArrayInModel.push(clonedDependantSheetArrayInModel[0]);
    }
    else {  //initDocJSON Added

      //Add Sheet Names From Init Doc JSON
      for (let sheetNum = 0; sheetNum < initDocJSON.sheetCount; sheetNum++) {
        dependantSheetArrayInModel.push(JSON.parse(JSON.stringify(clonedDependantSheetArrayInModel[0])));
        dependantSheetArrayInModel[sheetNum].name = initDocJSON.sheets[sheetNum].name;
      }
    }
  }

addSheetNamesToDropdown(initDocJSON, dependantSheetArrayInModel) {

    //Empty the existing array
    while (dependantSheetArrayInModel.length > 0) {
      dependantSheetArrayInModel.pop(); //https://jsperf.com/array-clear-methods/3
    }
    if (initDocJSON !== null && initDocJSON !==undefined) {
      //Add Sheet Names to Array From Init Doc JSON
      for (let sheetNum = 0; sheetNum < initDocJSON.sheetCount; sheetNum++) {
        var sheetName = initDocJSON.sheets[sheetNum].name;
        dependantSheetArrayInModel.push({"label":sheetName,"data":sheetName});
      }
    }
  }

updateSheetName(selectedSheetName, dependentSheetArrayInModel, clonedDependentSheetArrayInModel) {
    while(dependentSheetArrayInModel.length > 0){
      dependentSheetArrayInModel.pop();
    }
    dependentSheetArrayInModel.push(JSON.parse(JSON.stringify(clonedDependentSheetArrayInModel[0])));
    if(selectedSheetName){
      dependentSheetArrayInModel[0].name = selectedSheetName.label;  
    }
  }
enableOrDisableOnSwitch(componentInput, dependentObjectInModel) {
  dependentObjectInModel.disabled = !componentInput;
}
}