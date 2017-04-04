import { Injectable } from '@angular/core';
import { Response, Headers, RequestOptions } from '@angular/http';
import { HttpClient } from '../../_services/http.client';

import { UIConfig } from '../../shared/UIConfig.model';

import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

@Injectable()
export class BuilderDataService {
  uiconfig: UIConfig;
  constructor(private httpClient: HttpClient) { 
    this.uiconfig = new UIConfig();
  }
  getskilldata(params): Observable<UIConfig> {
    return this.httpClient.get(`api/skill/stepuiconfig/movecellcontent/${params.id}/${params.stepIndex}`)
      .map(this.extractData)
      .catch(this.handleError);
  }
  saveSkillData (data: Object, taskId, stepIndex): Observable<Object> {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({ headers: headers });
    // TODO: Dynamically create the post URL (api/skill/taskstep/ <TASK ID> / <STEP NUMBER>)
    return this.httpClient.post(`api/skill/stepuistate/${taskId}/${stepIndex}`, data, options)
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
