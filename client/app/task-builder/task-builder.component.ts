import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PreviewService } from '../_services/preview.service';
import { TaskDataService } from '../_services/taskData.service';
import { ModalDirective } from 'ng2-bootstrap/modal';

declare var jQuery: any; // for template selection bnx, can be renmoved later
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
 templateOptions = [];
 SelectedTemplate="";
 SelectedStep = 0;
 selectedTab="";
 @ViewChild('modalWindow') public modalWindow:ModalDirective;
 constructor(private route: ActivatedRoute,private previewService:PreviewService ,private taskDataService:TaskDataService, 
    private router: Router) { 
	}

 ngOnInit(): void {
	 this.initialiseTaskData();
	 this.getTemplateOptions();
	//  jQuery(".templateList li").click(function(){
	// 	jQuery(this).addClass("selected").siblings().removeClass("selected"); 
	// 	});
 }
 selectTemplate($event){
	 jQuery($event.currentTarget).addClass("selected").siblings().removeClass("selected");
	 this.selectedTab = jQuery($event.currentTarget).text();
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
		// this.previewService.launchPreviewWindow(this.TaskData["id"]);
	}
	getTemplateOptions(){
			this.taskDataService.getTemplateOptions()
                     .subscribe(
                       data => this.templateOptions = data.templateOptions);
	}
	modalWindowUpdateListener(event,index){
		if(event == "show"){
			this.SelectedStep = index+1;
			this.modalWindow.show();			
		}
		else{
			this.modalWindow.hide();
		}
	}
	setTempalateMap(selectedTemplate){
		 this.SelectedTemplate= selectedTemplate;
	}
	callSetTemplate(){
		this.setTempalateMap(this.selectedTab);
	}
}
