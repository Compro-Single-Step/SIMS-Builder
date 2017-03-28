import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

declare var jQuery: any;

@Component({
  selector: 'app-manage-users',
  templateUrl: './manage-users.component.html',
  styleUrls: ['./manage-users.component.scss']
})
export class ManageUsersComponent implements OnInit {

  constructor(private router: Router) { }
switchView(tab:string){
  if(tab=="vieUser-tab")
  {
    console.log('Tab Selected is:'+ tab);
    this.router.navigate(["admin/users"]);
  }
  else if(tab=="addUser-tab")
  {
    console.log('Tab Selected is:'+ tab);
    this.router.navigate(["admin/adduser"]);
  }
}
  ngOnInit() {
    // jQuery('.nav-tabs').on('shown.bs.tab', 'a', (e) => {
    //   if (e.relatedTarget) {
    //     jQuery(e.relatedTarget).removeClass('active');
    //   }
    // });
  }

}
