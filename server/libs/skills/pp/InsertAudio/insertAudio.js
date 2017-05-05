const PPTBaseSkill = require("../common/ppSkill");

module.exports = class InsertAudio extends PPTBaseSkill {

  init(data) {

    var initDocJSonPath = data.stepUIState.views["1"].documentData.path;
    var skilldata = { "initDocJSonPath": initDocJSonPath, "dbMgr": data.dbFilestoreMgr };
    let self = this;
    let initPromise = super.init(skilldata);
    let dbMgr = data.dbFilestoreMgr;
    //reading the csv file 
    let readFileType = "csv";
    let colHdrFilePath = data.stepUIState.views['1'].sheetsForTable.value[0].columnHeaders["path"];// abc is the model reference for the  csv file path
    let readFilePromise = dbMgr.readFileFromFileStore(colHdrFilePath, readFileType);
    return Promise.all([initPromise, readFilePromise]).then(function (resolveParamArr) {

      // });

      // super.init(skilldata).then(function (resolveParams) {
      let resolveParam = resolveParamArr[1];

      // making it toUpperCase as the data will be used later as well
      tableRange = (eval("data.stepUIState." + "views['1'].sheetsForTable.value[0].tableRange.value")).toUpperCase();
      tableRange.trim();

      let tableRAngeArr = self.getTableRangeArray(tableRange);
      // let dbMgr = data.dbFilestoreMgr;
      // reading the csv file 
      // make the readFile call here and update the 2 variables that can be used in this skill
      // return dbMgr.readFileFromFileStore(colHdrFilePath, readFileType).then(function (resolveParam) {
      if (tableRAngeArr.length == resolveParam.fileData.length) {
        for (let index = 0; index < resolveParam.fileData.length; ++index) {
          let columnName = resolveParam.fileData[index].columnName
          let columnType = resolveParam.fileData[index].columnType.toUpperCase();

          columnHeaderObj[columnName] = {};
          // if no type for the column is given
          if (columnType == "") {
            columnType = "TEXT"
          }
          columnHeaderObj[columnName]["type"] = columnType;
          // if (index < tableRAngeArr.length) {
          columnHeaderObj[columnName]["range"] = tableRAngeArr[index];
          // }
          // else {
          // }
        }

      }
      else {
        let error = new Error("number of columns in the csv and the Table range are inconsistent");
        return Promise.reject(error);
      }
      console.log("columnHeaderObj ", JSON.stringify(columnHeaderObj));
      return Promise.resolve(true);
      // read the resolveparam data here and update the new variables and create an object

    }, function (error) {
      return Promise.reject(error);
      // });
    }
    );
  }
}