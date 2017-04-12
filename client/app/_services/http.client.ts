import { Injectable } from '@angular/core';
import { AuthHttp } from 'angular2-jwt';
import { LoaderService } from './loader.service';
import 'rxjs/add/operator/finally';

@Injectable()
export class HttpClient {

  constructor(private authHttp: AuthHttp, private loaderService: LoaderService) { }

  get(url, options?, dontShowLoader?) {
    this.onStart(dontShowLoader);
    return this.authHttp.get(url, options).finally(() => {
                this.onEnd(dontShowLoader);
            });
  }
  post(url, data, options?,dontShowLoader?) {
    this.onStart(dontShowLoader);
    return this.authHttp.post(url, data, options).finally(() => {
                this.onEnd(dontShowLoader);
            });
  }
  put(url, data, options?, dontShowLoader?) {
    this.onStart(dontShowLoader);
    return this.authHttp.put(url, data, options).finally(() => {
                this.onEnd(dontShowLoader);
            });
  }
  delete(url, data, options?, dontShowLoader?) {
    this.onStart(dontShowLoader);
    return this.authHttp.delete(url, options).finally(() => {
                this.onEnd(dontShowLoader);
            });
  }

  private onEnd(dontShowLoader?): void {
    if(!dontShowLoader){
      this.loaderService.setLoaderVisibility(false);
    }
  }

  private onStart(dontShowLoader?): void {
    if(!dontShowLoader){
      this.loaderService.setLoaderVisibility(true);
    }
  }

}