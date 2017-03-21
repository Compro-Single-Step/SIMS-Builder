import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'taskbuilder-taskstep',
  templateUrl: './taskstep.component.html',
  styleUrls: ['./taskstep.component.scss']
})
export class TaskstepComponent implements OnInit {
@Input() stepData: Array<Object> = [];
step;
errorMessage;
  constructor() { }

  ngOnInit(): void {
    this.step=this.stepData;
   }
}
