import { Component, ViewChild, OnInit } from '@angular/core';
import { ModalDirective } from 'ng2-bootstrap/modal';

import { PreviewService } from '../../../_services/preview.service';
import { LoaderService } from '../../../_services/loader.service';
import { BuilderModelObj } from '../../shared/builder-model.service';
import { skillManager } from '../../shared/skill-manager.service';


@Component({
  selector: 'app-preview-modal',
  templateUrl: './preview-modal.component.html',
  styleUrls: ['./preview-modal.component.scss']
})
export class PreviewModalComponent implements OnInit {

  @ViewChild('previewModalDialog') public PreviewModalDialog: ModalDirective;

  taskInfo: Object;
  testMethods: Array<string>;
  testConfig: Object;
  launchScenario: string;
  previewWindow;
  builderModelSrvc;

  constructor(private previewService: PreviewService, private LoaderService: LoaderService) {
    this.taskInfo = {};
    this.testMethods = [];
    this.testConfig = { "script": {}, "run": {} };
    this.launchScenario = "preview";
    this.builderModelSrvc = BuilderModelObj;
  }

  ngOnInit() {

  }

  getTaskData(taskID, stepIndex, templateID, stepText) {
    this.taskInfo["taskID"] = taskID;
    this.taskInfo["stepIndex"] = stepIndex;
    this.taskInfo["devTemplateID"] = templateID;
    this.taskInfo["stepText"] = stepText;

    //If check to stop server calls on every click of preview button
    this.taskInfo["testTemplateID"] = "Dummy" //To be removed
    if (!this.taskInfo["testTemplateID"]) {

      //Fetch test template ID
      this.previewService.getTestTemplateID(this.taskInfo["devTemplateID"])
        .subscribe(testTemplateID => {
          this.taskInfo["testTemplateID"] = testTemplateID;

          //Fetch All Test Methods
          this.previewService.getTestMethods(this.taskInfo["testTemplateID"])
            .subscribe(methodsObj => {
              for (let obj of methodsObj.methods) {
                this.testMethods.push(`M${obj.index + 1} - ${obj.type}`)
              }
            });

          //Show Modal Dialog
          this.PreviewModalDialog.show();
        });
    }
    else {
      this.PreviewModalDialog.show();
    }
  }

  runPreview() {
    if (this.launchScenario === "preview") {
      this._previewTask(data => {
        if (data["Url"]) {
          this.previewWindow = this.previewService.launchStepPreviewWindow(data["Url"]);
          this.LoaderService.setLoaderVisibility(false);
        }
      })
    }
    else {
      //Calculate Task Scenerio
      this.testConfig["script"] = {
        test_template_id: this.taskInfo["testTemplateID"],
        step_number: this.taskInfo["stepIndex"],
        task_id: this.taskInfo["taskID"]
      }

      //Calculate params
      let testParams = this.builderModelSrvc.getState()["testParams"];
      this.testConfig["script"]["params"] = {};

      for (let key in testParams) {
        if (typeof testParams[key] === "object" && testParams[key] !== null) {
          let func = testParams[key]["function-name"];
          let params = testParams[key]["params"];
          this.testConfig["script"]["params"][key] = skillManager.skillTranslator[func](params);
        }
        else
          this.testConfig["script"]["params"][key] = testParams[key];
      }

      //Test Methods

      //Run Config

      //Launch Automation Test
      this._previewTask(data => {
        this.previewService.startAutomationTest(this.testConfig);
        this.LoaderService.setLoaderVisibility(false);
      })
    }

    this.PreviewModalDialog.hide();
  }

  private _previewTask(callback) {
    this.previewService.previewTask(this.taskInfo["taskID"], this.taskInfo["stepIndex"], this.taskInfo["devTemplateID"], this.taskInfo["stepText"])
      .subscribe(response => {
        let data = response.json();
        callback(data);
      },
      error => {
        this.LoaderService.setLoaderVisibility(false);
        error = error.json();
        console.error("Error occurred in Step preview, please check your inputs. Error: ", error);
      });
  }

}
