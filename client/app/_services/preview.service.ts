import { Injectable } from '@angular/core';
import { HttpClient } from '../_services/http.client';
import { URLSearchParams }from '@angular/http';

@Injectable()
export class PreviewService {
data;
previewWindow;
res;
  constructor(private http: HttpClient) { }

  launchStepPreviewWindow(taskId:string,stepId:string,templateId:string, stepText: string){
    let previewparams = new URLSearchParams();
    previewparams.set('taskId', taskId);
    previewparams.set('stepNo', stepId);
    this.http.post("/api/skill/xmlgeneration", {templateId: templateId,taskId: taskId, stepId: stepId, stepText: stepText})
        .subscribe(res =>{
          this.res = res.json();
          if(this.res.status == "success"){
            this.http.get("/api/taskPreview",{ search: previewparams })
                .subscribe(
                  res => {
                    this.data = res.json();
                    if(this.data["Url"]){
                      this.previewWindow = window.open(this.data["Url"], '_blank', 'location=yes,scrollbars=yes,status=yes');
                      return true;
                    }
                    else{
                      return this.data["Error"]
                    }

                });
          }
          else{
                      return this.res["Error"]
                    }
        });
        
  }
}


