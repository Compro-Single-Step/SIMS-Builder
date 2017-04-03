import { Component, OnInit, Input, OnChanges } from '@angular/core';
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
message='';
instance;
  constructor(private userservice: UserService) { 
    this.user = new User();
  }
addUser(): void{
  //add user service to store the user in the database and provide the output as the result 
    if(this.instance.isValid()){
      if(this.mode == "add" ){
        this.userservice.addUser(this.user)
                .subscribe(result => {
                        this.message = result.message;
                        
                });
      }
      else{
        this.userservice.editUser(this.user)
                .subscribe(result => {
                        this.message = result.message;
                });
      }
    }
    else return;
  }

  ngOnInit() {
    this.instance = jQuery('.parsleyjs').parsley();
  }
  ngOnChanges(){
    this.message='';
  }
}
