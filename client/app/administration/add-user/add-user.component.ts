import { Component, OnInit } from '@angular/core';
import { UserService} from '../../_services/user.service';
import { MessageMap } from '../../shared/enums';
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
  userDetailsChangedListener(message){
    if(MessageMap[message]!= "No Changes"){
      Messenger().post({
							message:MessageMap[message],
							type: 'success',
							showCloseButton: true,
							hideAfter: 4
							});
    }
  }
}
