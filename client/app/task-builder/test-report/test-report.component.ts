import { Component, ViewChild, OnInit } from '@angular/core';
import { ModalDirective } from 'ng2-bootstrap/modal';
import { TaskDataService } from '../../_services/taskData.service';

declare const Messenger: any;

@Component({
    selector: 'app-test-report',
    templateUrl: './test-report.component.html',
    styleUrls: ['./test-report.component.scss']
})
export class TestReportModalComponent implements OnInit {
    @ViewChild('testReportModalDialog') public TestReportModalDialog: ModalDirective;
    reportData: Object;
    reportHeader: Object;

    constructor(private taskDataService: TaskDataService) {
        this.reportData = {};
        this.reportHeader = ['Pathway Name', 'Method', 'Status'];
    }

    ngOnInit() {
        this.taskDataService.testReportData.subscribe((reportData) => {
            if (reportData) {
                try {
                    this.reportData['status'] = reportData.status;
                    this.reportData['pathways'] = [];
                    this.reportData['step'] = reportData.step;
                    const pathwayObj = reportData.pathways;
                    for (const pathwayName in pathwayObj) {
                        if (pathwayObj.hasOwnProperty(pathwayName)) {
                            const pathwayData = pathwayObj[pathwayName];
                            const obj = {};
                            obj['pathwayName'] = pathwayName;
                            obj['method'] = pathwayData[reportData.step]['method'];
                            obj['status'] = pathwayData.status;
                            if (pathwayData.status === 'Fail' || pathwayData.status === 'fail') {
                                obj['message'] = pathwayData.message;
                            }
                            this.reportData['pathways'].push(obj);
                        }
                    }
                    this.TestReportModalDialog.show();
                } catch (error) {
                    this.displayErrorMessage(error.message);
                }
            } else {
                this.displayErrorMessage(`Records doesn't exist in database.`);
            }
        }, (error) => {
            this.displayErrorMessage(error.message);
        });
    }

    displayErrorMessage(errorText) {
        Messenger.options = {
            extraClasses: 'messenger-fixed messenger-on-top',
            theme: 'block'
        }
        Messenger().post({
            message: errorText,
            type: 'error',
            showCloseButton: true,
            hideAfter: 5
        });
    }
}
