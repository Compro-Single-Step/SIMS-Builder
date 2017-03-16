import { Component, EventEmitter, OnInit, ElementRef, Output, Input } from '@angular/core';
import { AppConfig } from '../../app.config';
declare var jQuery: any;

@Component({
  selector: '[navbar]',
  templateUrl: './navbar.component.html',
  styles:['.brand_logo, .baloo_icon{height:20px;}']
})
export class Navbar implements OnInit {
 @Output() toggleSidebarEvent: EventEmitter<any> = new EventEmitter();
 @Input() showForm: boolean = false;
  $el: any;
  config: any;
  showSearchform: any;
  constructor(el: ElementRef, config: AppConfig) {
    this.$el = jQuery(el.nativeElement);
    this.config = config.getConfig();
  }

  toggleSidebar(state): void {
    this.toggleSidebarEvent.emit(state);
  }
  toggledropdown():void {
    if(jQuery(this).hasClass("open"))
    jQuery(this).removeClass("open");
    else
    jQuery(this).addClass("open");
  }

  ngOnInit(): void {
    this.$el.find('.input-group-addon + .form-control').on('blur focus', function(e): void {
      jQuery(this).parents('.input-group')
        [e.type === 'focus' ? 'addClass' : 'removeClass']('focus');
    });
  }
  ngOnChanges(): void{
    console.log("navchanges");
    this.showSearchform = this.showForm;
  }
}
