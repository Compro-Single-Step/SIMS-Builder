import { Component, OnInit, ElementRef } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { BuilderDataService } from '../shared/builder-data.service';
import { UIConfig } from '../../shared/UIConfig.model';
import { Router } from '@angular/router';
import { skillManager } from '../shared/skill-manager.service';
declare var jQuery;
@Component({
  selector: 'app-step-builder',
  templateUrl: './step-builder.component.html',
  styleUrls: ['./step-builder.component.scss']
})
export class StepBuilderComponent implements OnInit {
  uiConfig: UIConfig;
  $el: any;
  private selectedView: number;
  taskID: string;

  constructor(el: ElementRef, private route: ActivatedRoute, private bds: BuilderDataService, private router: Router) {
    this.$el = jQuery(el.nativeElement);
    this.uiConfig = new UIConfig();
    this.selectedView = 1;
  }

  ngOnInit() {
    jQuery(window).on('sn:resize', this.initScroll.bind(this));
    this.initScroll();
    this.route.params.subscribe((params: Params) => {
      this.taskID = params["id"];
      let paramObj = {
        id: this.taskID,
        stepIndex: params["stepIndex"]
      };
      this.bds.getuiconfig(paramObj).subscribe((data) => {
        this.uiConfig = data;
      });
      let skillfilesbundle = `var skill = {}; skill.movecellcontent = {}; skill.movecellcontent.webpackBundleMap = {"moveCellContent":0}; var movecellcontentClass = (function(modules) {
                                                // The module cache
                                                var installedModules = {};
                                                // The require function
                                                function require(filePath) {
                                                    if(~filePath.lastIndexOf('.js'))
                                                        var FileName = filePath.lastIndexOf('\\\\') > filePath.lastIndexOf('/') ? filePath.substring(filePath.lastIndexOf('\\\\')+1, filePath.lastIndexOf('.js')) : filePath.substring(filePath.lastIndexOf('/')+1, filePath.lastIndexOf('.js'));
                                                    else    
                                                        var FileName = filePath.lastIndexOf('\\\\') > filePath.lastIndexOf('/') ? filePath.substring(filePath.lastIndexOf('\\\\')+1) : filePath.substring(filePath.lastIndexOf('/')+1);

                                                    var parentFileName = arguments.callee.caller.arguments[3];
                                                    
                                                    moduleId = parentFileName ? skill.movecellcontent.webpackBundleMap[parentFileName + "_" + FileName] : skill.movecellcontent.webpackBundleMap[FileName];

                                                    //Check if module is not in map (it must be present in global)
                                                    if(moduleId === undefined)
                                                        return ""

                                                    // Check if module is in cache
                                                    if(installedModules[moduleId])
                                                        return installedModules[moduleId].exports;

                                                    // Create a new module (and put it into the cache)
                                                    var module = installedModules[moduleId] = {
                                                        i: moduleId,
                                                        l: false,
                                                        exports: {}
                                                    };

                                                    // Execute the module function
                                                    modules[moduleId].call(module.exports, module, module.exports, require, FileName);

                                                    // Flag the module as loaded
                                                    module.l = true;

                                                    // Return the exports of the module
                                                    return module.exports;
                                                }

                                                // Load entry module and return exports
                                                return require('./moveCellContent');
                                            })([(function(module, exports, require, fileName) {//const xlSkill = require('../common/xlSkill');
module.exports = (function () {
    function moveCellContent() {
    }
    moveCellContent.prototype.createJsonPath = function (skillParams, callback) {
        var taskParams = skillParams.taskParams;
        var paramValueObj = skillParams.paramsObj;
        taskParams.dbFilestoreMgr.copyTaskAssetFile(paramValueObj["docData"]["path"], taskParams, function (error, xmlPath, fileType) {
            paramValueObj["docData"]["path"] = xmlPath;
            if (!error) {
                var preloadResArr = [];
                preloadResArr.push({ "path": "" + xmlPath, "type": "" + fileType });
                callback(null, paramValueObj["docData"]["path"]);
                //add this new path to the preloadResources Array
            }
            else {
                callback(error);
            }
        });
    };
    moveCellContent.prototype.getSelectedCell = function (skillParams, callback) {
        var paramValueObj = skillParams.paramsObj;
        callback(null, paramValueObj["srcRange"]);
    };
    moveCellContent.prototype.getSelDragCell = function (skillParams, callback) {
        var paramValueObj = skillParams.paramsObj;
        //requires sheet name using init doc json
        var finalObject = {};
        finalObject["sheetNo"] = 1;
        finalObject["startRange"] = paramValueObj["srcRange"];
        finalObject["endRange"] = paramValueObj["destRange"];
        finalObject = JSON.stringify(finalObject);
        callback(null, finalObject);
    };
    moveCellContent.prototype.createHighlightJson = function (skillParams, callback) {
        var paramValueObj = skillParams.paramsObj;
        // requires sheet number using Init Doc json
        var finalObject = {};
        finalObject["sheetNo"] = 1;
        finalObject["range"] = paramValueObj["srcRange"];
        finalObject = JSON.stringify(finalObject);
        callback(null, finalObject);
    };
    moveCellContent.prototype.createSheetCellData = function (skillParams, callback) {
        var taskParams = skillParams.taskParams;
        var paramValueObj = skillParams.paramsObj;
        var finalObject = {};
        finalObject["sheetNo"] = 1;
        //getSheetNameMapgetSheetNameMap(sheetName, initDocJsonPath)
        taskParams.dbFilestoreMgr.copyTaskAssetFile(paramValueObj["wbData"].path, taskParams, function (error, xmlPath, fileType) {
            if (!error) {
                paramValueObj["wbData"].path = xmlPath;
                finalObject["dataJSONPath"] = paramValueObj["wbData"].path;
                finalObject = JSON.stringify(finalObject);
                var preloadResArr = [];
                preloadResArr.push({ "path": "" + xmlPath, "type": "" + fileType });
                callback(null, finalObject, preloadResArr);
            }
            else {
                // console.log("error in the createSheetCellData");
                callback(error);
            }
        });
    };
    moveCellContent.prototype.getSelectedCellFinal = function (skillParams, callback) {
        var paramValueObj = skillParams.paramsObj;
        var finalArray = [];
        var valuearray = paramValueObj["destRange"].split(":");
        valuearray[0].trim();
        valuearray[1].trim();
        var col1 = valuearray[0].toUpperCase().charAt(0);
        var col2 = valuearray[1].toUpperCase().charAt(0);
        var row1 = parseInt(valuearray[0].substring(1, valuearray[0].length));
        var row2 = parseInt(valuearray[1].substring(1, valuearray[0].length));
        finalArray.push(valuearray[0]);
        for (var iterator = 0; iterator <= col2.charCodeAt(0) - col1.charCodeAt(0); ++iterator) {
            for (var index = 0; index <= row2 - row1; ++index) {
                if (iterator != 0 || index != 0)
                    finalArray.push(col1 + row1 + ":" + (String.fromCharCode(col1.charCodeAt(0) + iterator)) + (row1 + index));
            }
        }
        callback(null, finalArray);
    };
    moveCellContent.prototype.getSheetNameAndSheetCountFromInitDocJSON = function (initDocJSON, dependantSheetArrayInModel) {
        //Add The Required Number of Sheets in Model
        if (initDocJSON.sheetCount >= dependantSheetArrayInModel.length) {
            var sheetCountDiff = initDocJSON.sheetCount - dependantSheetArrayInModel.length;
            while (sheetCountDiff > 0) {
                dependantSheetArrayInModel.push(JSON.parse(JSON.stringify(dependantSheetArrayInModel[(dependantSheetArrayInModel.length - 1)])));
                sheetCountDiff--;
            }
        }
        //Add Sheet Names From Init Doc JSON
        for (var sheetNum = 0; sheetNum < initDocJSON.sheetCount; sheetNum++) {
            dependantSheetArrayInModel[sheetNum].name = initDocJSON.sheets[sheetNum].name;
        }
    };
    moveCellContent.prototype.addSheetNamesToDropdown = function (initDocJSON, dependantSheetArrayInModel) {
        //Add Sheet Names to Array From Init Doc JSON
        for (var sheetNum = 0; sheetNum < initDocJSON.sheetCount; sheetNum++) {
            dependantSheetArrayInModel.push(initDocJSON.sheets[sheetNum].name);
        }
    };

    moveCellContent.prototype.updateSheetNameUsingDropdown = function (selectedSheetName, dependentSheetNameInModel) {
        dependentSheetNameInModel = selectedSheetName;
    };
    return moveCellContent;
}());
})])
                                                skill.movecellcontent.exports = new movecellcontentClass()`;
        skillManager.getSkillTranslator(skillfilesbundle, "movecellcontent");
    })
  }

  initScroll(): void {
    let $primaryContent = this.$el.find('#body');
    if (this.$el.find('.slimScrollDiv').length !== 0) {
      $primaryContent.slimscroll({
        destroy: true
      });
    }
    $primaryContent.slimscroll({
      height: '100%',
      size: '6px',
      alwaysVisible: false
    });
  }

  setSelectedView(viewNumber) {
    this.selectedView = viewNumber;
  }

  onClose() {
    this.router.navigate(["/task",this.taskID]);
  }
}
