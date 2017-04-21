import { Component, ElementRef, ViewChild, OnDestroy } from '@angular/core';
import { BaseComponent } from '../base.component';
import { NavigationStart, Router, ActivatedRoute } from '@angular/router';
import { LabelTypes } from '../enums';
import { itemSchema } from '../UIConfig.model';
import { AuthService } from '../../_services/auth.service';
import { BuilderDataService } from '../../step-builder/shared/builder-data.service';


declare var Dropzone: any;
Dropzone.autoDiscover = false;
@Component({
  selector: 'app-dropzone',
  templateUrl: './dropzone.component.html',
  styleUrls: ['./dropzone.component.scss']
})
export class DropzoneComponent extends BaseComponent implements OnDestroy {
  @ViewChild('dropzone') dropzoneContainer;
  labelConfig: itemSchema = new itemSchema();
  width: string;
  height: string;
  makeDeleteCall: boolean;
  constructor(private elementRef: ElementRef, private route: ActivatedRoute, private router: Router, private authSrvc: AuthService, private bds: BuilderDataService) {
    super();
    this.makeDeleteCall = true;
  }

  ngOnInit() {
    super.ngOnInit();
    this.UpdateView();

    this.router.events
      .subscribe((event) => {
        if (event instanceof NavigationStart) {
          this.makeDeleteCall = !this.makeDeleteCall;
        }
      });
  }

  UpdateView() {
    var self = this;
    this.labelConfig.rendererProperties.text = this.compConfig.label;
    this.labelConfig.rendererProperties.type = LabelTypes.ELEMENT_HEADING;

    if (this.compConfig.desc != undefined) {
      this.updateDescription();
    }

    if (this.compConfig.dim != undefined) {
      this.height = `${this.compConfig.dim['height']}`;
      this.width = `${this.compConfig.dim['width']}`;
    }
    var routeParams = this.route.snapshot.params;
    let dropzone = new Dropzone(this.dropzoneContainer.nativeElement, {
      url: "/api/skill/resource",
      paramName: "dzfile",
      maxFiles: 1,
      addRemoveLinks: true,

      acceptedFiles: MIMETYPE[self.compConfig.rendererProperties.dataType],
      init: function () {
        self.dropzoneInitializer(this);
      },
      sending: function (file, xhr, formData) {
        xhr.setRequestHeader('Authorization', self.authSrvc.getCurrentUserToken());
        formData.append("taskId", routeParams["taskId"]);
        formData.append("stepIndex", routeParams["stepIndex"]);
        // Need to discuss the passing of model ref along with the file as the model can be generated dynamicallly in some cases.
        // formData.append("modelref", self.compConfig.val);
      }
    });
  }

  dropzoneInitializer(dropzone) {
    var reader = new FileReader();
    var self = this;
    var droppedFile;

    dropzone.on("success", function (file, response) {
      if (file.status === "success") {
        let currModelRef = self.getData();
        currModelRef["displayName"] = file.name;
        currModelRef["path"] = response.filePath;

        if (MIMETYPE[self.compConfig.rendererProperties.dataType] === ".json") {
          reader.readAsText(file, 'UTF8');
          reader.onload = function (e) {
            //Update Dependencies when contents have been read;
            try {
              droppedFile = JSON.parse(e.target['result']);
            }
            catch (e) {
              console.log(e);
            }
            self.emitEvents(droppedFile);
          }
        }
      }
    });
    dropzone.on("maxfilesexceeded", function (file) {
      dropzone.removeAllFiles();
      // The event "removedfile" is called which internally calls the api to delete file from the server.
      dropzone.addFile(file);
    });
    dropzone.on("removedfile", function (file) {
      let currModelRef = self.getData();
      self.bds.removeFile(currModelRef["path"]).subscribe(function (data) {
        if (data.status === "success") {
          self.emitEvents(null);
          currModelRef["displayName"] = "";
          currModelRef["path"] = "";
        } else if (data.status == "error") {
          // TODO: Code for handling - File Doesn't Exist Error
        }
      });
    })

    this.restoreFileUI(dropzone);
  }

  restoreFileUI(dropzone) {
    let fileInfo = this.getData();
    if (fileInfo.path != "") {
      this.bds.getResource(this.getData().path).subscribe((res) => {
        if (res.headers.get("status") == "success") {
          let file = new File([res.body], fileInfo.displayName);
          dropzone.emit("addedfile", file);
          dropzone.emit("complete", file);
        }
        else {
          //TODO: Handling of code when error is receiving file occurrs. 
        }
      });
    }
  }

  getData() {
    return this.modelRef ? this.modelRef : this.builderModelSrvc.getStateRef(this.compConfig.val);
  }

  ngOnDestroy() {
    super.ngOnDestroy();
    if (this.makeDeleteCall && this.getData()["path"] != "") {
      this.bds.removeFile(this.getData()["path"]).subscribe((data) => {
        //TODO: error handling.
      });
    }
  }
}
enum MIMETYPE {
  JSON = <any>".json",
  img = <any>"image/*"
}
