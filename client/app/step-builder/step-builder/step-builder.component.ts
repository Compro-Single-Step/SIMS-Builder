import { Component, OnInit, ElementRef } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { BuilderDataService } from '../shared/builder-data.service';
import { UIConfig } from '../../shared/UIConfig.model';
import { PreviewService } from '../../_services/preview.service'; 
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
  taskID: string;
  stepIndex: string;

  constructor(el: ElementRef, private route: ActivatedRoute, private router: Router, private bds: BuilderDataService, private previewService:PreviewService) {
    this.$el = jQuery(el.nativeElement);
    this.uiConfig = new UIConfig();
    this.selectedView = 1;
  }

  ngOnInit() {
    jQuery(window).on('sn:resize', this.initScroll.bind(this));
    this.initScroll();
    this.route.params.subscribe((params: Params) => {
      this.taskID = params["id"];
      this.stepIndex = params["stepIndex"];
      let paramObj = {
        id: this.taskID,
        stepIndex: this.stepIndex
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

  setSelectedView(viewNumber) {
    this.selectedView = viewNumber;
  }

  onClose() {
    this.router.navigate(["/task",this.taskID]);
  }
  lauchPreviewTask(){
		this.previewService.launchPreviewWindow(this.taskID,this.stepIndex);
	}
}
