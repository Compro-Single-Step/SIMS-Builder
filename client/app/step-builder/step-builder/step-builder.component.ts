import { Component, OnInit, ElementRef } from '@angular/core';
import { BuilderDataService } from '../shared/builder-data.service';
import { UIConfig } from '../../shared/UIConfig.model';
import { Router } from '@angular/router';
declare var jQuery;
@Component({
  selector: 'app-step-builder',
  templateUrl: './step-builder.component.html',
  styleUrls: ['./step-builder.component.scss']
})
export class StepBuilderComponent implements OnInit {
  uiConfig: UIConfig;
  $el: any;
  private selectedView: number;
  taskID: string = ''; //TODO: will get task id from previous screen

  constructor(el: ElementRef, private bds: BuilderDataService, private router: Router) {
    this.$el = jQuery(el.nativeElement);
    this.uiConfig = new UIConfig();
    this.selectedView = 1;
  }

  ngOnInit() {
    jQuery(window).on('sn:resize', this.initScroll.bind(this));
    this.initScroll();
    var self =this;
    this.bds.getuiconfig().subscribe(function(data){
      self.uiConfig = data;
    });
  }

  initScroll(): void {
    let $primaryContent = this.$el.find('#body');
    if (this.$el.find('.slimScrollDiv').length !== 0) {
      $primaryContent.slimscroll({
        destroy: true
      });
    }
    $primaryContent.slimscroll({
      height: '100%',
      size: '6px',
      alwaysVisible: false
    });
  }

  setSelectedView(viewNumber) {
    this.selectedView = viewNumber;
  }

  onClose() {
    console.log('Search for task ', this.taskID, ' in Baloo');
    this.router.navigate(["/task",this.taskID]);
  }
}
