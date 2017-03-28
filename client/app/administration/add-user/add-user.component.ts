import { Component, OnInit } from '@angular/core';
import { UserService} from '../../_services/user.service';
declare var jQuery: any;

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent implements OnInit {
user = {
  "firstname": "",
  "lastname":"",
  "username":"",
  "email":"",
  "password":"",
  "role":""
};
message='';
  constructor(private userservice: UserService) { }
addUser(): void{
  //add user service to store the user in the database and provide the output as the result 
   this.userservice.addUser(this.user)
            .subscribe(result => {
                    this.message = result.message;
            });
}
  ngOnInit() {
    jQuery('.parsleyjs').parsley();
  }

}
