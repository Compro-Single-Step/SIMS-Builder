import { Injectable } from '@angular/core';
import { HttpClient } from '../_services/http.client';
import { URLSearchParams }from '@angular/http';

@Injectable()
export class PreviewService {
data;
previewWindow;
  constructor(private http: HttpClient) { }

  launchPreviewWindow(taskId:string,stepId?:string){
    let params = new URLSearchParams();
    params.set('taskId', taskId);
    if(stepId){
      params.set('stepNo', stepId);
    }
    this.http.get("/api/taskPreview",{ search: params })
                    .subscribe(
                      res => {
                        this.data = res.json();
                        if(this.data["Url"]){
                          this.previewWindow = window.open(this.data["Url"], '_blank', 'location=yes,scrollbars=yes,status=yes');
                          return this.previewWindow;
                        }
                        else{
                          return this.data["Error"]
                        }

                      
                    });

  }

}
