import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';

@Injectable()
export class AuthService {
  isLoggedIn: boolean = false;
  loginval: boolean;
  // store the URL so we can redirect after logging in
  redirectUrl: string;
  constructor(private http: Http){}
  login(creds): Observable<boolean> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    
   return this.http.post("/authenticate",creds,options).map(this.extractData);
//    ((response) => { this.extractData =response;
//       console.log(this.extractData._body);
//       this.extractData._body=this.extractData.json();
//       if (this.extractData._body.success == true){
//         console.log("true");
//         this.isLoggedIn =true;
//       }
//       else {
//           this.isLoggedIn =false;
//       }
//    });
  }
    private extractData(res: Response) {
      let body = res.json();
      this.isLoggedIn = true;
      return body || { };
    }

  logout(): void {
    this.isLoggedIn = false;
  }
}
