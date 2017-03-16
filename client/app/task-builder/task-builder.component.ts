import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

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
 constructor(private route: ActivatedRoute,
    private router: Router) { 
	}

 ngOnInit(): void {
	 this.initialiseTaskData();
	 debugger;
	//  this.StepData = this.TaskData["stepData"];
	//  this.TaskData = this.Data.taskData;
	//  this.StepData = this.Data.stepData;
	 //this .AppImage = this.ApplicationImage(this.TaskData.app)
	 this .AppImage ="assets/images/Excel.png"
	//  this.StepData = this.TaskData.stepData;
 }
initialiseTaskData() {
	var taskId= "SKL16.XL.04.01.03.T1";
	debugger;
   	this.route.data
                     .subscribe(
                       taskData => this.TaskData = taskData,
                       error =>  this.errorMessage = <any>error);
					   this.TaskData = this.TaskData["taskData"];
					   this.StepData = this.TaskData["stepData"];
  }
 ApplicationImage (taskApp){
	 switch (taskApp)
	 {
		 case "Excel" : {
			 return "assets/images/Excel.png";
		 }
		 case "Word" : {
			 return "assets/images/Word.png";
		 }
		 case "Access" : {
			 return "assets/images/Access.png";
		 }
		 case "PPT" : {
			 return "assets/images/PPT.png";
		 }
		 default : {
			 return "assets/images/Access.png";
		 };
	 }

 }
}
