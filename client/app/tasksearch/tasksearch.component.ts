import { Component, OnInit, EventEmitter,  Output} from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'taskSearch',
  templateUrl: 'tasksearch.component.html',
  styleUrls: [ 'tasksearch.component.scss' ]
  
})
export class TaskSearch implements OnInit{
  taskID: string = '';
  constructor(private router: Router){
  }
	ngOnInit(): void {

}
  onSearch() {
    console.log('Search for task ', this.taskID, ' in Baloo');
    this.router.navigate(["/task",this.taskID]);

  }
}
