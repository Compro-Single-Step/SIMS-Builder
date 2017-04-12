import { Injectable } from '@angular/core';
import { AuthHttp } from 'angular2-jwt';
import { LoaderService } from './loader.service';
import 'rxjs/add/operator/finally';

@Injectable()
export class HttpClient {

  constructor(private authHttp: AuthHttp, private loaderService: LoaderService) { }

  get(url, options?) {
    this.onStart();
    return this.authHttp.get(url, options).finally(() => {
                this.onEnd();
            });
  }
  post(url, data, options?) {
    this.onStart();
    return this.authHttp.post(url, data, options).finally(() => {
                this.onEnd();
            });
  }
  put(url, data, options?) {
    this.onStart();
    return this.authHttp.put(url, data, options).finally(() => {
                this.onEnd();
            });
  }
  delete(url, data, options?) {
    this.onStart();
    return this.authHttp.delete(url, options).finally(() => {
                this.onEnd();
            });
  }

  private onEnd(): void {
        this.loaderService.setLoaderVisibility(false);
  }

  private onStart(): void {
        this.loaderService.setLoaderVisibility(true);
  }

}