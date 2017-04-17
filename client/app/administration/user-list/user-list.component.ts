import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalDirective } from 'ng2-bootstrap/modal';
import { UserService} from '../../_services/user.service';
import { User } from '../../_services/userModel';
import { MessageMap } from '../../shared/enums';
declare var jQuery: any;
declare var Messenger: any;


@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})

export class UserListComponent implements OnInit {
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
   this.initializeUserData();
   Messenger.options = { extraClasses: 'messenger-fixed messenger-on-top',
							theme: 'block'}
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
                       Data => this.userData = Data["userData"],
                       error =>  this.errorMessage = <any>error);
  }
  showUpdateModal(index) {
    this.selectedUser = index;
    var user2 = JSON.parse(JSON.stringify(this.userData)); // to make a new reference fo user data
    this.userdetails = user2[this.selectedUser];
    this.modalWindow.show();
  }
  showDeleteModal(index){
    this.selectedUser = index;
    var user2 = JSON.parse(JSON.stringify(this.userData));
    this.userdetails = user2[this.selectedUser];
    this.deleteModalWindow.show();
  }
  disableUser(){
    this.userdetails["enable"] = false;
    this.userservice.editUser(this.userdetails)
                .subscribe(result => {
                        this.message = MessageMap[result.message];
                });
    this.deleteModalWindow.hide();
  }
  userDetailsChangedListener(Message){
    if(MessageMap[Message]!="No Changes"){
      if(MessageMap[Message] == "User Data Updated"){
        this.userservice.getUsers()
                       .subscribe(
                       Data => this.userData = Data,
                       error =>  this.errorMessage = <any>error);
                             Messenger().post({
                                message: MessageMap[Message],
                                type: 'success',
                                showCloseButton: true,
                                hideAfter: 2
                                });
      }
      
    }
    this.modalWindow.hide();
  }
  
}