import { Component, OnInit, Output, EventEmitter, Input, OnChanges } from '@angular/core';
import { Router } from '@angular/router';

import { UserService} from '../../_services/user.service';
import { User } from '../../_services/userModel';

declare var jQuery: any;

@Component({
  selector: 'app-user-details-form',
  templateUrl: './user-details-form.component.html',
  styleUrls: ['./user-details-form.component.scss']
})
export class UserDetailsFormComponent implements OnInit, OnChanges {
@Input() title:string;
@Input() user;
@Input() mode;
@Output() closeFormEvent: EventEmitter<any> = new EventEmitter();
message='';
ParsleyForm;
  constructor(private userservice: UserService, private router:Router) { 
    this.user = new User();
  }
addUser(): void{
  //add user service to store the user in the database and provide the output as the result 
    if(this.ParsleyForm.isValid()){
      if(this.mode == "add" ){
        this.userservice.addUser(this.user)
                .subscribe(result => {
                        if(result.message == "User Added"){
                          this.closeFormEvent.emit(result.message);
                          this.router.navigate(["admin/users"]);
                        }                        
                        else
                        this.message = result.message;
                        
                });
      }
      else{
        this.userservice.editUser(this.user)
                .subscribe(result => {
                        if(result.message == "User Data Updated")
                        this.closeFormEvent.emit(result.message);
                        else
                        this.message = result.message;
                });
      }
    }
    else return;
  }

  ngOnInit() {
    this.ParsleyForm = jQuery('.parsleyjs').parsley();
  }
  ngOnChanges(){
    this.message='';
  }
  closeForm(){
      if(this.mode == "add")
      this.router.navigate(["admin/users"]);
      else
      this.closeFormEvent.emit('');
  }
}
