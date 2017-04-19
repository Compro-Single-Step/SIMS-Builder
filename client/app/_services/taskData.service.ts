import { Injectable } from '@angular/core';
import { Response, URLSearchParams, Headers, RequestOptions }from '@angular/http';
import { HttpClient } from './http.client';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';

import { Task } from './taskModel'
import { Step } from './stepModel'

@Injectable()
export class TaskDataService {

  public data: any;
  public taskId: any;
  public templateOptions: any;

  constructor(private http:HttpClient ) { 
  }
  
  getTaskData(taskId: string): Observable<Task> {
   let params = new URLSearchParams();
    params.set('TaskId', taskId);
    if (this.data && this.taskId.toUpperCase() == taskId.toUpperCase()){  //check if data for the particular task already exists
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
  getTemplateOptions(): Observable<any> {
    if (this.templateOptions){  //check if template options already exists.
      return Observable.of(this.templateOptions);
    }
    else{
    return this.http.get("/api/fetchTaskData/templateOptions")
                    .map(this.extractOptions.bind(this))
                    .catch(this.handleError);
    }
  }
  private extractOptions(res: Response) {
    let body = res.json();

    if(body.Error){
      return body.Error;
    }
    else{
      this.templateOptions = body;
      return body || { };
    }
  }
  setTaskTemplate(taskId: string , step: any, templateId: string) {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    let body;
    return this.http.post("/api/fetchTaskData/stepTemplate", {TaskId:taskId, Step:step, TemplateId:templateId}, options)
                    .map((res) =>{
                      body =res.json();
                      let index;
                      for(index=0;index<this.data.stepData.length&&this.data.stepData[index].Index!=body.stepData.Index;index++);
                      this.data.stepData[index] = body.stepData;
                      return res.json();})
                    .catch(this.handleError);
  }
}
