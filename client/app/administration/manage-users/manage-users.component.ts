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
    this.router.navigate(["admin/users"]);
  }
  else if(tab=="addUser-tab")
  {
    this.router.navigate(["admin/adduser"]);
  }
}
  ngOnInit() {
  }

}
