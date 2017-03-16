import { Component, OnInit, EventEmitter,  Output} from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'taskSearch',
  templateUrl: 'homepage.component.html',
  styleUrls: [ 'homepage.component.scss' ]
  
})
export class HomePage implements OnInit{
  taskID: string = '';
  constructor(private router: Router){
  }
	ngOnInit(): void {

}
  onSearch() {
    console.log('Search for task ', this.taskID, ' in Baloo');
    this.router.navigate(["/app/taskbuilder",this.taskID]);

  }
}
