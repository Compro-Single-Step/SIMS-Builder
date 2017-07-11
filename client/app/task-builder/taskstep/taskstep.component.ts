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
    @Output() testReportEvent: EventEmitter<any> = new EventEmitter();
    step;
    taskID;
    errorMessage;
    message;
    status: string;
    processing: boolean;
    iconClass: string;
    textColor: string;
    constructor(private route: ActivatedRoute, private router: Router, private taskDataService: TaskDataService) {
        this.processing = true;
    }

    ngOnInit(): void {
        this.step = this.stepData;

        this.route.params.subscribe((params: Params) => {
            this.taskID = params["id"];
            this.updateStepStatus(this.step.Index, false);
        });
    }
    navigateToStepBuilder() {
        this.stepNavigationEvent.emit(this.step.TemplateId);
    }
    getStepReport(step, event) {
        if (this.status) {
            this.taskDataService.getReport(this.taskID, step)
                .subscribe((testReport) => {
                    this.taskDataService.testReportEmitEvent(testReport);
                }, (error) => {
                    this.processing = false;
                });
        }

        if (event) {
            event.stopPropagation();
        }
    }
    updateStepStatus(step, event) {
        this.processing = true;
        if (this.status) {
            this.addClass();
        } else {
            this.iconClass = 'disabled';
        }
        this.taskDataService.getTaskStatus(this.taskID, step)
            .subscribe((statusObj) => {
                this.processing = false;
                this.status = statusObj.status;
                if (this.status) {
                    this.addClass();
                }
            }, (error) => {
                this.processing = false;
            });

        if (event) {
            event.stopPropagation();
        }
    }
    addClass() {
        this.iconClass = 'enabled';
        if (this.status.toLocaleLowerCase() === 'pass') {
            this.textColor = 'text-success';
        } else if (this.status.toLocaleLowerCase() === 'fail') {
            this.textColor = 'text-fail';
        } else if (this.status.toLocaleLowerCase() === 'pending') {
            this.textColor = 'text-pending';
        } else {
            this.textColor = 'text-warning';
        }
    }
}
