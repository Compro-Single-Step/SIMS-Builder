import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

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
    // TODO: Dynamically create the GET URL (api/skill/uiconfig /<SKILL ID>)
    return this.http.get('api/skill/uiconfig/movecellcontent')
                        .map(this.extractData)
                        .catch(this.handleError);
  }
  saveSkillData (data: Object): Observable<Object> {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({ headers: headers });
    // TODO: Dynamically create the post URL (api/skill/taskstep/ <TASK ID> / <STEP NUMBER>)
    return this.http.post('api/skill/taskstep/task_1/2', { data } , options)
                    .map(this.extractData)
                    .catch(this.handleError);
  }
  private extractData(res: Response) {
    const body = res.json();
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
