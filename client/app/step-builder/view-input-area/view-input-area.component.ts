import { Component, OnInit, Input, Output, EventEmitter, ViewContainerRef, ViewChild, AfterViewInit } from '@angular/core';
import { InputFactoryService } from '../../shared/input-factory.service';
import { UIConfig } from '../../shared/UIConfig.model';
import { itemSchema } from '../../shared/UIConfig.model';
import { LabelTypes } from '../../shared/enums';
import { LoaderService } from '../../_services/loader.service';
import { ValidationService } from '../../shared/validation.service';

@Component({
  selector: 'app-view-input-area',
  templateUrl: './view-input-area.component.html',
  styleUrls: ['./view-input-area.component.scss']
})
export class ViewInputAreaComponent implements OnInit, AfterViewInit  {
  @ViewChild('inputCompContainer', { read: ViewContainerRef }) compContainer;
  @Input() viewConfig: UIConfig;
  @Input() validationErrorsObj: Object;
  @Output() uiRendered: EventEmitter<Object> = new EventEmitter();
  viewHeadingConfig: itemSchema = new itemSchema();
  constructor(private factoryRef: InputFactoryService, vcref: ViewContainerRef, private LoaderService:LoaderService) { }
  @Input() viewsCount;
  @Input() currentView;
  ngOnInit() {
    this.viewHeadingConfig.rendererProperties.text = this.viewConfig["label"];
    this.viewHeadingConfig.rendererProperties.type = LabelTypes.VIEW_HEADING;
    this.validationErrorsObj = (this.validationErrorsObj["view" + this.currentView] = { "isViewValid": true });

    // Initializing dynamic components based on the ui config json.
    // This Loop Iterates over the view data and creates GroupComponents
    try {
      for (let item of this.viewConfig["items"]) {
        this.factoryRef.createComp(this.compContainer, item, this.validationErrorsObj, null);        
      }
      //when all the views are rendered in UI, emit an event to parent component so that it can bind modelchecker function to check for model changes every 5 secs.
      if(this.currentView == this.viewsCount)
      {
        this.uiRendered.emit({uiRendered: true});
      }
    }
    catch(err){
      console.log("Error in painting the components - " + err);
    }
  }
  ngAfterViewInit() {
    if (this.currentView == this.viewsCount) {
      ValidationService.setStatus();
      this.LoaderService.setLoaderVisibility(false);
    }
  }
}
