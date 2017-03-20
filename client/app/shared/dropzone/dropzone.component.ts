import { Component, ElementRef, ViewChild } from '@angular/core';
import { BaseComponent } from '../base.component';
import { itemSchema } from '../UIConfig.model';
import { SkillManagerService } from '../../step-builder/step-input-area/skill-manager.service';

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
  constructor(private elementRef: ElementRef, private skillManager: SkillManagerService) {
    super();
  }
  ngOnInit() {
    super.ngOnInit();
    var self = this;
    this.labelConfig.rendererProperties.text = this.compConfig.label;
    this.labelConfig.rendererProperties.type = 'ElementHeading';
    if (this.compConfig.dim !== undefined) {
      this.height = `${this.compConfig.dim['height']}`;
      this.width = `${this.compConfig.dim['width']}`;
    } else {
      this.height = `200px`;
      this.width = `100%`;
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
    });
    reader.onload = function (e) {
      //Update Dependencies when contents have been read;
      var droppedFile = JSON.parse(e.target['result']);
      self.updateDependencies(droppedFile);
    }
  }

  updateDependencies(droppedFile) {
    var dependants = this.compConfig.dependants;
    for (let i = 0; i < dependants.length; i++) {
      let dependantModelReference = dependants[i]['modelReference'];
      let dependantRule = dependants[i]['rule'];
      this.skillManager[dependantRule](droppedFile, dependantModelReference);
    }
  }

}