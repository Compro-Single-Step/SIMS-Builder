import { Component, OnInit, ElementRef } from '@angular/core';
import { BuilderDataService } from '../shared/builder-data.service';
import { UIConfig, itemDataModel } from '../../shared/UIConfig.model';
declare var jQuery;
@Component({
  selector: 'app-step-builder',
  templateUrl: './step-builder.component.html',
  styleUrls: ['./step-builder.component.scss']
})
export class StepBuilderComponent implements OnInit {
  uiConfig: UIConfig;
  $el: any;

  constructor(el: ElementRef, private bds: BuilderDataService) {
    this.$el = jQuery(el.nativeElement);
    this.uiConfig = new UIConfig();
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
  save(): any {
    const modelData = {
      data: {
        model: itemDataModel
      }
    };
    this.bds.saveSkillData(modelData).subscribe(function(data){
      // TODO: Remove the Console Statement and Notify User of the success or failure
      console.log(data);
    });
  }
}
