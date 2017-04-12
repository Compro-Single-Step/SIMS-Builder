import { Injectable } from '@angular/core';
import { AuthHttp } from 'angular2-jwt';
import { LoaderService } from './loader.service';
import 'rxjs/add/operator/finally';

@Injectable()
export class HttpClient {

  constructor(private authHttp: AuthHttp, private loaderService: LoaderService) { }

  get(url, options?, hideLoader?) {
    this.onStart(hideLoader);
    return this.authHttp.get(url, options).finally(() => {
                this.onEnd(hideLoader);
            });
  }
  post(url, data, options?,hideLoader?) {
    this.onStart(hideLoader);
    return this.authHttp.post(url, data, options).finally(() => {
                this.onEnd(hideLoader);
            });
  }
  put(url, data, options?, hideLoader?) {
    this.onStart(hideLoader);
    return this.authHttp.put(url, data, options).finally(() => {
                this.onEnd(hideLoader);
            });
  }
  delete(url, data, options?, hideLoader?) {
    this.onStart(hideLoader);
    return this.authHttp.delete(url, options).finally(() => {
                this.onEnd(hideLoader);
            });
  }

  private onEnd(hideLoader?): void {
    if(!hideLoader){
      this.loaderService.setLoaderVisibility(false);
    }
  }

  private onStart(hideLoader?): void {
    if(!hideLoader){
      this.loaderService.setLoaderVisibility(true);
    }
  }

}