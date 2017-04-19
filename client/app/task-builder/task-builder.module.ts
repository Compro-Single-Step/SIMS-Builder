import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { ModalModule } from 'ng2-bootstrap';
import { RouterModule } from '@angular/router';
import 'messenger/build/js/messenger.js';
import { TaskBuilderComponent } from './task-builder.component';
import { TaskstepComponent } from './taskstep/taskstep.component';
import { TaskDataResolver } from '../task-builder/shared/taskDataResolver.service' 

const routes = [
  { path: '', component: TaskBuilderComponent, pathMatch: 'full',resolve: {
      taskData: TaskDataResolver
    } }
];


@NgModule({
  declarations: [ TaskBuilderComponent, TaskstepComponent],
  imports: [ CommonModule, RouterModule.forChild(routes), ModalModule.forRoot()],
  providers: [ TaskDataResolver]
})
export class TaskBuilderModule {
}
