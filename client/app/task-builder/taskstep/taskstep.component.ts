import { Component, OnInit, Input, EventEmitter, Output, OnChanges } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { TaskDataService } from '../../_services/taskData.service';

@Component({
  selector: 'taskbuilder-taskstep',
  templateUrl: './taskstep.component.html',
  styleUrls: ['./taskstep.component.scss']
})
export class TaskstepComponent implements OnInit {
@Input() stepData: Array<Object> = [];
@Output() stepNavigationEvent: EventEmitter<any> = new EventEmitter();
step;
taskID;
errorMessage;
message;
  constructor(private route: ActivatedRoute, private router: Router, private taskDataService:TaskDataService) {
   }

  ngOnInit(): void {
    this.step=this.stepData;
    
    this.route.params.subscribe((params: Params) => {
      this.taskID = params["id"];
    })
   }
   navigateToStepBuilder(){
     this.stepNavigationEvent.emit(this.step.TemplateName);
   }
}
