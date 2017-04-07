import { Injectable } from '@angular/core';
import { AuthHttp } from 'angular2-jwt';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/of';
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
        obs.throw("unauthorized");
      }
      else{
        return obs;
      }
    })
    // .finally(function(abc){
    //   console.log(abc);
    //   debugger;
    // });
  }


}