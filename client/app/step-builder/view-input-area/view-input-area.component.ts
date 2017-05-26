import { Component, OnInit, Input, Output, EventEmitter, ViewContainerRef, ViewChild } from '@angular/core';
import { InputFactoryService } from '../../shared/input-factory.service';
import { UIConfig } from '../../shared/UIConfig.model';
import { itemSchema } from '../../shared/UIConfig.model';
import { LabelTypes } from '../../shared/enums';
@Component({
  selector: 'app-view-input-area',
  templateUrl: './view-input-area.component.html',
  styleUrls: ['./view-input-area.component.scss']
})
export class ViewInputAreaComponent implements OnInit {
  @ViewChild('inputCompContainer', { read: ViewContainerRef }) compContainer;
  @Input() viewConfig: UIConfig;
  @Output() uiRendered: EventEmitter<Object> = new EventEmitter();
  viewHeadingConfig: itemSchema = new itemSchema();
  constructor(private factoryRef: InputFactoryService, vcref: ViewContainerRef) { }
  @Input() viewsCount;
  @Input() currentView;
  ngOnInit() {
    this.viewHeadingConfig.rendererProperties.text = this.viewConfig["label"];
    this.viewHeadingConfig.rendererProperties.type = LabelTypes.VIEW_HEADING;
    // Initializing dynamic components based on the ui config json.
    // This Loop Iterates over the view data and creates GroupComponents
    try {
      for (let item of this.viewConfig["items"]) {
        this.factoryRef.createComp(this.compContainer, item);
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
}
