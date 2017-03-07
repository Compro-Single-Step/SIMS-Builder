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
  constructor(private elementRef: ElementRef){
    super();
  }
  ngOnInit() {
    this.labelConfig.rendererProperties.text = this.compConfig.label;
    this.labelConfig.rendererProperties.type = 'ElementHeading';
    let dropzone = new Dropzone(this.dropzoneContainer.nativeElement, {
      url: "/api/file",
      dictDefaultMessage: this.compConfig.rendererProperties.placeHolder
    });
  }

}
