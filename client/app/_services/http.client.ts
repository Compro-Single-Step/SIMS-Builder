import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { AuthHttp } from 'angular2-jwt';

@Injectable()
export class HttpClient {

  constructor(private http: Http, private authHttp: AuthHttp) { }


  get(url, options, notProtected) {
    let httpModule;
    if (notProtected) {
      httpModule = this.http;
    }
    else {
      httpModule = this.authHttp;
    }
    return httpModule.get(url,options, {
    });
  }

  post(url, data, options, notProtected) {
    let httpModule;
    if (notProtected) {
      httpModule = this.http;
    }
    else {
      httpModule = this.authHttp;
    }
    return httpModule.post(url, data, options, {
    });
  }
  
}