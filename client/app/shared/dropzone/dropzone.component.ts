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
  descriptionConfig: itemSchema = new itemSchema();
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
    this.labelConfig.rendererProperties.type = LabelTypes.ElementHeading;

    if(this.compConfig.desc != undefined){
      this.descriptionConfig.rendererProperties.text = this.compConfig.desc['basic'];
      this.descriptionConfig.rendererProperties.type = LabelTypes.Description;
    }

    if (this.compConfig.dim != undefined) {
      this.height = `${this.compConfig.dim.split(',')[0]}`;
      this.width = `${this.compConfig.dim.split(',')[1]}`;
    }
    let dropzone = new Dropzone(this.dropzoneContainer.nativeElement, {
      url: "/api/file",
      init: function () {
        self.dropzoneInitializer(this);
      }
    });
  }

  dropzoneInitializer(dropzone) {
    var self = this;
    var reader = new FileReader();
    dropzone.on("addedfile", function (file) { //To be Changed from 'addedfile' to 'success' when file starts getting stored on server;
      //Read File when it is Dropped
      reader.readAsText(file, 'UTF8');
      if (self.modelRef) {
        self.modelRef["name"] = file.name;
      }
      else {
        self.builderModelSrvc.getModelRef(self.compConfig.val).name = file.name;
      }
    });
    reader.onload = function (e) {
      //Update Dependencies when contents have been read;
      var droppedFile = JSON.parse(e.target['result']);
      self.updateDependencies(droppedFile);
    }
  }

}
