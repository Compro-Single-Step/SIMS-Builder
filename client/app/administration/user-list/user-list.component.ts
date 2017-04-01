import { Component, ViewEncapsulation, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalDirective } from 'ng2-bootstrap/modal';
import { UserService} from '../../_services/user.service';
import { User } from '../../_services/userModel';
declare var jQuery: any;


@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./user-list.component.scss']
})

export class UserListComponent implements OnInit {
Data ;
userData;
selectedUser = 1;
errorMessage;
userdetails: User;
message="";
@ViewChild('modalWindow') public modalWindow:ModalDirective;
@ViewChild('deleteModalWindow') public deleteModalWindow:ModalDirective;
  constructor(private route: ActivatedRoute, private router: Router, private userservice: UserService) {
    this.userdetails = new User();
  }

  ngOnInit(): void {
   // this.data =  userData;
   this.initializeUserData();
    let searchInput = jQuery('#table-search-input, #search-countries');
    searchInput
      .focus((e) => {
      jQuery(e.target).closest('.input-group').addClass('focus');
    })
      .focusout((e) => {
      jQuery(e.target).closest('.input-group').removeClass('focus');
    });
  }
  initializeUserData(): void{
    this.route.data
                     .subscribe(
                       Data => this.Data = Data,
                       error =>  this.errorMessage = <any>error);
					   this.userData = this.Data["userData"];
  }
  showUpdateModal(index) {
    this.selectedUser = index;
    this.userdetails = this.userData[this.selectedUser];
    this.modalWindow.show();
  }
  showDeleteModal(index){
    this.selectedUser = index;
    this.userdetails = this.userData[this.selectedUser];
    this.deleteModalWindow.show();
  }
  disableUser(){
    this.userdetails["enable"] = false;
    this.userservice.editUser(this.userdetails)
                .subscribe(result => {
                        this.message = result.message;
                });
    this.deleteModalWindow.hide();
  }
  
}