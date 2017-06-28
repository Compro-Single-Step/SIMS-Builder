import { Component, ElementRef, ViewChild, OnDestroy } from '@angular/core';
import { BaseComponent } from '../base.component';
import { NavigationStart, Router, ActivatedRoute } from '@angular/router';
import { LabelTypes } from '../enums';
import { itemSchema } from '../UIConfig.model';
import { AuthService } from '../../_services/auth.service';
import { BuilderDataService } from '../../step-builder/shared/builder-data.service';
import { BuilderModelObj } from '../../step-builder/shared/builder-model.service';
import { ExceptionHandlerService } from '../../shared/exception-handler.service';


declare var Dropzone: any;
declare var Papa;
Dropzone.autoDiscover = false;
@Component({
  selector: 'app-dropzone',
  templateUrl: './dropzone.component.html',
  styleUrls: ['./dropzone.component.scss']
})
export class DropzoneComponent extends BaseComponent implements OnDestroy {
  @ViewChild('dropzone') dropzoneContainer;
  labelConfig: itemSchema = new itemSchema();
  width: string;
  height: string;
  makeDeleteCall: boolean;
  fileTypesToRead: Array<MIMETYPE>;
  isMultipleFiles: boolean;
  builderModelSrvc;
  taskId: string;
  stepIndex: string;
  constructor(private elementRef: ElementRef, private route: ActivatedRoute, private router: Router, private authSrvc: AuthService, private bds: BuilderDataService, private exceptionHandlerSrvc: ExceptionHandlerService) {
    super();
    this.makeDeleteCall = true;
    this.fileTypesToRead = [MIMETYPE.JSON, MIMETYPE.CSV, MIMETYPE.HTML, MIMETYPE.XML];
    this.isMultipleFiles = false;
    this.builderModelSrvc = BuilderModelObj;
    let routeParams = this.route.snapshot.params;
    this.taskId = routeParams["taskId"];
    this.stepIndex = routeParams["stepIndex"];
  }

  ngOnInit() {
    super.ngOnInit();
    if (this.compConfig.rendererProperties) {
      this.isMultipleFiles = (this.compConfig.rendererProperties.multipleFiles) ? true : false;
    }
    this.modelRef = this.getData();
    this.UpdateView();
    this.router.events
      .subscribe((event) => {
        if (event instanceof NavigationStart) {
          this.makeDeleteCall = !this.makeDeleteCall;
        }
      });
  }

  UpdateView() {
    var self = this;
    this.labelConfig.rendererProperties.text = this.compConfig.label;
    this.labelConfig.rendererProperties.type = LabelTypes.ELEMENT_HEADING;

    if (this.compConfig.desc != undefined) {
      this.updateDescription();
    }

    if (this.compConfig.dim != undefined) {
      this.height = `${this.compConfig.dim['height']}`;
      this.width = `${this.compConfig.dim['width']}`;
    }
    let dropzone = new Dropzone(this.dropzoneContainer.nativeElement, {
      url: "/api/skill/resource",
      paramName: "dzfile",
      maxFiles: (self.isMultipleFiles) ? null : 1,
      addRemoveLinks: true,

      acceptedFiles: MIMETYPE[self.compConfig.rendererProperties.dataType],
      init: function () {
        self.dropzoneInitializer(this);
      },
      sending: function (file, xhr, formData) {
        xhr.setRequestHeader('Authorization', self.authSrvc.getCurrentUserToken());
        formData.append("taskId", self.taskId);
        formData.append("stepIndex", self.stepIndex);
        // Need to discuss the passing of model ref along with the file as the model can be generated dynamicallly in some cases.
        // formData.append("modelref", self.compConfig.val);
      }
    });
  }

  dropzoneInitializer(dropzone) {
    var self = this;
    dropzone.on("success", function (file, response) {
      if (file.status === "success") {
        let currModelRef = self.getData();
        if (self.isMultipleFiles) {
          currModelRef["value"].push({ displayName: file.name, path: response.filePath, size: file.size });
        } else {
          currModelRef["displayName"] = file.name;
          currModelRef["path"] = response.filePath;
          currModelRef["size"] = file.size;
        }
        self.readFile(file, MIMETYPE[self.compConfig.rendererProperties.dataType]);

        //Validation
        self.validateComp("success");
      }
    });
    dropzone.on("maxfilesexceeded", function (file) {
      dropzone.removeAllFiles();
      // The event "removedfile" is called which internally calls the api to delete file from the server.
      dropzone.addFile(file);
    });
    dropzone.on("removedfile", function (file) {
      let currModelRef = self.getData();
      if (self.isMultipleFiles) {
        for (let i = 0; i < currModelRef["value"].length; i++) {
          if (currModelRef["value"][i].displayName === file.name) {
            self.removeFile(currModelRef, i);
            break;
          }
        }

        if (currModelRef["value"].length === 0) {
          self.validateComp(null);
        }
      } else {
        self.validateComp(null);

        self.removeFile(currModelRef);
      }
    })

    this.restoreFileUI(dropzone);
  }

