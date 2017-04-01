import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PreviewService } from '../_services/preview.service' 

@Component({
  selector: 'app-task-builder',
  templateUrl: './task-builder.component.html',
  styleUrls: ['./task-builder.component.scss']
})
export class TaskBuilderComponent implements OnInit {
 StepData;
 TaskData = {};
 AppImage;
 errorMessage;
 constructor(private route: ActivatedRoute,private previewService:PreviewService ,
    private router: Router) { 
	}

 ngOnInit(): void {
	 this.initialiseTaskData();
 }
initialiseTaskData() {
   	this.route.data
                     .subscribe(
                       taskData => this.TaskData = taskData,
                       error =>  this.errorMessage = <any>error);
					   if(this.TaskData["taskData"] == "Invalid task ID"){
						   this.router.navigate(["/"]);
					   }
					   else{
						this.TaskData = this.TaskData["taskData"];
						this.StepData = this.TaskData["stepData"];
						this.AppImage = this.ApplicationImage(this.TaskData["app"]);
					   }
					   
  }

	ApplicationImage(taskApp){
		return {
		"Excel": "assets/images/Excel.png",
		"Word": "assets/images/Word.png",
		"Access": "assets/images/Access.png",
		"PPT": "assets/images/PPT.png"
		}[taskApp] || "assets/images/Access.png" ;
	}
	lauchPreviewTask(){
		this.previewService.launchPreviewWindow(this.TaskData["id"]);
	}
}
