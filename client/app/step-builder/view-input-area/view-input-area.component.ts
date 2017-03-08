import { Component, OnInit, Input, ViewContainerRef, ViewChild } from '@angular/core';
import { InputFactoryService } from '../../shared/input-factory.service';
import { UIConfig } from '../../shared/UIConfig.model';

@Component({
  selector: 'app-view-input-area',
  templateUrl: './view-input-area.component.html',
  styleUrls: ['./view-input-area.component.scss']
})
export class ViewInputAreaComponent implements OnInit {
  @ViewChild('inputCompContainer', {read: ViewContainerRef}) compContainer;
  @Input() viewConfig: UIConfig;

  constructor(private factoryRef: InputFactoryService, vcref: ViewContainerRef) { }
  ngOnInit() {
    // Initializing dynamic components based on the ui config json.
    // This Loop Iterates over the view data and creates GroupComponents
    for(let item of this.viewConfig["items"]){
      this.factoryRef.createComp(this.compContainer, item);
    }
  }
}
