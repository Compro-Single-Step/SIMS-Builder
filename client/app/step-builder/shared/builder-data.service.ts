import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import { UIConfig } from '../../shared/UIConfig.model';

import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

@Injectable()
export class BuilderDataService {
  uiconfig: UIConfig;
  constructor(private http: Http) {
    this.uiconfig = new UIConfig();
  }
  getuiconfig(): Observable<UIConfig> {
    return this.http.get('skill/uiconfig/template_id1')
                        .map(this.extractData)
                        .catch(this.handleError);
  }
  private extractData(res: Response) {
    let body = res.json();
    return body || { };
  }
  private handleError (error: Response | any) {
    // In a real world app, you might use a remote logging infrastructure
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  }
}
