import { Component, OnInit } from '@angular/core';
import { UserService} from '../../_services/user.service';
import { Map} from '../../_services/messageMap';
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
  emittedEventListener(message){
    if(Map[message]!= "No Changes"){
      Messenger().post({
							message:Map[message],
							type: 'success',
							showCloseButton: true,
							hideAfter: 4
							});
    }
  }
}
