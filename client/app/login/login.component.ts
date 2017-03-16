import { Component, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import {Observable} from 'rxjs/Observable';
import { AuthService } from '../auth.service';

@Component({
  selector: 'login',
  styleUrls: [ './login.style.scss' ],
  templateUrl: './login.template.html',
  encapsulation: ViewEncapsulation.None,
  host: {
    class: 'login-page app'
  }
})
export class Login {
  extractData;
  message: string;
  constructor(private router: Router,private authService:AuthService) {
  }
  authenticateUser(userName: string, Password: string): void{

    let creds = JSON.stringify({ username: userName, password: Password });
    this.authService.login(creds).subscribe((res) => {this.extractData = res;
      if(this.extractData.success == true){
        this.authService.isLoggedIn = true;
         let redirect = this.authService.redirectUrl ? this.authService.redirectUrl : '/app/homepage';
        // Redirect the user
        this.router.navigate([redirect]);
      }
    });      
  }
}