  removeFile(model, index?) {
    this.emitEvents(null);
    let path = this.isMultipleFiles ? model["value"][index]["path"] : model["path"];
    if (this.isMultipleFiles) {
      model["value"].splice(index, 1);
    } else {
      model["displayName"] = "";
      model["path"] = "";
    }
    let self = this;
    let itemDataModel = this.builderModelSrvc.getState();
    this.bds.saveSkillData({ stepUIState: itemDataModel }, this.taskId, this.stepIndex).subscribe(function (data) {
      if (data["status"] === "success") {
        //TODO: Notify user of the draft save
        self.exceptionHandlerSrvc.globalConsole("Model Data Sent to Server");
        self.removeFileFromServer(path);
      } else if (data["status"] === "error") {
        //TODO: Try saving on server again
        self.exceptionHandlerSrvc.globalConsole("Couldn't Save Model Data on Server.");

        //Commenting this code because of Generic Error handling on server.
        // if(data["errcode"] === "DATA_NOT_PRESENT"){
        //     self.exceptionHandlerSrvc.globalLog("UI State is null. Please check");
        // }
      }
    });
  }

  removeFileFromServer(path) {
    let self = this;
    if (path != "") {
      this.bds.removeFile(path).subscribe((data) => {
        if (data.status === "success") {
          self.exceptionHandlerSrvc.globalConsole("File removed from server.");
        } else if (data.status == "error") {
          // TODO: Code for handling - File Doesn't Exist Error
        }
      });
    }
  }
  readFile(file, fileType) {
    let reader = new FileReader();
    let droppedFile;
    let self = this;
    if (this.fileTypesToRead.indexOf(fileType) != -1) {
      reader.readAsText(file, 'UTF8');
      reader.onload = function (e) {
        //Update Dependencies when contents have been read;
        try {
          droppedFile = self.fileTypeHandler(fileType, e.target['result']);
        }
        catch (e) {
          console.log(e);
        }
        self.emitEvents(droppedFile);
      }
    }
  }

  fileTypeHandler(fileType, data) {
    let obj = {};
    obj[MIMETYPE.JSON] = this.parseJsonData;
    obj[MIMETYPE.CSV] = this.parseCsvDataToJson;
    obj[MIMETYPE.XML] = this.parseAsText;
    obj[MIMETYPE.HTML] = this.parseAsText;

    return obj[fileType](data);
  }

  parseJsonData(data) {
    return JSON.parse(data);
  }

  parseCsvDataToJson(data) {
    var config = {
      "header": true,
      "skipEmptyLines": true
    }
    var output = Papa.parse(data, config);
    if (output.errors.length != 0) {
      //TODO: Error Handling
      for (let i = 0; i < output.errors.length; i++) {
        console.log("Error in parsing csv: " + output.errors[i].message + (output.errors[i].row !== undefined ? " => at row: " + output.errors[i].row : ""));
      }
    }
    return output.data;
  }

  parseAsText(data) {
    return data;
  }

  addFileToDropzone(dropzone, el) {
    if (el.displayName && el.displayName != "") {
      var file = {
        name: el.displayName,
        size: el.size ? el.size : 2000,
        status: Dropzone.ADDED,
        accepted: true
      };
      dropzone.emit("addedfile", file);
      dropzone.emit("complete", file);
      dropzone.files.push(file);

      //Default validation status on page reload
      this.validateComp("success");
    }
  }

  restoreFileUI(dropzone) {
    let fileInfo = this.getData();
    if (this.isMultipleFiles) {
      fileInfo["value"].forEach(el => {
        this.addFileToDropzone(dropzone, el);
      });
    } else {
      this.addFileToDropzone(dropzone, fileInfo);
    }
  }

  getData() {
    return this.modelRef ? this.modelRef : this.builderModelSrvc.getStateRef(this.compConfig.val);
  }

  ngOnDestroy() {
    super.ngOnDestroy();
    this.deleteValidationErroObj();
    if (this.makeDeleteCall && this.getData()["path"] != "") {
      this.bds.removeFile(this.getData()["path"]).subscribe((data) => {
        //TODO: error handling.
      });
    }
  }
}
enum MIMETYPE {
  JSON = <any>".json",
  img = <any>"image/*",
  HTML = <any>".htm",
  CSV = <any>".csv",
  XML = <any>".xml"
}
