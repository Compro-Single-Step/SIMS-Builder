import { Injectable } from '@angular/core';
import { Response, URLSearchParams }from '@angular/http';
import { HttpClient } from './http.client';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';

import { Task } from './taskModel'
import { Step } from './stepModel'

@Injectable()
export class TaskDataService {

  public data: any = undefined;
  public taskId: any = undefined;

  constructor(private http:HttpClient ) { 
  }
  
  getTaskData(taskId: string): Observable<Task> {
   let params = new URLSearchParams();
    params.set('TaskId', taskId);
    if (this.data && this.taskId == taskId){
      return Observable.of(this.data);
    }
    else{
    return this.http.get("/api/fetchTaskData",{ search: params })
                    .map(this.extractData.bind(this))
                    .catch(this.handleError);
  }
  }
  private extractData(res: Response) {
    let body = res.json();
    if(body.Error){
      return body.Error;
    }
    else{
      // body = this.mapTaskData(body);
      this.data = body;
      this.taskId = body.id;
      return body || { };
    }
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