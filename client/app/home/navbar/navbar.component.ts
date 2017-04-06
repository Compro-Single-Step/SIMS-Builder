import { Component, EventEmitter, OnInit, ElementRef, Output, Input } from '@angular/core';
import { Router } from '@angular/router';

import { AppConfig } from '../../app.config';
import { AuthService } from '../../_services/auth.service';
import { UserService } from '../../_services/user.service';
import { User } from '../../_services/userModel';
declare var jQuery: any;

@Component({
  selector: '[navbar]',
  templateUrl: './navbar.component.html',
  styles:['.brand_logo, .baloo_icon{height:20px;}']
})
export class Navbar implements OnInit {
 @Output() toggleSidebarEvent: EventEmitter<any> = new EventEmitter();
  $el: any;
  config: any;
  adminUser: boolean;
  currentUser: User;
  user;
  constructor(el: ElementRef, config: AppConfig, private authenticationService: AuthService, private router: Router, private userservice: UserService) {
    this.$el = jQuery(el.nativeElement);
    this.config = config.getConfig();
    this.currentUser =new User();
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
  logout(): void {
    this.authenticationService.logout();
    this.router.navigate(['/login']);
  }
  isAdminUser(userRole){
    if(userRole == 'admin')
      return true;
    else
      return false;
  }
  ngOnInit(): void {
    this.$el.find('.input-group-addon + .form-control').on('blur focus', function(e): void {
      jQuery(this).parents('.input-group')
        [e.type === 'focus' ? 'addClass' : 'removeClass']('focus');
    });
    try{
      this.user = JSON.parse(localStorage.getItem('currentUser')).username;
    }
    catch (e){

    }
    this.userservice.getUser(this.user).subscribe(
                       Data => {
                         this.currentUser = Data;
                         this.adminUser = this.isAdminUser(this.currentUser.role);
                      });
  }
}
