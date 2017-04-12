import { Component, OnInit, Input, EventEmitter, Output, OnChanges } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { TaskDataService } from '../../_services/taskData.service';
import { MessageMap } from '../../shared/enums';

declare var Messenger: any;

@Component({
  selector: 'taskbuilder-taskstep',
  templateUrl: './taskstep.component.html',
  styleUrls: ['./taskstep.component.scss']
})
export class TaskstepComponent implements OnInit {
@Input() stepData: Array<Object> = [];
@Input() selectedTemplate;
@Input() selectedStep;
@Output() ModalWindowUpdateEvent: EventEmitter<any> = new EventEmitter();
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
      this.taskDataService.getTaskTemplate(this.taskID,this.step.Index)
                                  .subscribe(res => this.step.TemplateName = res);
    })
   }
   navigateToStepBuilder(){
     if(this.step.TemplateName!= "Not Selected")
      this.router.navigate(["task",this.taskID,"step",this.step.Index]);
     else
     this.ModalWindowUpdateEvent.emit("show");
      //this.modalWindow.show();
   }
   ngOnChanges(){
     if(this.selectedTemplate!="" && this.selectedStep == this.step.Index){
       this.step.TemplateName=this.selectedTemplate;
       this.taskDataService.setTaskTemplate(this.taskID,this.step.Index,this.step.TemplateName)
            .subscribe(res =>{
                this.message =MessageMap[res.message];
                if(this.message == "Task Template Updated"){
                  Messenger.options = { extraClasses: 'messenger-fixed messenger-on-top',
                        theme: 'block'}
                Messenger().post({
                  message: "The Template Id for the Step " + this.taskID.toUpperCase() + "-"+this.step.Index +" is now changed to " +this.step.TemplateName,
                  type: 'success',
                  showCloseButton: true,
                  hideAfter: 4
                });
               }                
                this.ModalWindowUpdateEvent.emit("hide");
                this.router.navigate(["task",this.taskID,"step",this.step.Index]);
            });
     }
   }
}
