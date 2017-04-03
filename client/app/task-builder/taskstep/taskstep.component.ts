import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'taskbuilder-taskstep',
  templateUrl: './taskstep.component.html',
  styleUrls: ['./taskstep.component.scss']
})
export class TaskstepComponent implements OnInit {
@Input() stepData: Array<Object> = [];
step;
taskID;
errorMessage;
  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.step=this.stepData;
    this.route.params.subscribe((params: Params) => {
      this.taskID = params["id"];
    })
   }
   navigateToStepBuilder(){
     this.router.navigate(["task",this.taskID,"step",this.step.Index]);
   }
}
