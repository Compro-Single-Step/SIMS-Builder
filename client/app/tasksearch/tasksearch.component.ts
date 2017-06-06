import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { TaskDataService } from '../_services/taskData.service';
import { LoaderService } from '../_services/loader.service';


@Component({
  selector: 'taskSearch',
  templateUrl: 'tasksearch.component.html',
  styleUrls: [ 'tasksearch.component.scss' ]
  
})
export class TaskSearch implements OnInit, AfterViewInit{
  taskID: string = '';
  TaskData;
  errorMessage;
  message='';
  constructor(private router: Router, private dataService: TaskDataService, private LoaderService: LoaderService){
  }
	ngOnInit(): void {

}
  onSearch() {
    this.dataService.getTaskData(this.taskID).subscribe(
                       taskData => {
                         this.TaskData = taskData;
                         if(this.TaskData == "Invalid task ID"){
                            this.message="Such Task does not exist";
                           this.LoaderService.setLoaderVisibility(false);
                         }
                         else
                          this.router.navigate(["/task",this.taskID]);
                        });
  }

   ngAfterViewInit(){
        console.log('After View Init');
         this.LoaderService.setLoaderVisibility(false);

    }


}