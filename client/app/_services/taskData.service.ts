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
    if (this.templateOptions){  //check if data for the particular task already exists
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
      // body = this.mapTaskData(body);
      this.templateOptions = body;
      return body || { };
    }
  }
  getTaskTemplate(taskId: string, stepIndex: string): Observable<any> {
    let params = new URLSearchParams();
    params.set('TaskId', taskId.toUpperCase());
    params.set('StepIndex', stepIndex);
    return this.http.get("/api/fetchTaskData/taskTemplateMap",{ search: params })
                    .map(this.extractResponse.bind(this))
                    .catch(this.handleError);
    }
  private extractResponse(res: Response) {
      return res['_body'];
  }
  setTaskTemplate(taskId: string, stepIndex: string, templateId: string) {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.post("/api/fetchTaskData/taskTemplateMap", {TaskId:taskId.toUpperCase(), StepIndex:stepIndex, TemplateId:templateId}, options)
                    .map((res) =>{return res.json();})
                    .catch(this.handleError);
  }
}
