import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { HttpClient } from '../_services/http.client';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map'

@Injectable()
export class AuthService {
 public token: string;
  constructor(private httpClient: HttpClient) {
     // set token if saved in local storage
        var currentUser = JSON.parse(localStorage.getItem('currentUser'));
        this.token = currentUser && currentUser.token;
  }

  login(username: string, password: string): Observable<boolean> {
      //console.log(JSON.stringify({ username: username, password: password }));
          return this.httpClient.post('/api/login', { username: username, password: password })
            .map((response: Response) => {
                // login successful if there's a jwt token in the response
                let token = response.json() && response.json().token;
                //console.log('Token'+token);
                if (token) {
                    // set token property
                    this.token = token;

                    // localStorage.setItem('id_token', token);

                    // store username and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', JSON.stringify({ username: username, token: token }));

                    // return true to indicate successful login
                    return true;
                } else {
                    // return false to indicate failed login
                    return false;
                }
            });
    }


  logout(): void {
        // clear this token from user machine from local storage to log user out
        this.token = null;
       
        localStorage.removeItem('currentUser');
    }
}