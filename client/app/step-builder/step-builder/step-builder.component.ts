import { Component, OnInit, ElementRef, ViewChild, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { BuilderDataService } from '../shared/builder-data.service';
import { EventService } from '../shared/event.service';
import { UIConfig } from '../../shared/UIConfig.model';
import { skillManager } from '../shared/skill-manager.service';
import { BuilderModelObj } from '../shared/builder-model.service';
import { PreviewService } from '../../_services/preview.service';
import { IntervalObservable } from 'rxjs/observable/IntervalObservable';
import { TaskDataService } from '../../_services/taskData.service';
import { ExceptionHandlerService } from '../../shared/exception-handler.service';
import { LoaderService } from '../../_services/loader.service';
import { ValidationService } from '../../shared/validation.service';

declare var jQuery;
declare var localForage;
declare var Messenger: any;

@Component({
    selector: 'app-step-builder',
    templateUrl: './step-builder.component.html',
    styleUrls: ['./step-builder.component.scss']
})

export class StepBuilderComponent implements OnInit, OnDestroy {
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
    templateID: string;
    eventSrvc: Object;
    previewWindow: any;
    @ViewChild('stepTextContainer') stepTextContainer;

    constructor(el: ElementRef, private route: ActivatedRoute, private router: Router, private bds: BuilderDataService, private previewService: PreviewService, private tds: TaskDataService, private exceptionHandlerSrvc: ExceptionHandlerService, private cdRef:ChangeDetectorRef,private LoaderService:LoaderService) {
        this.$el = jQuery(el.nativeElement);
        this.uiConfig = new UIConfig();
        this.selectedView = 1;
        this.builderModelSrvc = BuilderModelObj;
        this.eventSrvc = EventService;
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
        this.bindShowMoreButtonClick();        
        this.route.params.subscribe((params: Params) => {
            this.taskID = params["taskId"];
            this.stepIndex = params["stepIndex"];
            this.templateID = params["templateId"];
            this.tds.getTaskData(this.taskID).subscribe(taskData => {
                let stepData = taskData.stepData[parseInt(this.stepIndex) - 1];
                this.skillName = stepData.SkillName;
                this.templateName = stepData.TemplateName;
                
                //Replacing font colour to #fff
                let regex = /(<\s*font\s+.*?color\s*=\s*['"])(.*?)(['"].*?>)/gim;
                let customColor = "#feff92";
                this.stepText = stepData.Text.replace(regex, "$1"+customColor+"$3");

                this.cdRef.detectChanges();
                this.checkForStepTextOverflow();
            });
            this.fetchSkillData();
        })        
    }

    bindModelChecker($event) {
        //bind only when ui has been rendered for all the views. An event is emitted from view input area component.
        if($event.uiRendered == true)
        {
            this.modelChecker = IntervalObservable.create(5000).subscribe(() => this.checkForModelChange());
        }
    }

    checkForStepTextOverflow() {
        jQuery(".show-more a").each(function() {
            var $link = jQuery(this);
            var $content = $link.parents().find(".stepText");
            var $stepText = $link.parents().find(".stepTextHeading");

            var visibleHeight = $content[0].clientHeight;
            var actualHeight = $content[0].scrollHeight - 7;

            if (actualHeight > visibleHeight) {
                $link.show();
            } else {
                $link.hide();
                $stepText.addClass("hideEllipsis");
            }
        });
    }    

    bindShowMoreButtonClick() {
        var self = this;
        jQuery(".show-more a").on("click", function() {
            var $link = jQuery(this);
            var linkText = $link.text();

            var $content = $link.parents().find(".stepText");            
            $content.toggleClass("stepTextOverflowHidden");

            var $header = $link.parents().find("#header");
            $header.toggleClass("removeFixedHeight");

            var $stepText = $link.parents().find(".stepTextHeading");
            $stepText.toggleClass("hideEllipsis");

            $link.text(self.getShowLinkText(linkText));
            return false;
        });
    }

    getShowLinkText(currentText) {
        var newText = '';
        if (currentText.toUpperCase() === "SHOW MORE") {
            newText = "Show less";
        } else {
            newText = "Show more";
        }
        return newText;
    }

    fetchSkillData() {
        let params = {
            taskId: this.taskID,
            stepIndex: this.stepIndex,
            templateID: this.templateID
        };
        this.bds.getskilldata(params).subscribe((data) => {
            var self = this;
            this.builderModelSrvc.setDefaultState(data["skillmodel"]);
            this.builderModelSrvc.setState(data["stepuistate"] || data["skillmodel"]);
            localForage.setItem('model', this.builderModelSrvc.getState()).catch(function (err) {
                self.exceptionHandlerSrvc.globalConsole("Error while saving to Local Storage");
            });
            this.uiConfig = data["uiconfig"];
            skillManager.getSkillTranslator(data["skillfilesbundle"], this.templateID);
            //this.modelChecker = IntervalObservable.create(5000).subscribe(() => this.checkForModelChange());
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

    checkForModelChange(callBack?, CallBackOwner?, callBackArgs?) {
        let self = this;
        let itemDataModel = this.builderModelSrvc.getState();
        localForage.getItem('model').then(function (value) {
            if (JSON.stringify(value) === JSON.stringify(itemDataModel)) {
                self.exceptionHandlerSrvc.globalConsole("same Model: Do Nothing");
                if (callBack) {
                    callBack.apply(CallBackOwner || this, callBackArgs)
                        .subscribe((res) => {
                            self.launchPreview(res, self);
                        },
                        (error) => {                            
                            self.LoaderService.setLoaderVisibility(false);
                            error = error.json();
                            self.displayErrorMessage("Error occurred in Step preview : Please check your inputs");
                        }
                        );
                }
            } else {
                self.exceptionHandlerSrvc.globalConsole("Different Model: Update LocalStorage and Send to Sever");
                localForage.setItem('model', itemDataModel).then(function () {
                    self.bds.saveSkillData({ stepUIState: itemDataModel }, self.taskID, self.stepIndex).subscribe(function (data) {
                        if (data["status"] === "success") {
                            //TODO: Notify user of the draft save
                            self.exceptionHandlerSrvc.globalConsole("Model Data Sent to Server");
                            if(callBack){
                                callBack.apply(CallBackOwner || this, callBackArgs)
                                .subscribe((res) => {
                                    self.launchPreview(res, self);
                        },
                        (error) => {
                            self.LoaderService.setLoaderVisibility(false);
                            error = error.json();
                            self.displayErrorMessage("Error occurred in Step preview : Please check your inputs");
                        }
                        );
                            }
                        } else if (data["status"] === "error") {
                            //TODO: Try saving on server again
                            self.exceptionHandlerSrvc.globalConsole("Couldn't Save Model Data on Server.");

                            //Commenting this code because of Generic Error handling on server.
                            // if(data["errcode"] === "DATA_NOT_PRESENT"){
                            //     self.exceptionHandlerSrvc.globalLog("UI State is null. Please check");
                            // }
                        }
                    });
                });
            }
        });
    }

    launchPreview(res, currRef){
        let data = res.json();
        if (data["Url"]) {
            currRef.LoaderService.setLoaderVisibility(false);
            currRef.previewWindow = window.open(data["Url"], '_blank', 'location=yes,scrollbars=yes,status=yes');
        }
    }

    setSelectedView(viewNumber) {
        if(!ValidationService.validateViewAndShowErrors(ValidationService.getValidationErrorsObj("stepBuilder")["view"+viewNumber]))
            this.selectedView = viewNumber;
    }
    closeStepbuilder() {
        this.checkForModelChange()
        this.modelChecker.unsubscribe();
        this.router.navigate(["/task", this.taskID]);
    }
    onClose() {
        // TODO: Ask User if they really want to close the step builder
        this.closeStepbuilder();
    }

    lauchPreviewTask() {
        let callBackArgs = [this.taskID, this.stepIndex, this.templateID, this.stepTextContainer.nativeElement.textContent];
        this.checkForModelChange(this.previewService.launchStepPreviewWindow, this.previewService, callBackArgs);
    }
    onFinish() {
        this.closeStepbuilder();
    }

    ngOnDestroy() {
        this.eventSrvc["dispose"]();
        ValidationService.clearValidationErrorsObj("stepBuilder")
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
