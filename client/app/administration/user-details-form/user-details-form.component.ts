import { Component, OnInit, Output, EventEmitter, Input, OnChanges } from '@angular/core';
import { Router } from '@angular/router';

import { UserService} from '../../_services/user.service';
import { Map} from '../../_services/messageMap';
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
@Output() emittedEvent: EventEmitter<any> = new EventEmitter();
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
                        if(Map[result.message] == "User Added"){
                          this.emittedEvent.emit(result.message);
                          this.router.navigate(["admin/users"]);
                        }                        
                        else
                        this.message = Map[result.message]
                        
                });
      }
      else{
        this.userservice.editUser(this.user)
                .subscribe(result => {
                        if(Map[result.message] == "User Data Updated")
                        this.emittedEvent.emit(result.message);
                        else
                        this.message = Map[result.message]
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
      this.emittedEvent.emit('NO_CHANGES');
  }
}
