import { Component, ElementRef, ViewChild } from '@angular/core';
import { BaseComponent } from '../base.component';
import { ActivatedRoute } from '@angular/router';
import { LabelTypes } from '../enums';
import { itemSchema } from '../UIConfig.model';
import { AuthService } from '../../_services/auth.service';

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
  constructor(private elementRef: ElementRef, private route: ActivatedRoute, private authSrvc: AuthService) {
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
        if (self.modelRef) {
          self.modelRef["displayName"] = file.name;
          self.modelRef["path"] = response.filePath;
        }
        else {
          self.builderModelSrvc.getModelRef(self.compConfig.val).displayName = file.name;
          self.builderModelSrvc.getModelRef(self.compConfig.val).path = response.filePath;
        }
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
      // TODO: Add functionality to delete the old file on server
      dropzone.addFile(file);
    });
  }
}
enum MIMETYPE {
  JSON = <any>".json",
  img = <any>"image/*"
}
