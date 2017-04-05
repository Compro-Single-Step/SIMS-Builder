import { Component, ElementRef, ViewChild } from '@angular/core';
import { BaseComponent } from '../base.component';
import { LabelTypes } from '../enums';
import { itemSchema } from '../UIConfig.model';

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
  constructor(private elementRef: ElementRef) {
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
    let dropzone = new Dropzone(this.dropzoneContainer.nativeElement, {
      url: "/api/skill/resource",
      paramName: "dzfile",
      acceptedFiles: self.compConfig.rendererProperties.dataType,
      init: function () {
        self.dropzoneInitializer(this);
      },
      sending: function (file, xhr, formData) {
        xhr.setRequestHeader('Authorization', JSON.parse(localStorage.getItem('currentUser')).token);
        formData.append("taskId", "EXP16.WD.03.01.03.T1");
        formData.append("stepIndex", "1");
        formData.append("modelref", self.compConfig.val);
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
          self.modelRef["name"] = file.name;
          self.modelRef["filepath"] = response.filepath;
        }
        else {
          self.builderModelSrvc.getModelRef(self.compConfig.val).name = file.name;
          self.builderModelSrvc.getModelRef(self.compConfig.val).filepath = response.filepath;
        }
        if (self.getMimeType() === "json") {
          reader.readAsText(file, 'UTF8');
          reader.onload = function (e) {
            //Update Dependencies when contents have been read;
            droppedFile = JSON.parse(e.target['result']);
            self.updateDependencies(droppedFile);
          }
        }
      }
    });
  }
  getMimeType() {
    return {
      ".json": "json",
      "images/*": "image"
    }[this.compConfig.rendererProperties.dataType];
  }
}
