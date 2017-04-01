import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TaskDataService } from '../_services/taskData.service';


@Component({
  selector: 'taskSearch',
  templateUrl: 'tasksearch.component.html',
  styleUrls: [ 'tasksearch.component.scss' ]
  
})
export class TaskSearch implements OnInit{
  taskID: string = '';
  TaskData;
  errorMessage;
  message='';
  constructor(private router: Router, private dataService: TaskDataService){
  }
	ngOnInit(): void {

}
  onSearch() {
    this.dataService.getTaskData(this.taskID).subscribe(
                       taskData => {
                         this.TaskData = taskData;
                         if(this.TaskData == "Invalid task ID")
                          this.message="Such Task does not exist";
                         else
                          this.router.navigate(["/task",this.taskID]);
                        });
  }

}