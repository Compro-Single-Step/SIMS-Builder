import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { HttpClient } from '../../_services/http.client';

import { UIConfig } from '../../shared/UIConfig.model';

import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

@Injectable()
export class BuilderDataService {
  constructor(private httpClient: HttpClient) { }
  getuiconfig(params): Observable<UIConfig> {
    return this.httpClient.get('api/skill/stepuiconfig/uiconfig/movecellcontent')
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
