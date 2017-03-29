import { Injectable } from '@angular/core';
import { Response, URLSearchParams }from '@angular/http';
import { HttpClient } from '../../_services/http.client';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

@Injectable()
export class DataService {

  constructor(private http:HttpClient ) { 
  }
  getTaskData(taskId: string) {
   let params = new URLSearchParams();
    params.set('TaskId', taskId);
    return this.http.get("/api/fetchTaskData",{ search: params })
                    .map(this.extractData)
                    .catch(this.handleError);
  }
  private extractData(res: Response) {
    let body = res.json();
    return body || { };
  }
  private handleError (error: Response | any) {
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
