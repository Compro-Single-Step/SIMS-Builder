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
  toggledropdown($event):void {
    if(jQuery($event.currentTarget).hasClass("open"))
    jQuery($event.currentTarget).removeClass("open");
    else
    jQuery($event.currentTarget).addClass("open");
  }

  ngOnInit(): void {
    this.$el.find('.input-group-addon + .form-control').on('blur focus', function(e): void {
      jQuery(this).parents('.input-group')
        [e.type === 'focus' ? 'addClass' : 'removeClass']('focus');
    });
  }
  ngOnChanges(): void{
    this.showSearchform = this.showForm;
  }
}
