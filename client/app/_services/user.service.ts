import { Injectable } from '@angular/core';
import { Response, URLSearchParams, Headers, RequestOptions }from '@angular/http';
import { HttpClient } from './http.client';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';

import { User } from './userModel';
@Injectable()
export class UserService {
public userData: any;
public currentUser: any;

 constructor(private http:HttpClient ) { 
  }
  getUsers(): Observable<User[]>{
    if(this.userData){
      return Observable.of(this.userData);
    }
    return this.http.get("/api/user/fetchUser")
                    .map(this.extractData.bind(this))
                    .catch(this.handleError);
  }
  private extractData(res: Response) {
    let body = res.json();
    this.userData = body;
    return body || { };
  }
  private handleError (error: Response | any) {
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  }
  getUser(name:string): Observable<User> {
    if(this.currentUser && this.currentUser.username == name){
      return Observable.of(this.currentUser);
    }
    let params = new URLSearchParams();
    params.set('username', name);
    return this.http.get("/api/user/fetchUser",{ search: params })
                    .map(this.extractUser.bind(this))
                    .catch(this.handleError);
  }
  private extractUser(res: Response) {
    let body = res.json();
    body=body[0];
    this.currentUser = body;
    return body || { };
  }
  addUser(newUser:User) {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.post("/api/user/addUser", newUser, options)
                    .map(this.extractResponse)
                    .catch(this.handleError);
  }
   private extractResponse(res: Response) {
    let body = res.json();
    return body || { };
  }
}
