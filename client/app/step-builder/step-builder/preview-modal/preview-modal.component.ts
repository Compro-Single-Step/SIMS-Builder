import { Component, ViewChild, OnInit } from '@angular/core';
import { ModalDirective } from 'ng2-bootstrap/modal';

import { PreviewService } from '../../../_services/preview.service';
import { LoaderService } from '../../../_services/loader.service';
import { BuilderModelObj } from '../../shared/builder-model.service';
import { skillManager } from '../../shared/skill-manager.service';
import { initialTestConfig } from './test-config';
import { stepsData } from './task-steps';

declare var Messenger: any;

@Component({
    selector: 'app-preview-modal',
    templateUrl: './preview-modal.component.html',
    styleUrls: ['./preview-modal.component.scss']
})
export class PreviewModalComponent implements OnInit {

    @ViewChild('previewModalDialog') public PreviewModalDialog: ModalDirective;

    taskInfo: Object;
    testMethods: Array<string>;
    finalTestConfig: Object;
    renderingConfig: Object;
    bindedValues: Object;
    launchScenario: string;
    previewWindow;
    builderModelSrvc;
    methodCheckboxes: Object;

    constructor(private previewService: PreviewService, private LoaderService: LoaderService) {
        this.taskInfo = {};
        this.testMethods = [];
        this.renderingConfig = {
            "environment": []
        };
        this.bindedValues = {};
        this.finalTestConfig = { "script": {}, "run": {} };
        this.builderModelSrvc = BuilderModelObj;
        this.methodCheckboxes = {};
    }

    ngOnInit() {
    }

    setTaskData(taskID, stepIndex, templateID, stepText) {
        this.taskInfo["taskID"] = taskID;
        this.taskInfo["stepIndex"] = stepIndex;
        this.taskInfo["devTemplateID"] = templateID;
        this.taskInfo["stepText"] = stepText;

        //If check to stop server calls on every click of preview button
        if (!this.taskInfo["testTemplateID"]) {
            //Fetch test template ID
            // this.previewService.getTestTemplateID(this.taskInfo["devTemplateID"])
            //     .subscribe((testTemplateID) => {
            //         this.taskInfo["testTemplateID"] = testTemplateID;

            //         //Fetch All Test Methods
            //         this.previewService.getTestMethods(this.taskInfo["testTemplateID"])
            //             .subscribe(methodsObj => {

            //                 for (let obj of methodsObj.methods) {
            //                     this.testMethods.push(`M${obj.index + 1} - ${obj.type}`);
            //                 }
            //             });

            //         //Show Modal Dialog
            //         //this.PreviewModalDialog.show();
            //     });

            //Rendering step and methods
            this.renderingConfig["environment"] = initialTestConfig["options"]["environment"];
            this.renderingConfig["steps"] = [];
            let steps = stepsData;
            for (const key in steps) {
                if (steps.hasOwnProperty(key)) {
                    this.renderingConfig["steps"].push(steps[key]);
                    const step = this.renderingConfig["steps"][key];
                    this.methodCheckboxes[key] = {};
                    this.renderingConfig["steps"][parseInt(key) - 1]["methods"].forEach((element) => {
                        element.index = parseInt(element.index) + 1;
                        this.methodCheckboxes[key][element.index] = false;
                    });
                }
            }
            //TO BE REMOVED
            this.taskInfo["testTemplateID"] = stepsData[stepIndex]["test_template_id"];

            //Fill Default values
            this.bindedValues = {
                "launchScenario": "preview",
                "environment": initialTestConfig["defaults"]["environment"],
                "browser": initialTestConfig["defaults"]["browser"],
                "os": initialTestConfig["defaults"]["os"],
                "screenresolution": "1200X900",
                "brversion": 1,
            }

            this.updateOSList();
            this.updateBrowserList();
        }
        this.PreviewModalDialog.show();
    }

    runPreview() {
        if (this.bindedValues["launchScenario"] === "preview") {
            //Launch Preview Simulation
            this._previewTask((data) => {
                if (data["Url"]) {
                    this.previewWindow = this.previewService.previewSimulation(data["Url"]);
                    this.LoaderService.setLoaderVisibility(false);
                }
            });
        }
        else if (this.bindedValues["launchScenario"] === "test") {
            //Configure the payload JSON to be send to the server for Automation Testing
            this._configurePayload();

            //Launch Automation Test
            this._previewTask((data) => {
                if (data["Url"]) {
                    this.LoaderService.setLoaderVisibility(false);
                    this.finalTestConfig["run"]["config"]["app"]["url"] = data["Url"];
                    this.previewService.startAutomationTest(this.finalTestConfig)
                    // .subscribe(response=>{

                    // },
                    // error=>{
                    //     this.displayErrorMessage("Error occurred in Automation Test, please check your test config.");
                    // });
                }
            });
        }
        else { }

        this.PreviewModalDialog.hide();
    }

    updateOSList() {
        this.renderingConfig["os"] = initialTestConfig["options"]["os"][this.bindedValues["environment"]];
    }

    updateBrowserList() {
        this.renderingConfig["browser"] = initialTestConfig["options"]["browser"][this.bindedValues["os"]];
    }

    updateMethodsCheckbox({ event, stepNumber }) {
        let isChecked = event.target.checked;
        for (let methodNumber in this.methodCheckboxes[stepNumber]) {
            this.methodCheckboxes[stepNumber][methodNumber] = isChecked;
        }
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

    private _previewTask(callback) {
        this.previewService.previewTask(this.taskInfo["taskID"], this.taskInfo["stepIndex"], this.taskInfo["devTemplateID"], this.taskInfo["stepText"])
            .subscribe(response => {
                let data = response.json();
                callback(data);
            },
            (error) => {
                this.LoaderService.setLoaderVisibility(false);
                error = error.json();
                this.displayErrorMessage("Error occurred in Step preview, please check your inputs.");
            });
    }

    private _configurePayload() {
        //Calculate Task Scenario
        this.finalTestConfig["script"] = this._configureTaskScenario(this.taskInfo);

        //Calculate params
        let stepUIState = this.builderModelSrvc.getState();
        let testParams = stepUIState["testParams"];
        this.finalTestConfig["script"]["params"] = this.builderModelSrvc.evaluateParams(stepUIState, testParams, skillManager.skillTranslator);

        //Calculate methods config
        this.finalTestConfig["script"]["methods"] = this._configureMethodsConfig(this.methodCheckboxes)

        //calculate run params
        this.finalTestConfig["run"]["config"] = this._configureRunParams(this.bindedValues);
    }

    private _configureTaskScenario(taskInfo) {
        return {
            test_template_id: taskInfo["testTemplateID"],
            step_number: taskInfo["stepIndex"],
            task_id: taskInfo["taskID"]
        }
    }

    private _configureMethodsConfig(methodCheckboxConfig) {
        let tempObj = {}
        for (let stepNumber in methodCheckboxConfig) {
            tempObj[stepNumber] = [];
            for (let methodNumber in methodCheckboxConfig[stepNumber]) {
                if (methodCheckboxConfig[stepNumber][methodNumber])
                    tempObj[stepNumber].push(methodNumber);
            }
        };
        return tempObj;
    }

    private _configureRunParams(runParamConfig) {
        return {
            "env": runParamConfig["environment"],
            "os": runParamConfig["os"],
            "resolution": runParamConfig["screenresolution"],
            "app": {
                "url": "",
                "public": "false",
                "build": ""
            },
            "browser": {
                "node": "aws",
                "name": runParamConfig["browser"],
                "version": runParamConfig["brversion"],
            }
        }
    }
}
