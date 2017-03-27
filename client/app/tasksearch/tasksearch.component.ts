import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../_services/data.service';


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
  constructor(private router: Router, private dataService: DataService){
  }
	ngOnInit(): void {

}
  onSearch() {
    console.log('Search for task ', this.taskID, ' in Baloo');
    this.dataService.getTaskData(this.taskID).subscribe(
                       taskData => {
                         this.TaskData = taskData;
                         if(this.TaskData == "Invalid task ID")
                          this.message="Such Task doesnot exist";
                         else
                          this.router.navigate(["/task",this.taskID]);
                        });
  }

}