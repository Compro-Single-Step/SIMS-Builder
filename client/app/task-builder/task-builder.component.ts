import { Component, OnInit } from '@angular/core';
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
 }
initialiseTaskData() {
   	this.route.data
                     .subscribe(
                       taskData => this.TaskData = taskData,
                       error =>  this.errorMessage = <any>error);
					   this.TaskData = this.TaskData["taskData"];
					   this.StepData = this.TaskData["stepData"];
					   this.AppImage = this.ApplicationImage(this.TaskData["app"]);
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
