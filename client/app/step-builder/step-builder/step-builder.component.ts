import { Component, OnInit, ElementRef } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { BuilderDataService } from '../shared/builder-data.service';
import { UIConfig } from '../../shared/UIConfig.model';
declare var jQuery;
@Component({
  selector: 'app-step-builder',
  templateUrl: './step-builder.component.html',
  styleUrls: ['./step-builder.component.scss']
})
export class StepBuilderComponent implements OnInit {
  uiConfig: UIConfig;
  $el: any;

  constructor(el: ElementRef, private route: ActivatedRoute, private bds: BuilderDataService) {
    this.$el = jQuery(el.nativeElement);
    this.uiConfig = new UIConfig();
  }

  ngOnInit() {
    jQuery(window).on('sn:resize', this.initScroll.bind(this));
    this.initScroll();
    this.route.params.subscribe((params: Params) => {
      let paramObj = {
        id: params["id"],
        stepIndex: params["stepIndex"]
      };
      this.bds.getuiconfig(paramObj).subscribe((data) => {
        this.uiConfig = data;
      });
    })
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
}
