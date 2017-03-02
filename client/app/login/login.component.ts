import { Component, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { AuthService } from './auth.service';


@Component({
  selector: 'login',
  styleUrls: [ './login.style.scss' ],
  templateUrl: './login.template.html',
  host: {
    class: 'login-page app'
  }
})

export class Login {
  person = null;
  constructor(private router: Router, private auth: AuthService) {
    this.person = {
      username: "",
      password: ""

    }
  }
  onLogin() {
     this.auth.login(this.person);
  
  }
}

