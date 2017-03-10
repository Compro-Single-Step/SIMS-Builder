import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { BaseComponent } from '../base.component';
import { itemSchema } from '../UIConfig.model';

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
  constructor(private elementRef: ElementRef){
    super();
  }
  ngOnInit() {
    this.labelConfig.rendererProperties.text = this.compConfig.label;
    this.labelConfig.rendererProperties.type = 'ElementHeading';
    if (this.compConfig.dim != undefined) {
      this.height = `${this.compConfig.dim.split(',')[0]}`;
      this.width = `${this.compConfig.dim.split(',')[1]}`;
    } else {
      this.height = `200px`;
      this.width = `97%`;
    }
    let dropzone = new Dropzone(this.dropzoneContainer.nativeElement, {
      url: "/api/file",
      dictDefaultMessage: this.compConfig.rendererProperties.placeHolder
    });

  }

}
