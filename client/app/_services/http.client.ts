import { Injectable } from '@angular/core';
import { AuthHttp } from 'angular2-jwt';
import { Router } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';

@Injectable()
export class HttpClient {
  constructor(private authHttp: AuthHttp, private router: Router) {
   }

  get(url, options?) {
    return this.getAuthObservable(this.authHttp.get(url, options));
  }

  post(url, data, options?) {
    return this.getAuthObservable(this.authHttp.post(url, data, options));
  }
  put(url, data, options?) {
    return this.getAuthObservable(this.authHttp.put(url, data, options));
  }

  private getAuthObservable (obs) {
    return obs.catch((error)=>{
      let errMsg: string;
      if (error.status === 401) {
        this.router.navigate(['/login'], { queryParams: { returnUrl: this.router.url }});
        return [];
      }
      else{
        return obs;
      }
    })
  }


}