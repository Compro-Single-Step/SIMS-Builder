import { Component, ViewChild, OnInit } from '@angular/core';
import { ModalDirective } from 'ng2-bootstrap/modal';

declare const $;

@Component({
    selector: 'app-test-report',
    templateUrl: './test-report.component.html',
    styleUrls: ['./test-report.component.scss']
})
export class PreviewModalComponent implements OnInit {

    @ViewChild('previewModalDialog') public PreviewModalDialog: ModalDirective;

    constructor() {
    }

    ngOnInit() {
    }

    setTaskData(taskID, stepIndex, templateID, stepText, appName) {
    }
}
