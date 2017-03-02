import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { tokenNotExpired } from 'angular2-jwt';
import 'rxjs/add/operator/map';

@Injectable()
export class AuthService {

  constructor(private http: Http) {}

  login(credentials) {
     console.log("Data" + JSON.stringify(credentials));
    this.http.post('http://localhost:3000/api/login', credentials)
      .map(res => res.json())
      .subscribe(
        // We're assuming the response will be an object
        // with the JWT on an id_token key
        data => localStorage.setItem('id_token', data.id_token),
        error => console.log(error)
      );
  }

  loggedIn() {
  return tokenNotExpired();
  }
}