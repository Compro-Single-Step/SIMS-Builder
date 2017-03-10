import { Component, EventEmitter, OnInit, ElementRef, Output } from '@angular/core';
import { AppConfig } from '../../app.config';
declare var jQuery: any;

@Component({
  selector: '[navbar]',
  templateUrl: './navbar.template.html',
  styles:['.brand_logo, .baloo_icon{height:20px;}']
})
export class Navbar implements OnInit {
 @Output() toggleSidebarEvent: EventEmitter<any> = new EventEmitter();
  $el: any;
  config: any;

  constructor(el: ElementRef, config: AppConfig) {
    this.$el = jQuery(el.nativeElement);
    this.config = config.getConfig();
  }

  toggleSidebar(state): void {
    this.toggleSidebarEvent.emit(state);
  }


  ngOnInit(): void {
  this.$el.find('.input-group-addon + .form-control').on('blur focus', function(e): void {
      jQuery(this).parents('.input-group')
        [e.type === 'focus' ? 'addClass' : 'removeClass']('focus');
    });
  }
}
