import { Component, OnInit, ElementRef } from '@angular/core';
import { BuilderDataService } from '../shared/builder-data.service';
import { UIConfig } from '../../shared/UIConfig.model';
import { BuilderModelObj } from '../shared/builder-model.service';
declare var jQuery;
declare var localForage;
@Component({
  selector: 'app-step-builder',
  templateUrl: './step-builder.component.html',
  styleUrls: ['./step-builder.component.scss']
})
export class StepBuilderComponent implements OnInit {
  uiConfig: UIConfig;
  $el: any;
  itemDataModel;
  builderModelSrvc;
  constructor(el: ElementRef, private bds: BuilderDataService) {
    this.$el = jQuery(el.nativeElement);
    this.uiConfig = new UIConfig();
    this.builderModelSrvc = BuilderModelObj;
    this.itemDataModel = this.builderModelSrvc.getModel();
  }

  ngOnInit() {
    localForage.config({
        driver      : localForage.INDEXEDDB , // Force WebSQL; same as using setDriver()
        name        : 'SimsBuilder',
        version     : 1.0,
        size        : 4980736, // Size of database, in bytes. WebSQL-only for now.
        storeName   : 'model', // Should be alphanumeric, with underscores.
        description : 'Model of the Current Task'
    });
    let self = this;
    localForage.setItem('model', this.itemDataModel).then(function () {
      return localForage.getItem('model');
    }).then(function (value) {
      setInterval(function(){
        localForage.getItem('model').then(function(value){
          if(JSON.stringify(value) === JSON.stringify(self.itemDataModel)){
            console.log("same Model");
          } else {
            console.log("Different Model");
            localForage.setItem('model', self.itemDataModel);
          }
        });
      }, 3000);
    }).catch(function (err) {
      // we got an error
    });
    jQuery(window).on('sn:resize', this.initScroll.bind(this));
    this.initScroll();
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
}
