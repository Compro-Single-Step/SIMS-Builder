import { Injectable } from '@angular/core';
import { AuthHttp } from 'angular2-jwt';
import { Router } from '@angular/router';

import { LoaderService } from './loader.service';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/finally';

@Injectable()
export class HttpClient {
  constructor(private authHttp: AuthHttp, private router: Router, private loaderService: LoaderService) {
   }

  get(url, options?,hideLoader?) {
    this.onStart(hideLoader);
    return this.getAuthObservable(this.authHttp.get(url, options)).finally(() => {
                this.onEnd();
            });
  }

  post(url, data, options?,hideLoader?) {
    this.onStart(hideLoader);
    return this.getAuthObservable(this.authHttp.post(url, data, options)).finally(() => {
                this.onEnd();
            });
  }
  put(url, data, options?,hideLoader?) {
    this.onStart(hideLoader);
    return this.getAuthObservable(this.authHttp.put(url, data, options)).finally(() => {
                this.onEnd();
            });
  }
  delete(url, options?,hideLoader?) {
    this.onStart(hideLoader);
    return this.getAuthObservable(this.authHttp.delete(url, options)).finally(() => {
                this.onEnd();
            });
  }
  private onEnd(): void {   
      this.loaderService.setLoaderVisibility(false);
    
  }

  private onStart(hideLoader?): void {
    if(!hideLoader){
      this.loaderService.setLoaderVisibility(true);
    }
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