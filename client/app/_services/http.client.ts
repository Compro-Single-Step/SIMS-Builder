import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { AuthHttp } from 'angular2-jwt';

@Injectable()
export class HttpClient {

  constructor(private http: Http, private authHttp: AuthHttp) { }

  getHTTPInstance(isProtected) {
    let httpModule;
    httpModule = this.authHttp;
    if (isProtected === false) {
      httpModule = this.http;
    }
    return httpModule;
  }

  get(url, options?, bProtected?) {
    let httpModule;
    httpModule = this.getHTTPInstance(bProtected);
    return httpModule.get(url, options, {
    });
  }

  post(url, data, options?, bProtected?) {
    let httpModule;
    httpModule = this.getHTTPInstance(bProtected);
    return httpModule.post(url, data, options, {
    });
  }

}