// Importing Angular Libraries
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from "@angular/router";

//Importing the core components for step builder module and Services.
import { StepBuilderComponent } from './step-builder/step-builder.component';
import { StepInputAreaComponent } from './step-input-area/step-input-area.component';
import { BalooReferenceComponent } from './baloo-reference/baloo-reference.component';
import { ViewNavigatorComponent } from './view-navigator/view-navigator.component';
import { ViewInputAreaComponent } from './view-input-area/view-input-area.component';
import { MethodViewerComponent } from './method-viewer/method-viewer.component';
import { ScenarioFilesViewerComponent } from './scenario-files-viewer/scenario-files-viewer.component';
import { ScenarioDocsComponent } from './scenario-docs/scenario-docs.component';
import { TaskFileStoreComponent } from './task-file-store/task-file-store.component';

import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild([
      {
        path: '',
        component: StepBuilderComponent
      }
    ]),
    SharedModule
  ],
  declarations: [StepBuilderComponent, StepInputAreaComponent, BalooReferenceComponent, ViewNavigatorComponent, ViewInputAreaComponent, MethodViewerComponent, ScenarioFilesViewerComponent, ScenarioDocsComponent, TaskFileStoreComponent]
})
export class StepBuilderModule { }
