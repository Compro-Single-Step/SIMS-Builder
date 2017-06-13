import { Injectable } from '@angular/core';
import { HttpClient } from '../_services/http.client';
import { URLSearchParams } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/switchMap';

@Injectable()
export class PreviewService {
  res;
  constructor(private http: HttpClient) { }

  previewTask(taskId: string, stepId: string, templateId: string, stepText: string) {
    let previewparams = new URLSearchParams();
    previewparams.set('taskId', taskId);
    previewparams.set('stepNo', stepId);
    return this.http.post("/api/skill/xmlgeneration", { templateId: templateId, taskId: taskId, stepId: stepId, stepText: stepText })
      .switchMap((res) => {
        this.res = res.json();
        if (this.res.status == "success") {
          return this.http.get("/api/taskPreview", { search: previewparams });
        }
        else {
          return Observable.throw(this.res["error"]);
        }
      })
  }

  getTestMethods(templateId: string){
    return this.http.get(`/api/skilltest/templates/${templateId}/methods`)
      .switchMap(methods => 
        methods.json()
      )
  }

  // getTestTemplateID(devTemplateID: string){
  //   return this.http.get(`/api/skilltest/templates/linkages?id=${devTemplateID}`)
  //     .switchMap(templateID => 
  //       templateID.json()
  //     )
  // }

  launchStepPreviewWindow(url: string){
    window.open(url, '_blank', 'location=yes,scrollbars=yes,status=yes')
  }

  startAutomationTest(config: Object){

  }
}


