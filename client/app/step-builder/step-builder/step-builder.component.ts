import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { BuilderDataService } from '../shared/builder-data.service';
import { UIConfig } from '../../shared/UIConfig.model';
import { skillManager } from '../shared/skill-manager.service';
import { BuilderModelObj } from '../shared/builder-model.service';
import { PreviewService } from '../../_services/preview.service';
import { IntervalObservable } from 'rxjs/observable/IntervalObservable';
import { TaskDataService } from '../../_services/taskData.service';

declare var jQuery;
declare var localForage;

@Component({
    selector: 'app-step-builder',
    templateUrl: './step-builder.component.html',
    styleUrls: ['./step-builder.component.scss']
})
export class StepBuilderComponent implements OnInit {
    uiConfig: UIConfig;
    $el: any;
    private selectedView: number;
    taskID: string;
    stepIndex: string;
    builderModelSrvc;
    skillName: string;
    templateName: string;
    stepText: string;
    modelChecker;
    loader: boolean;
    @ViewChild('stepTextContainer') stepTextContainer;

    constructor(el: ElementRef, private route: ActivatedRoute, private router: Router, private bds: BuilderDataService, private previewService: PreviewService, private tds: TaskDataService) {
        this.$el = jQuery(el.nativeElement);
        this.uiConfig = new UIConfig();
        this.selectedView = 1;
        this.builderModelSrvc = BuilderModelObj;
        this.loader = true;
    }

    ngOnInit() {
        localForage.config({
            name: 'SimsBuilder',
            version: 1.0,
            storeName: 'model', // Should be alphanumeric, with underscores.
            description: 'Model of the Current Task'
        });
        jQuery(window).on('sn:resize', this.initScroll.bind(this));
        this.initScroll();
        this.modelChecker = IntervalObservable.create(5000).subscribe(() => this.checkForModelChange());
        this.route.params.subscribe((params: Params) => {
            this.taskID = params["taskId"];
            this.stepIndex = params["stepIndex"];
            this.tds.getTaskData(this.taskID).subscribe(taskData => {
                let stepData = taskData.stepData[parseInt(this.stepIndex) - 1];
                this.skillName = stepData.SkillName;
                this.templateName = stepData.TemplateName;
                this.stepText = stepData.Text;
            });
            this.fetchSkillData();
        })
    }

    fetchSkillData() {
        let params = {
            taskId: this.taskID,
            stepIndex: this.stepIndex
        };
        this.bds.getskilldata(params).subscribe((data) => {
            this.builderModelSrvc.setModel(data["stepuistate"] || data["skillmodel"].model);
            localForage.setItem('model', this.builderModelSrvc.getModel()).catch(function (err) {
                console.warn("Error while saving to Local Storage");
            });
            this.uiConfig = data["uiconfig"];
            this.loader = false;
            skillManager.getSkillTranslator(data["skillfilesbundle"], "movecellcontent");
        });
    }

    initScroll(): void {
        let $primaryContent = this.$el.find('#body');
        if (this.$el.find('.slimScrollDiv').length !== 0) {
            $primaryContent.slimscroll({
                destroy: true
            });
        }
        $primaryContent.slimscroll({
            height: '100%',
            size: '6px',
            alwaysVisible: false
        });
    }

    checkForModelChange() {
        let self = this;
        let itemDataModel = this.builderModelSrvc.getModel();
        localForage.getItem('model').then(function (value) {
            if (JSON.stringify(value) === JSON.stringify(itemDataModel)) {
                console.log("same Model: Do Nothing");
            } else {
                console.log("Different Model: Update LocalStorage and Send to Sever");
                localForage.setItem('model', itemDataModel).then(function () {
                    self.bds.saveSkillData({ stepUIState: itemDataModel }, self.taskID, self.stepIndex).subscribe(function (data) {
                        if (data["status"] === "success") {
                            //TODO: Notify user of the draft save
                            console.log("Model Data Sent to Server");
                        } else if (data["status"] === "error") {
                            //TODO: Try saving on server again
                            console.log("Couldn't Save Model Data on Server.");
                        }
                    });
                });
            }
        });
    }
    setSelectedView(viewNumber) {
        this.selectedView = viewNumber;
    }
    closeStepbuilder () {
        this.checkForModelChange()
        this.modelChecker.unsubscribe();
        this.router.navigate(["/task", this.taskID]);
    }
    onClose() {
        // TODO: Ask User if they really want to close the step builder
        this.closeStepbuilder();
    }

    lauchPreviewTask() {
        this.previewService.launchStepPreviewWindow(this.taskID, this.stepIndex, "movecellcontent", this.stepTextContainer.nativeElement.textContent);
    }
    onFinish() {
        this.closeStepbuilder();
    }
}
