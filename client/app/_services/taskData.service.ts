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
export class DataService {

  public data: any = undefined;
  public task: any = undefined;

  constructor(private http:HttpClient ) { 
  }
  
  getTaskData(taskId: string): Observable<Task> {
   let params = new URLSearchParams();
    params.set('TaskId', taskId);
    if (this.data && this.task == taskId){
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
      this.task = body.id;
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
  // mapTaskData(res){
  //   var taskData: Task = new Task();
  //   taskData.id = res.TaskFriendlyID,
  //   taskData.app = this.getAppName(res.TaskFriendlyID),
  //   taskData.testStatus = true,
  //   taskData.commitStatus = true,
  //   taskData.stepData = this.getScenario(res.ScenarioItemList);
  //   taskData.previewUrl = "preview/"+res.TaskFriendlyID,
  //   taskData.testUrl = "test/"+res.TaskFriendlyID
  //   return taskData;
  // }
  // getAppName(taskid){
  //   var app = taskid.split(".")[1] // first part of the task id 
  //   app = app.split("").reverse().join("")  //reverse the string
  //   app = app.replace(parseInt(app).toString(),"");  //remove integer part from the same
  //   app = app.split("").reverse().join("")
  //   return {
	// 	"XL": "Excel",
	// 	"WD": "Word",
	// 	"AC": "Access",
	// 	"PPT": "PPT"
  //   }[app] || "Access" ;     
  // }
  //  getStepData(item,index){
  //   var step: Step = new Step();
  //   step.stepIndex = item.ScenarioOrder;
  //   step.stepText = item.QuesText;
  //   step.stepDetails.SkillName = "Demo Skill";
  //   step.stepDetails.MethodCount  = item.ScenarioPathwayList.length;
  //   step.stepDetails.TemplateName = "Demo Template";
  //   step.stepTestStatus = true;
  //   return step;
  //  }
  // getScenario(sdata){
  //   return sdata.map(this.getStepData);  
  // }
}
