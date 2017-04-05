import { Component, OnInit } from '@angular/core';
import { UserService} from '../../_services/user.service';
declare var Messenger: any;
@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent implements OnInit {
  constructor() { }
  ngOnInit() {
     Messenger.options = { extraClasses: 'messenger-fixed messenger-on-top',
							theme: 'block'}
   }
  closeFormEventListener(message){
    if(message){
      Messenger().post({
							message: message,
							type: 'success',
							showCloseButton: true,
							hideAfter: 4
							});
    }
  }
}
