import { Injectable } from '@angular/core';
import { AuthHttp } from 'angular2-jwt';

@Injectable()
export class HttpClient {

  constructor(private authHttp: AuthHttp) { }

  get(url, options?) {
    return this.authHttp.get(url, options);
  }
  post(url, data, options?) {
    return this.authHttp.post(url, data, options);
  }
  put(url, data, options?) {
    return this.authHttp.put(url, data, options);
  }
  delete(url, data, options?) {
    return this.authHttp.delete(url, options);
  }

}