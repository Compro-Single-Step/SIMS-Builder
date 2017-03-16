import { Component, OnInit, Input } from '@angular/core';
import { DataService } from './../shared/data-service.service';

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
    debugger;
   this.step=this.stepData;
  //   this.initialiseStepData();
  //   // this.step = this.Data.stepData[this.stepNo-1];
  // }
  // initialiseStepData() {
  //  var step=this.stepData;
  //   // this.Data.getStepData(taskId,stepId)
  //   //                  .subscribe(
  //   //                    stepData => this.step = stepData,
  //   //                    error =>  this.errorMessage = <any>error);
   }
}
