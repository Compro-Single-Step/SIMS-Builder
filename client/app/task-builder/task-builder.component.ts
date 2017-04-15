import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PreviewService } from '../_services/preview.service';
import { TaskDataService } from '../_services/taskData.service';
import { ModalDirective } from 'ng2-bootstrap/modal';

import { MessageMap } from '../shared/enums';

declare var Messenger: any;
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
 SelectedStep ;
 selectedTemplateOption="";
 @ViewChild('selectTemplateDialog') public SelectTemplateDialog:ModalDirective;
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
 selectTemplate($event,selectedTemplate){
	 jQuery($event.currentTarget).addClass("selected").siblings().removeClass("selected");
	 this.selectedTemplateOption = selectedTemplate;
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
	stepNavigationListner(steptemplate,stepIndex){
		this.SelectedStep = this.TaskData["stepData"][stepIndex];
		if(steptemplate!= "NotSelected")
			this.router.navigate(["task",this.TaskData["id"],"step",this.SelectedStep.Index,"template",steptemplate]);
		else{
			this.SelectTemplateDialog.show();
		}
	}
	setTempalateMap(selectedTemplate){
		this.taskDataService.setTaskTemplate(this.TaskData["id"],this.SelectedStep.Index,selectedTemplate.id)
				.subscribe(res =>{
					if(MessageMap[res.message] == "Task Template Updated"){
						this.displayMessage("The Template Id for the Step " + this.TaskData["id"].toUpperCase() + "-"+this.SelectedStep.Index +" is now changed to " +selectedTemplate.name);
						this.SelectTemplateDialog.hide();
						this.SelectedStep.TemplateName=selectedTemplate.name;
						this.SelectedStep.TemplateId=selectedTemplate.id;
						this.router.navigate(["task",this.TaskData["id"],"step",this.SelectedStep.Index,"template",this.SelectedStep.TemplateId]);
					}
					else{
						this.displayMessage("Some Database Error Occured!!");
					}
					
				});
	}
	callSetTemplate(){
		this.setTempalateMap(this.selectedTemplateOption);
	}
	displayMessage(messageText){
		Messenger.options = { extraClasses: 'messenger-fixed messenger-on-top',
							theme: 'block'}
					Messenger().post({
					message:messageText,
					type: 'success',
					showCloseButton: true,
					hideAfter: 3
					});
		}	          
}
