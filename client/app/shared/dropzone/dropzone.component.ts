import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { BaseComponent } from '../base.component';

declare var Dropzone: any;
Dropzone.autoDiscover = false;
@Component({
  selector: 'app-dropzone',
  templateUrl: './dropzone.component.html',
  styleUrls: ['./dropzone.component.scss']
})
export class DropzoneComponent extends BaseComponent implements OnInit {
  @ViewChild('dropzone') dropzoneContainer;
  constructor(private elementRef: ElementRef){
    super();
  }
  ngOnInit() {
    let dropzone = new Dropzone(this.dropzoneContainer.nativeElement, {
      url: "/api/file",
      dictDefaultMessage: this.compConfig.rendererProperties.placeHolder
    });
  }

}
