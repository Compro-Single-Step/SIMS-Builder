import { Component, OnInit, ElementRef, ViewChild, Input } from '@angular/core';
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
export class DropzoneComponent extends BaseComponent implements OnInit {
  @ViewChild('dropzone') dropzoneContainer;
  labelConfig: itemSchema = new itemSchema();
  width: string;
  height: string;
  constructor(private elementRef: ElementRef, private skillManager: SkillManagerService) {
    super();
  }
  ngOnInit() {
    var self = this;
    if (this.compConfig.rendererProperties.dynamicMode === true) {
      this.dynamicMode = true;
    }
    this.labelConfig.rendererProperties.text = this.compConfig.label;
    this.labelConfig.rendererProperties.type = 'ElementHeading';
    if (this.compConfig.dim != undefined) {
      this.height = `${this.compConfig.dim.split(',')[0]}`;
      this.width = `${this.compConfig.dim.split(',')[1]}`;
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
      if (self.dynamicMode === true) {
        self.modelRef.name = file.name;
      }
      else {
        self.builderModelSrvc.getModelRef(self.compConfig.val).value = file.name;
      }
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
