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
    this.testConfig = { "script": {}, "run": {} };
    this.launchScenario = "preview";
    this.builderModelSrvc = BuilderModelObj;
  }

  ngOnInit() {

    //Fetch All Test Methods
    // this.previewService.getTestMethods(this.taskInfo["templateID"])
    //   .subscribe(methods => {
    //     this.testMethods = methods;
    //   });
  }

  runPreview() {
    if (this.launchScenario === "preview") {
      this.previewTask(data =>{
        if (data["Url"]) {
            this.LoaderService.setLoaderVisibility(false);
            this.previewWindow = this.previewService.launchStepPreviewWindow(data["Url"]);
          }
      })
    }
    else {
      //Calculate Task Scenerio
      this.testConfig["script"] = {
        dev_template_id: this.taskInfo["templateID"],
        step_number: this.taskInfo["stepIndex"],
        task_id: this.taskInfo["taskID"]
      }

      //Calculate params
      let testParams = this.builderModelSrvc.getState()["testParams"];
      this.testConfig["script"]["params"] = {};
      
      for(let key in testParams){
        if(typeof testParams[key] === "object" && testParams[key] !== null){
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
      this.previewTask(data =>{
        this.LoaderService.setLoaderVisibility(false);
        this.previewService.startAutomationTest(this.testConfig);
      })
    }

    this.PreviewModalDialog.hide();
  }

  getTaskData(taskData) {
    this.taskInfo["taskID"] = taskData.taskID;
    this.taskInfo["stepIndex"] = taskData.stepIndex;
    this.taskInfo["templateID"] = taskData.templateID;
    this.taskInfo["stepText"] = taskData.stepText;

    this.PreviewModalDialog.show();
  }

  previewTask(callback){
    this.previewService.previewTask(this.taskInfo["taskID"], this.taskInfo["stepIndex"], this.taskInfo["templateID"], this.taskInfo["stepText"])
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
