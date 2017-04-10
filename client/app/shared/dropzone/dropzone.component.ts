import { Component, ElementRef, ViewChild } from '@angular/core';
import { BaseComponent } from '../base.component';
import { ActivatedRoute } from '@angular/router';
import { LabelTypes } from '../enums';
import { itemSchema } from '../UIConfig.model';
import { AuthService } from '../../_services/auth.service';
import { BuilderDataService } from '../../step-builder/shared/builder-data.service';


declare var Dropzone: any;
Dropzone.autoDiscover = false;
@Component({
  selector: 'app-dropzone',
  templateUrl: './dropzone.component.html',
  styleUrls: ['./dropzone.component.scss']
})
export class DropzoneComponent extends BaseComponent {
  @ViewChild('dropzone') dropzoneContainer;
  labelConfig: itemSchema = new itemSchema();
  width: string;
  height: string;
  constructor(private elementRef: ElementRef, private route: ActivatedRoute, private authSrvc: AuthService, private bds: BuilderDataService) {
    super();
  }

  ngOnInit() {
    super.ngOnInit();
    this.UpdateView();
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
    var routeParams = this.route.snapshot.params;
    let dropzone = new Dropzone(this.dropzoneContainer.nativeElement, {
      url: "/api/skill/resource",
      paramName: "dzfile",
      maxFiles: 1,
      addRemoveLinks: true,

      acceptedFiles: MIMETYPE[self.compConfig.rendererProperties.dataType],
      init: function () {
        self.dropzoneInitializer(this);
      },
      sending: function (file, xhr, formData) {
        xhr.setRequestHeader('Authorization', self.authSrvc.getCurrentUserToken());
        formData.append("taskId", routeParams["taskId"]);
        formData.append("stepIndex", routeParams["stepIndex"]);
        // Need to discuss the passing of model ref along with the file as the model can be generated dynamicallly in some cases.
        // formData.append("modelref", self.compConfig.val);
      }
    });
  }

  dropzoneInitializer(dropzone) {
    var reader = new FileReader();
    var self = this;
    var droppedFile;

    dropzone.on("success", function (file, response) {
      if (file.status === "success") {
        let currModelRef = self.getData();
        currModelRef["displayName"] = file.name;
        currModelRef["path"] = response.filePath;

        if (MIMETYPE[self.compConfig.rendererProperties.dataType] === ".json") {
          reader.readAsText(file, 'UTF8');
          reader.onload = function (e) {
            //Update Dependencies when contents have been read;
            droppedFile = JSON.parse(e.target['result']);
            self.updateDependencies(droppedFile);
          }
        }
      }
    });
    dropzone.on("maxfilesexceeded", function (file) {
      dropzone.removeAllFiles();
      // The event "removedfile" is called which internally calls the api to delete file from the server.
      dropzone.addFile(file);
    });
    dropzone.on("removedfile", function (file) {
      let currModelRef = self.getData();
      self.bds.removeFile(currModelRef["path"]).subscribe(function (data) {
        if (data.status === "success") {
          currModelRef["displayName"] = "";
          currModelRef["path"] = "";
        } else if (data.status == "error") {
          // TODO: Code for handling - File Doesn't Exist Error
        }
      });
    })

  }

  getData() {
    return this.modelRef ? this.modelRef : this.builderModelSrvc.getModelRef(this.compConfig.val);
  }
}
enum MIMETYPE {
  JSON = <any>".json",
  img = <any>"image/*"
}
