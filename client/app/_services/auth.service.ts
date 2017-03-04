import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map'

@Injectable()
export class AuthService {
 public token: string;
  constructor(private http: Http) {
     // set token if saved in local storage
        var currentUser = JSON.parse(localStorage.getItem('currentUser'));
        this.token = currentUser && currentUser.token;
  }

  login(username: string, password: string): Observable<boolean> {
      //console.log(JSON.stringify({ username: username, password: password }));
          return this.http.post('/api/login', { username: username, password: password })
            .map((response: Response) => {
                // login successful if there's a jwt token in the response
                let token = response.json() && response.json().token;
                //console.log('Token'+token);
                if (token) {
                    // set token property
                    this.token = token;

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