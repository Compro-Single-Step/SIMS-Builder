import { Component, OnInit,AfterViewInit } from '@angular/core';
import { UserService} from '../../_services/user.service';
import { MessageMap } from '../../shared/enums';
import { LoaderService } from '../../_services/loader.service';
declare var Messenger: any;
@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent implements OnInit,AfterViewInit {
  constructor(private LoaderService: LoaderService) { }
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
   ngAfterViewInit() {  
      this.LoaderService.setLoaderVisibility(false);  
  }
}
