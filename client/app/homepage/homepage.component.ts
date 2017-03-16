import { Component, OnInit, EventEmitter,  Output} from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'taskSearch',
  templateUrl: 'homepage.component.html',
  styleUrls: [ 'homepage.component.scss' ]
  
})
export class HomePage implements OnInit{
  username: string = '';
  constructor(private router: Router){
  }
	ngOnInit(): void {
    console.log("asdasdasda");
    debugger;

}
  onSearch() {
    console.log('Search for task ', this.username, ' in Baloo');
    this.router.navigate(["/app/taskbuilder",this.username]);

  }
}
