import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';

import { RouterModule, Router } from '@angular/router';
import { TaskSearch } from './tasksearch.component';

import { FormsModule } from '@angular/forms';

const routes = [
  { path: '', component: TaskSearch, pathMatch: 'full' }
];

@NgModule({
  imports: [ CommonModule, RouterModule.forChild(routes), FormsModule ],
  declarations: [ TaskSearch ]
})
export class TaskSearchModule {
}
