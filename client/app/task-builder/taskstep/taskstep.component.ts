import { Component, OnInit, Input } from '@angular/core';
import { DataService } from './../shared/data.service';

@Component({
  selector: 'taskbuilder-taskstep',
  templateUrl: './taskstep.component.html',
  styleUrls: ['./taskstep.component.scss']
})
export class TaskstepComponent implements OnInit {
@Input() stepData: Array<Object> = [];
step;
errorMessage;
  constructor(private Data: DataService) { }

  ngOnInit(): void {
    this.step=this.stepData;
   }
}
